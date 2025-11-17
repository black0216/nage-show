<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ItemTooltip from '../components/ItemTooltip.vue'
import type { CraftingItem } from '@/types'
import { loadCraftingData } from '../utils/protobuf.utils'

interface CraftingRecipe {
  Item: CraftingItem      // 最终道具
  ItemA: CraftingItem     // 材料A
  ItemB: CraftingItem     // 材料B
  ItemC: CraftingItem     // 材料C
}

// Global state for pagination
let allCraftingData: CraftingRecipe[] = []

const crafting = ref<CraftingRecipe[]>([])
const searchTerm = ref('')
const hoveredItem = ref<CraftingItem | null>(null) // Current hovered item
const hoveredItemId = ref<string | null>(null) // Use unique identifier for hovered item
const hoveredElement = ref<HTMLElement | null>(null) // Current hovered DOM element

// Pagination and loading states
const ITEMS_PER_PAGE = 20
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)


// Load all data for search functionality
const loadAllData = async () => {
  if (allCraftingData.length > 0) return // Already loaded

  try {
    allCraftingData = await loadCraftingData()
  } catch (error) {
    console.error('Failed to load all crafting data:', error)
  }
}

// Load crafting data with pagination
const loadMoreCrafting = async (reset = false) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    // If loading for the first time or resetting, load all data
    if (reset || crafting.value.length === 0) {
      // Ensure all data is loaded first
      await loadAllData()

      // Reset state
      crafting.value = []
      currentPage.value = 1
      hasMore.value = true
    }

    // Get current page of data
    const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const pageData = allCraftingData.slice(startIndex, endIndex)

    // Add to existing crafting
    if (reset) {
      crafting.value = pageData
    } else {
      crafting.value = [...crafting.value, ...pageData]
    }

    // Update pagination state
    currentPage.value++
    hasMore.value = endIndex < allCraftingData.length

  } catch (error) {
    console.error('Failed to load crafting data:', error)
  } finally {
    isLoading.value = false
  }
}

// Filter crafting based on search term
const filteredCrafting = computed(() => {
  if (!searchTerm.value) return crafting.value

  // Search from all data instead of just loaded data
  return allCraftingData.filter(recipe => {
    const searchLower = searchTerm.value.toLowerCase()
    return (
        recipe.Item.Name.toLowerCase().includes(searchLower) ||
        recipe.ItemA.Name.toLowerCase().includes(searchLower) ||
        recipe.ItemB.Name.toLowerCase().includes(searchLower) ||
        recipe.ItemC.Name.toLowerCase().includes(searchLower)
    )
  })
})

// Handle search with debouncing
let searchTimeout: number
const handleSearch = (term: string) => {
  clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    if (term) {
      // If searching, ensure all data is loaded for complete search
      if (allCraftingData.length === 0) {
        await loadMoreCrafting(true)
      }
    } else {
      // If search cleared, reset to pagination and ensure observer works
      await loadMoreCrafting(true)
      // Force update observer after DOM is updated
      await nextTick()
      updateObserverTarget()
    }
  }, 300)
}

// Calculate icon position for CSS background
const getIconStyle = (sheet: string, x: number, y: number) => {
  // const formattedSheet = sheet.startsWith('Item') ? sheet : `Item${sheet.substring(sheet.length - 2)}`
  const formattedSheet = sheet.toLowerCase();
  const iconPath = `/images/${formattedSheet}.jpg`

  const iconSize = 32 // Each icon is 32px (256/8)
  const backgroundX = -(y - 1) * iconSize
  const backgroundY = -(x - 1) * iconSize

  return {
    width: '32px',
    height: '32px',
    backgroundImage: `url(${iconPath})`,
    backgroundPosition: `${backgroundX}px ${backgroundY}px`,
    backgroundSize: '256px 256px',
    backgroundRepeat: 'no-repeat'
  }
}

