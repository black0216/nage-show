<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ItemTooltip from '../components/ItemTooltip.vue'
import type { DropItem } from '../types'
import { loadDropData } from '../utils/protobuf.utils'

interface DropData {
  NpcName: string
  DropItems: DropItem[]
}

// Global state for pagination
let allDropsData: DropData[] = []

const drops = ref<DropData[]>([])
const searchTerm = ref('')
const itemSearchTerm = ref('')
const hoveredItem = ref<DropItem | null>(null) // Current hovered item
const hoveredItemId = ref<string | null>(null) // Use unique identifier for hovered item
const hoveredElement = ref<HTMLElement | null>(null) // Current hovered DOM element

// Pagination and loading states
const ITEMS_PER_PAGE = 20
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)


// Load all data for search functionality
const loadAllData = async () => {
  if (allDropsData.length > 0) return // Already loaded

  try {
    allDropsData = await loadDropData()
  } catch (error) {
    console.error('Failed to load all drops data:', error)
  }
}

// Load drops data with pagination
const loadMoreDrops = async (reset = false) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    // If loading for the first time or resetting, load all data
    if (reset || drops.value.length === 0) {
      // Ensure all data is loaded first
      await loadAllData()

      // Reset state
      drops.value = []
      currentPage.value = 1
      hasMore.value = true
    }

    // Get current page of data
    const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const pageData = allDropsData.slice(startIndex, endIndex)

    // Add to existing drops
    if (reset) {
      drops.value = pageData
    } else {
      drops.value = [...drops.value, ...pageData]
    }

    // Update pagination state
    currentPage.value++
    hasMore.value = endIndex < allDropsData.length

  } catch (error) {
    console.error('Failed to load drops data:', error)
  } finally {
    isLoading.value = false
  }
}

// Filter drops based on search term
const filteredDrops = computed(() => {
  let filteredDropsData: DropData[]

  // If searching, use all data; otherwise use paginated data
  if (searchTerm.value || itemSearchTerm.value) {
    filteredDropsData = allDropsData
  } else {
    filteredDropsData = drops.value
  }

  // Filter by monster name
  if (searchTerm.value) {
    filteredDropsData = filteredDropsData.filter(drop =>
      drop.NpcName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // Filter by item name
  if (itemSearchTerm.value) {
    filteredDropsData = filteredDropsData.filter(drop =>
      drop.DropItems.some(item =>
        item.Name.toLowerCase().includes(itemSearchTerm.value.toLowerCase())
      )
    )
  }

  return filteredDropsData
})

// Handle search with debouncing
let searchTimeout: number
const handleSearch = async (term: string) => {
  clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    if (term || itemSearchTerm.value) {
      // If searching, ensure all data is loaded for complete search
      if (allDropsData.length === 0) {
        await loadMoreDrops(true)
      }
    } else {
      // If search cleared, reset to pagination and ensure observer works
      await loadMoreDrops(true)
      // Force update observer after DOM is updated
      await nextTick()
      updateObserverTarget()
    }
  }, 300)
}

// Handle item search with debouncing
let itemSearchTimeout: number
const handleItemSearch = async (term: string) => {
  clearTimeout(itemSearchTimeout)

  itemSearchTimeout = setTimeout(async () => {
    if (term || searchTerm.value) {
      // If searching, ensure all data is loaded for complete search
      if (allDropsData.length === 0) {
        await loadMoreDrops(true)
      }
    } else {
      // If search cleared, reset to pagination and ensure observer works
      await loadMoreDrops(true)
      // Force update observer after DOM is updated
      await nextTick()
      updateObserverTarget()
    }
  }, 300)
}

// Calculate icon position for CSS background
const getIconStyle = (sheet: string, x: number, y: number) => {
  // const formattedSheet = sheet.startsWith('Item') ? sheet : `Item${sheet.padStart(2, '0')}`
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
const getItemId = (item: DropItem, dropIndex?: number, itemIndex?: number): string => {
  // 如果没有提供索引信息，使用道具属性作为基础标识符
  const baseId = `${item.Name}_${item.Sheet}_${item.X}_${item.Y}_${item.Type}`

  // 如果提供了索引信息，添加位置信息确保唯一性
  if (dropIndex !== undefined && itemIndex !== undefined) {
    return `${baseId}_${dropIndex}_${itemIndex}`
  }

  return baseId
}

// Handle item hover
const handleItemHover = (item: DropItem, dropIndex: number, itemIndex: number, isHovering: boolean, event?: MouseEvent) => {
  if (isHovering && event?.currentTarget) {
    hoveredItem.value = item
    hoveredItemId.value = getItemId(item, dropIndex, itemIndex)
    hoveredElement.value = event.currentTarget as HTMLElement
  } else {
    hoveredItem.value = null
    hoveredItemId.value = null
    hoveredElement.value = null
  }
}


// Initialize component
onMounted(async () => {
  // Load all data on mount to enable complete search functionality
  await loadAllData()

  // Load initial page for display
  loadMoreDrops(true)

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
          loadMoreDrops()
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

      // Also observe the last drop item as backup
      const lastItem = document.querySelector('.drop-item:last-child')
      if (lastItem) {
        infiniteObserver.observe(lastItem)
      }
    }
  })
}

