<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ItemTooltip from '../components/ItemTooltip.vue'
import type { CraftingItem } from '../types'

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
const hoveredItemId = ref<string>('') // Use unique identifier for hovered item
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
    const response = await fetch('/Crafting.json')
    const allData = await response.json()
    allCraftingData = allData
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

// Handle item hover
const handleItemHover = (item: CraftingItem, recipeIndex: number, slotType: string, isHovering: boolean, event?: MouseEvent) => {
  if (isHovering && event?.currentTarget) {
    hoveredItem.value = item
    hoveredItemId.value = getItemId(item, recipeIndex, slotType)
    hoveredElement.value = event.currentTarget as HTMLElement
  } else {
    hoveredItem.value = null
    hoveredItemId.value = ''
    hoveredElement.value = null
  }
}


// Initialize component
onMounted(async () => {
  // Load all data on mount to enable complete search functionality
  await loadAllData()

  // Load initial page for display
  loadMoreCrafting(true)

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

  // Cleanup observer on unmount
  onUnmounted(() => {
    if (infiniteObserver) {
      infiniteObserver.disconnect()
    }
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
                >
                </div>
                <div class="item-name-label">{{ recipe.ItemA.Name }}</div>

                <!-- Item Tooltip Component -->
                <ItemTooltip
                  :item="hoveredItem"
                  :visible="hoveredItemId === getItemId(recipe.ItemA, index, 'A')"
                  :trigger-element="hoveredElement"
                />
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
                >
                </div>
                <div class="item-name-label">{{ recipe.ItemB.Name }}</div>

                <!-- Item Tooltip Component -->
                <ItemTooltip
                  :item="hoveredItem"
                  :visible="hoveredItemId === getItemId(recipe.ItemB, index, 'B')"
                  :trigger-element="hoveredElement"
                />
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
                >
                </div>
                <div class="item-name-label">{{ recipe.ItemC.Name }}</div>

                <!-- Item Tooltip Component -->
                <ItemTooltip
                  :item="hoveredItem"
                  :visible="hoveredItemId === getItemId(recipe.ItemC, index, 'C')"
                  :trigger-element="hoveredElement"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="crafting-arrow">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8L32 20L20 32" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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
              >
              </div>
              <div class="item-name-label">{{ recipe.Item.Name }}</div>

              <!-- Item Tooltip Component -->
              <ItemTooltip
                :item="hoveredItem"
                :visible="hoveredItemId === getItemId(recipe.Item, index, 'Final')"
                :trigger-element="hoveredElement"
              />
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

      </div>
</template>

<style scoped>
.crafting-view {
  padding: 20px;
  width: 100%;
  max-width: none;
  margin: 0;
  background-color: #1a1a1a;
  color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
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
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.filters {
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  padding: 10px 15px;
  border-radius: 25px;
  border: 2px solid #444;
  background-color: #2a2a2a;
  color: #fff;
  font-size: 16px;
  width: 300px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #ffd700;
}

.crafting-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.crafting-item {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #444;
  box-shadow: 0 6px 12px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffd700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
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
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a1a1a;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 8px;
  z-index: 10;
  text-shadow: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.crafting-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 10px;
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
}

.item-icon {
  width: 32px;
  height: 32px;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #000;
  flex-shrink: 0;
}

.result-icon {
  width: 48px;
  height: 48px;
  border: 2px solid #ffd700;
  border-radius: 6px;
}

.item-icon:hover {
  border-color: #ffd700;
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.result-icon:hover {
  border-color: #ffed4e;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
}

.equipment .item-icon {
  border-color: #ff6b6b;
}

.equipment .item-icon:hover {
  border-color: #ff4444;
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
}

.gift .item-icon {
  border-color: #4ecdc4;
}

.gift .item-icon:hover {
  border-color: #26a69a;
  box-shadow: 0 0 8px rgba(78, 205, 196, 0.5);
}

.item-name-label {
  font-size: 11px;
  color: #ccc;
  text-align: center;
  width: 100%;
  line-height: 1.3;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
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
  color: #ff6b6b;
}

.gift .item-name-label {
  color: #4ecdc4;
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
  color: #666;
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
  color: #ccc;
  font-size: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #333;
  border-top: 3px solid #ffd700;
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
  color: #888;
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

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .crafting-view {
    background-color: #0f0f0f;
  }

  .crafting-item {
    background: linear-gradient(135deg, #1f1f1f 0%, #0f0f0f 100%);
  }
}
</style>