// Get item type text
const getItemTypeText = (type: number): string => {
  switch (type) {
    case 1: return '普通道具'
    case 2: return '礼包'
    case 3: return '装备'
    default: return '未知'
  }
}

// Get unique identifier for an item
const getItemId = (item: CraftingItem, recipeIndex?: number, slotType?: string): string => {
  // 如果没有提供位置信息，使用道具属性作为基础标识符
  const baseId = `${item.Name}_${item.Sheet}_${item.X}_${item.Y}_${item.Type}`

  // 如果提供了位置信息，添加位置信息确保唯一性
  if (recipeIndex !== undefined && slotType !== undefined) {
    return `${baseId}_${recipeIndex}_${slotType}`
  }

  return baseId
}

// Handle item hover (supports both mouse and touch events)
const handleItemHover = (item: CraftingItem, recipeIndex: number, slotType: string, isHovering: boolean, event?: MouseEvent | TouchEvent) => {
  if (isHovering && event?.currentTarget) {
    hoveredItem.value = item
    hoveredItemId.value = getItemId(item, recipeIndex, slotType)
    hoveredElement.value = event.currentTarget as HTMLElement
  } else {
    hoveredItem.value = null
    hoveredItemId.value = null
    hoveredElement.value = null
  }
}

// Handle touch start for mobile
const handleTouchStart = (item: CraftingItem, recipeIndex: number, slotType: string, event: TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const currentItemId = getItemId(item, recipeIndex, slotType)

  if (hoveredItemId.value === currentItemId) {
    // Same item tapped - hide tooltip
    hoveredItem.value = null
    hoveredItemId.value = null
    hoveredElement.value = null
  } else {
    // Different item tapped - show new tooltip
    hoveredItem.value = item
    hoveredItemId.value = currentItemId
    hoveredElement.value = event.currentTarget as HTMLElement
  }
}

// Global touch handler for hiding tooltips when touching outside
const handleGlobalTouch = (event: TouchEvent) => {
  // Check if touch is outside any item icon
  const touch = event.touches[0]
  if (touch) {
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    const isItemIcon = element?.closest('.item-icon')

    if (!isItemIcon) {
      // Touch outside item icons, hide tooltip
      hoveredItem.value = null
      hoveredItemId.value = null
      hoveredElement.value = null
    }
  }
}


// Initialize component
onMounted(async () => {
  // Load all data on mount to enable complete search functionality
  await loadAllData()

  // Load initial page for display
  loadMoreCrafting(true)

  // Add global touch listener to hide tooltips when touching outside
  document.addEventListener('touchstart', handleGlobalTouch, { passive: true })

  // Setup intersection observer for infinite scroll
  setupInfiniteScroll()

})

// Setup infinite scroll
let infiniteObserver: IntersectionObserver | null = null

const setupInfiniteScroll = () => {
  infiniteObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasMore.value && !isLoading.value && !searchTerm.value) {
            loadMoreCrafting()
          }
        })
      },
      {
        root: null,
        rootMargin: '200px', // Start loading 200px before reaching bottom
        threshold: 0.1
      }
  )

  updateObserverTarget()

  // Cleanup observer and listeners on unmount
  onUnmounted(() => {
    if (infiniteObserver) {
      infiniteObserver.disconnect()
    }

    // Remove global touch listener
    document.removeEventListener('touchstart', handleGlobalTouch)
  })
}

// Update observer target when data changes
const updateObserverTarget = () => {
  if (!infiniteObserver) return

  // Disconnect from old targets
  infiniteObserver.disconnect()

  nextTick(() => {
    if (!infiniteObserver) return

    // Only set up infinite scroll when not searching and there's more data to load
    if (!searchTerm.value && hasMore.value) {
      // Observe the infinite scroll trigger
      const trigger = document.querySelector('.infinite-scroll-trigger')
      if (trigger) {
        infiniteObserver.observe(trigger)
      }

      // Also observe the last crafting item as backup
      const lastItem = document.querySelector('.crafting-item:last-child')
      if (lastItem) {
        infiniteObserver.observe(lastItem)
      }
    }
  })
}