// Watch for data changes to update observer
watch(() => drops.value.length, async () => {
  await nextTick()
  updateObserverTarget()
})

// Watch for search term changes to ensure observer is properly updated
watch(() => searchTerm.value, async (newTerm, oldTerm) => {
  // When search is cleared, ensure observer is properly set up
  if (oldTerm && !newTerm && !itemSearchTerm.value) {
    await nextTick()
    updateObserverTarget()
  }
})

// Watch for item search term changes to ensure observer is properly updated
watch(() => itemSearchTerm.value, async (newTerm, oldTerm) => {
  // When search is cleared, ensure observer is properly set up
  if (oldTerm && !newTerm && !searchTerm.value) {
    await nextTick()
    updateObserverTarget()
  }
})
</script>

<template>
  <div class="drops-view">
    <h1>掉落表</h1>

    <div class="filters">
      <div class="search-container">
        <input
          v-model="searchTerm"
          @input="handleSearch(searchTerm)"
          type="text"
          placeholder="搜索怪物名称..."
          class="search-input"
        />
        <input
          v-model="itemSearchTerm"
          @input="handleItemSearch(itemSearchTerm)"
          type="text"
          placeholder="搜索道具名称..."
          class="search-input"
        />
      </div>
    </div>

    <div class="drops-container">
      <div
        v-for="(drop, dropIndex) in filteredDrops"
        :key="`${drop.NpcName}_${dropIndex}`"
        class="drop-item"
      >
        <div class="monster-name">{{ drop.NpcName }}</div>

        <div class="items-grid">
          <div
            v-for="(item, itemIndex) in drop.DropItems"
            :key="getItemId(item, dropIndex, itemIndex)"
            class="item-container"
            :class="{ 'equipment': item.Type === 3, 'gift': item.Type === 2 }"
          >
            <div
              class="item-wrapper"
              @mouseenter="(event) => handleItemHover(item, dropIndex, itemIndex, true, event)"
              @mouseleave="(event) => handleItemHover(item, dropIndex, itemIndex, false, event)"
            >
              <div
                class="item-icon"
                :style="getIconStyle(item.Sheet, item.X, item.Y)"
                :alt="item.Name"
              >
              </div>
              <div class="item-name-label">{{ item.Name }}</div>
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
      <div v-if="!searchTerm && !hasMore && filteredDrops.length > 0" class="no-more">
        <span>已加载全部数据</span>
      </div>

      <!-- No Results -->
      <div v-if="filteredDrops.length === 0 && !isLoading" class="no-results">
        <p v-if="searchTerm && itemSearchTerm">未找到 "{{ searchTerm }}" 和 "{{ itemSearchTerm }}" 相关的结果</p>
        <p v-else-if="searchTerm">未找到 "{{ searchTerm }}" 相关的怪物</p>
        <p v-else-if="itemSearchTerm">未找到掉落 "{{ itemSearchTerm }}" 的怪物</p>
        <p v-else>暂无数据</p>
      </div>
    </div>

    <!-- Global Item Tooltip - moved to container level -->
    <ItemTooltip
      :item="hoveredItem"
      :visible="hoveredItemId !== null"
      :trigger-element="hoveredElement"
    />

    </div>
</template>

<style scoped>
.drops-view {
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
  .drops-view {
    padding: 30px 200px;
  }
}

@media (min-width: 1920px) {
  .drops-view {
    padding: 40px 200px;
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
  content: '🐉';
  font-size: 2rem;
  animation: bounce 2s infinite;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--primary) 50%, transparent));
}

h1::after {
  content: '💎';
  font-size: 2rem;
  animation: bounce 2s infinite 0.5s;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--primary) 50%, transparent));
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.filters {
  margin-bottom: 2rem;
  text-align: center;
}

.search-container {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  background: var(--card);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
}

.search-input {
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius);
  border: 2px solid color-mix(in srgb, var(--border) 40%, transparent);
  background: var(--muted);
  color: var(--muted-foreground);
  font-size: 1rem;
  width: 250px;
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

.drops-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.drop-item {
  background: var(--card);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
  padding: 2rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.drop-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: var(--radius) var(--radius) 0 0;
}

.drop-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary);
}

.monster-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #f87171;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.monster-name::before {
  content: '👹';
  font-size: 1.2rem;
  animation: monsterFloat 3s ease-in-out infinite;
}