// Watch for data changes to update observer
watch(() => crafting.value.length, async () => {
  await nextTick()
  updateObserverTarget()
})

// Watch for search term changes to ensure observer is properly updated
watch(() => searchTerm.value, async (newTerm, oldTerm) => {
  // When search is cleared, ensure observer is properly set up
  if (oldTerm && !newTerm) {
    await nextTick()
    updateObserverTarget()
  }
})
</script>

<template>
  <div class="crafting-view">
    <h1>合成表</h1>

    <div class="filters">
      <input
          v-model="searchTerm"
          @input="handleSearch(searchTerm)"
          type="text"
          placeholder="搜索道具名称..."
          class="search-input"
      />
    </div>

    <div class="crafting-container">
      <div
          v-for="(recipe, index) in filteredCrafting"
          :key="index"
          class="crafting-item"
      >
        <div class="materials-section">
          <div class="section-title">合成材料</div>
          <div class="materials-grid">
            <!-- Material A -->
            <div class="material-container">
              <div class="slot-label">A槽</div>
              <div
                  class="item-wrapper"
                  :class="{ 'equipment': recipe.ItemA.Type === 3, 'gift': recipe.ItemA.Type === 2 }"
                  @mouseenter="(event) => handleItemHover(recipe.ItemA, index, 'A', true, event)"
                  @mouseleave="(event) => handleItemHover(recipe.ItemA, index, 'A', false, event)"
              >
                <div
                    class="item-icon"
                    :style="getIconStyle(recipe.ItemA.Sheet, recipe.ItemA.X, recipe.ItemA.Y)"
                    :alt="recipe.ItemA.Name"
                    @click="(event) => handleItemHover(recipe.ItemA, index, 'A', true, event)"
                    @mouseleave="(event) => handleItemHover(recipe.ItemA, index, 'A', false, event)"
                    @touchstart="(event) => handleTouchStart(recipe.ItemA, index, 'A', event)"
                >
                </div>
                <div class="item-name-label">{{ recipe.ItemA.Name }}</div>

                </div>
            </div>

            <!-- Material B -->
            <div class="material-container">
              <div class="slot-label">B槽</div>
              <div
                  class="item-wrapper"
                  :class="{ 'equipment': recipe.ItemB.Type === 3, 'gift': recipe.ItemB.Type === 2 }"
                  @mouseenter="(event) => handleItemHover(recipe.ItemB, index, 'B', true, event)"
                  @mouseleave="(event) => handleItemHover(recipe.ItemB, index, 'B', false, event)"
              >
                <div
                    class="item-icon"
                    :style="getIconStyle(recipe.ItemB.Sheet, recipe.ItemB.X, recipe.ItemB.Y)"
                    :alt="recipe.ItemB.Name"
                    @click="(event) => handleItemHover(recipe.ItemB, index, 'B', true, event)"
                    @mouseleave="(event) => handleItemHover(recipe.ItemB, index, 'B', false, event)"
                    @touchstart="(event) => handleTouchStart(recipe.ItemB, index, 'B', event)"
                >
                </div>
                <div class="item-name-label">{{ recipe.ItemB.Name }}</div>

                  </div>
            </div>

            <!-- Material C -->
            <div class="material-container">
              <div class="slot-label">C槽</div>
              <div
                  class="item-wrapper"
                  :class="{ 'equipment': recipe.ItemC.Type === 3, 'gift': recipe.ItemC.Type === 2 }"
                  @mouseenter="(event) => handleItemHover(recipe.ItemC, index, 'C', true, event)"
                  @mouseleave="(event) => handleItemHover(recipe.ItemC, index, 'C', false, event)"
              >
                <div
                    class="item-icon"
                    :style="getIconStyle(recipe.ItemC.Sheet, recipe.ItemC.X, recipe.ItemC.Y)"
                    :alt="recipe.ItemC.Name"
                    @click="(event) => handleItemHover(recipe.ItemC, index, 'C', true, event)"
                    @mouseleave="(event) => handleItemHover(recipe.ItemC, index, 'C', false, event)"
                    @touchstart="(event) => handleTouchStart(recipe.ItemC, index, 'C', event)"
                >
                </div>
                <div class="item-name-label">{{ recipe.ItemC.Name }}</div>

                    </div>
            </div>
          </div>
        </div>

        <div class="crafting-arrow">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg">
            <path d="M20 8L32 20L20 32" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="result-section">
          <div class="section-title">合成结果</div>
          <div class="result-container">
            <div
                class="item-wrapper"
                :class="{ 'equipment': recipe.Item.Type === 3, 'gift': recipe.Item.Type === 2 }"
                @mouseenter="(event) => handleItemHover(recipe.Item, index, 'Final', true, event)"
                @mouseleave="(event) => handleItemHover(recipe.Item, index, 'Final', false, event)"
            >
              <div
                  class="item-icon result-icon"
                  :style="getIconStyle(recipe.Item.Sheet, recipe.Item.X, recipe.Item.Y)"
                  :alt="recipe.Item.Name"
                  @click="(event) => handleItemHover(recipe.Item, index, 'Final', true, event)"
                  @mouseleave="(event) => handleItemHover(recipe.Item, index, 'Final', false, event)"
                  @touchstart="(event) => handleTouchStart(recipe.Item, index, 'Final', event)"
              >
              </div>
              <div class="item-name-label">{{ recipe.Item.Name }}</div>

              <!-- Item Tooltip Component -->
              </div>
          </div>
        </div>
      </div>

      <!-- Infinite Scroll Trigger -->
      <div v-if="!searchTerm && hasMore" class="infinite-scroll-trigger" style="height: 1px; width: 100%;"></div>

      <!-- Auto-loading Indicator -->
      <div v-if="!searchTerm && hasMore && isLoading" class="loading-indicator">
        <div class="loading-spinner"></div>
        <span>加载更多...</span>
      </div>

      <!-- No More Data -->
      <div v-if="!searchTerm && !hasMore && filteredCrafting.length > 0" class="no-more">
        <span>已加载全部数据</span>
      </div>

      <!-- No Results -->
      <div v-if="filteredCrafting.length === 0 && !isLoading" class="no-results">
        <p v-if="searchTerm">未找到 "{{ searchTerm }}" 相关的合成配方</p>
        <p v-else>暂无数据</p>
      </div>
    </div>

    <!-- Global Item Tooltip -->
    <ItemTooltip
      :item="hoveredItem"
      :visible="hoveredItemId !== null"
      :trigger-element="hoveredElement"
    />

  </div>
</template>

<style scoped>
.crafting-view {
  padding: 2rem;
  width: 100%;
  max-width: none;
  margin: 0;
  background: transparent;
  color: var(--foreground);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
}

/* Responsive padding */
@media (min-width: 1600px) {
  .crafting-view {
    padding: 30px;
  }
}

@media (min-width: 1920px) {
  .crafting-view {
    padding: 40px;
  }
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--foreground);
  filter: drop-shadow(0 0 20px color-mix(in srgb, var(--primary) 30%, transparent));
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

h1::before {
  content: '⚗️';
  font-size: 2rem;
  animation: bounce 2s infinite;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--primary) 50%, transparent));
}

h1::after {
  content: '🔨';
  font-size: 2rem;
  animation: bounce 2s infinite 0.5s;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--primary) 50%, transparent));
}

.filters {
  margin-bottom: 2rem;
  text-align: center;
}

.search-input {
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius);
  border: 2px solid color-mix(in srgb, var(--border) 40%, transparent);
  background: var(--muted);
  color: var(--muted-foreground);
  font-size: 1rem;
  width: 300px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.search-input::placeholder {
  color: color-mix(in srgb, var(--muted-foreground) 60%, transparent);
}

.search-input:focus {
  border-color: var(--primary);
  background: var(--accent);
  box-shadow: 0 0 20px color-mix(in srgb, var(--primary) 30%, transparent);
  color: var(--accent-foreground);
}