@keyframes monsterFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  gap: 12px;
  justify-content: start;
  width: 100%;
}

/* Responsive layout for different screen sizes */
@media (min-width: 480px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 70px);
    gap: 16px;
  }

  .item-wrapper {
    width: 70px;
    height: 78px;
  }

  .item-name-label {
    font-size: 12px;
    height: 28px;
  }
}

@media (min-width: 768px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 75px);
    gap: 18px;
  }

  .item-wrapper {
    width: 75px;
    height: 85px;
  }

  .item-name-label {
    font-size: 13px;
    height: 32px;
  }
}

@media (min-width: 1024px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 80px);
    gap: 20px;
  }

  .item-wrapper {
    width: 80px;
    height: 90px;
  }

  .item-name-label {
    font-size: 14px;
    height: 34px;
  }
}

@media (min-width: 1280px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 85px);
    gap: 22px;
  }

  .item-wrapper {
    width: 85px;
    height: 96px;
  }

  .item-name-label {
    font-size: 15px;
    height: 36px;
  }
}

@media (min-width: 1440px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 90px);
    gap: 24px;
  }

  .item-wrapper {
    width: 90px;
    height: 102px;
  }

  .item-name-label {
    font-size: 16px;
    height: 38px;
  }
}

@media (min-width: 1680px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 95px);
    gap: 26px;
  }

  .item-wrapper {
    width: 95px;
    height: 108px;
  }

  .item-name-label {
    font-size: 17px;
    height: 40px;
  }
}

@media (min-width: 1920px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, 100px);
    gap: 30px;
  }

  .item-wrapper {
    width: 100px;
    height: 114px;
  }

  .item-name-label {
    font-size: 18px;
    height: 42px;
  }
}

/* Mobile optimization */
@media (max-width: 479px) {
  .drops-view {
    padding: 10px 20px;
  }

  .search-container {
    flex-direction: column;
    gap: 15px;
  }

  .search-input {
    width: 100%;
    max-width: 300px;
  }

  .items-grid {
    grid-template-columns: repeat(auto-fill, 55px);
    gap: 8px;
  }

  .item-wrapper {
    width: 55px;
    height: 61px;
  }

  .item-name-label {
    font-size: 10px;
    height: 24px;
  }
}

.item-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  width: 60px;
  height: 66px;
  justify-content: flex-start;
}

.item-icon {
  width: 32px;
  height: 32px;
  border: 2px solid color-mix(in srgb, var(--border) 40%, transparent);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--muted);
  flex-shrink: 0;
  backdrop-filter: blur(5px);
}

.item-icon:hover {
  border-color: var(--primary);
  transform: scale(1.1);
  box-shadow: 0 0 15px color-mix(in srgb, var(--primary) 50%, transparent);
}


.equipment .item-icon {
  border-color: color-mix(in srgb, var(--destructive) 60%, transparent);
  background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
}

.equipment .item-icon:hover {
  border-color: color-mix(in srgb, var(--destructive) 80%, transparent);
  box-shadow: 0 0 20px color-mix(in srgb, var(--destructive) 50%, transparent);
}

.gift .item-icon {
  border-color: color-mix(in srgb, #34d399 60%, transparent);
  background-color: color-mix(in srgb, #065f47 20%, transparent);
}

.gift .item-icon:hover {
  border-color: color-mix(in srgb, #34d399 80%, transparent);
  box-shadow: 0 0 15px color-mix(in srgb, #34d399 50%, transparent);
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  height: 26px;
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
  color: #666;
  font-size: 14px;
  font-style: italic;
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding: 2rem;
  color: var(--muted-foreground);
  font-size: 1rem;
  background: var(--card);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid color-mix(in srgb, var(--border) 30%, transparent);
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
  margin-top: 3rem;
  padding: 3rem;
  color: var(--muted-foreground);
  font-size: 1.1rem;
  background: var(--card);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.no-results::before {
  content: '🔍';
  display: block;
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.no-results p {
  margin: 0.5rem 0;
  line-height: 1.6;
}


/* Mobile optimization */
@media (max-width: 768px) {
  .drops-view {
    padding: 1rem;
  }

  .search-container {
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .search-input {
    width: 100%;
    max-width: 300px;
  }

  .drop-item {
    padding: 1.5rem;
  }

  .monster-name {
    font-size: 1.1rem;
  }

  .loading-indicator,
  .no-results {
    margin: 2rem 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .drops-view {
    padding: 0.5rem;
  }

  .search-container {
    padding: 1rem;
  }

  .drop-item {
    padding: 1rem;
  }

  .items-grid {
    grid-template-columns: repeat(auto-fill, 55px);
    gap: 8px;
  }

  .item-wrapper {
    width: 55px;
    height: 61px;
  }

  .item-name-label {
    font-size: 10px;
    height: 24px;
  }
}
</style>