.crafting-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.crafting-item {
  background: var(--card);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
  padding: 2rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.crafting-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: var(--radius) var(--radius) 0 0;
}

.crafting-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary);
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--card-foreground);
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--primary) 30%, transparent));
}

.materials-section {
  flex: 2;
  min-width: 300px;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
}

.material-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.slot-label {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: var(--primary-foreground);
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 8px;
  z-index: 10;
  text-shadow: none;
  box-shadow: var(--shadow-sm);
}

.crafting-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 10px;
}

.arrow-svg {
  color: var(--primary);
}

.result-section {
  flex: 1;
  min-width: 200px;
}

.result-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.item-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 100px;
  height: 110px;
  justify-content: flex-start;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  pointer-events: auto;
  z-index: 1;
}

.item-icon {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  pointer-events: auto;
  background-color: var(--muted);
  flex-shrink: 0;
}

.result-icon {
  width: 48px;
  height: 48px;
  border: 2px solid var(--primary);
  border-radius: 6px;
}

.item-icon:hover {
  border-color: var(--primary);
  transform: scale(1.2);
  box-shadow: 0 0 8px color-mix(in srgb, var(--primary) 50%, transparent);
}

.result-icon:hover {
  border-color: var(--accent);
  box-shadow: 0 0 15px color-mix(in srgb, var(--primary) 60%, transparent);
}

.equipment .item-icon {
  border-color: color-mix(in srgb, var(--destructive) 60%, transparent);
}

.equipment .item-icon:hover {
  border-color: color-mix(in srgb, var(--destructive) 80%, transparent);
  box-shadow: 0 0 15px color-mix(in srgb, var(--destructive) 50%, transparent);
}

.gift .item-icon {
  border-color: color-mix(in srgb, #34d399 60%, transparent);
}

.gift .item-icon:hover {
  border-color: color-mix(in srgb, #26a69a 80%, transparent);
  box-shadow: 0 0 8px color-mix(in srgb, #34d399 50%, transparent);
}

.item-name-label {
  font-size: 11px;
  color: var(--muted-foreground);
  text-align: center;
  width: 100%;
  line-height: 1.3;
  text-shadow: 1px 1px 2px color-mix(in srgb, var(--background) 80%, transparent);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  height: 40px;
  font-weight: 500;
  padding: 0 2px;
  box-sizing: border-box;
}

.equipment .item-name-label {
  color: color-mix(in srgb, var(--destructive) 90%, transparent);
}

.gift .item-name-label {
  color: color-mix(in srgb, #34d399 90%, transparent);
}

/* Infinite Scroll Trigger */
.infinite-scroll-trigger {
  height: 1px;
  width: 100%;
  visibility: hidden;
}

/* No More Data */
.no-more {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  color: var(--muted-foreground);
  font-size: 14px;
  font-style: italic;
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 20px;
  color: var(--muted-foreground);
  font-size: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* No Results */
.no-results {
  text-align: center;
  margin-top: 50px;
  padding: 40px;
  color: var(--muted-foreground);
  font-size: 18px;
}

.no-results p {
  margin: 5px 0;
}


/* Mobile optimization */
@media (max-width: 768px) {
  .crafting-view {
    padding: 15px;
  }

  .crafting-item {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .crafting-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }

  .materials-section,
  .result-section {
    width: 100%;
    min-width: auto;
  }

  .materials-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .item-wrapper {
    width: 80px;
    height: 90px;
  }

  .item-name-label {
    font-size: 10px;
    height: 30px;
  }
}

</style>
