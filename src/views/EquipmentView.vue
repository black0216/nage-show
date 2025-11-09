<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ItemTooltip from '../components/ItemTooltip.vue'

interface EquipmentItem {
  Part: number // 装备部位: 头部=9, 面具=1, 上衣=2, 下装=5, 鞋子=8, 右手=3, 左手=4, 特殊=6
  Type: number // 道具类型: 1=普通, 2=礼包, 3=装备
  Name: string
  Sheet: string
  X: number
  Y: number
}

// 装备部位映射
const PART_MAP: Record<string, string> = {
  '1': '面具',
  '2': '上衣',
  '3': '右手',
  '4': '左手',
  '5': '下装',
  '6': '特殊',
  '8': '鞋子',
  '9': '头部'
}

// Global state for pagination
let allEquipmentData: EquipmentItem[] = []

const equipment = ref<EquipmentItem[]>([])
const searchTerm = ref('')
const selectedPart = ref<string>('all')
const hoveredItem = ref<EquipmentItem | null>(null)
const hoveredItemId = ref<string>('')

// Pagination and loading states
const ITEMS_PER_PAGE = 20
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)


// Load all data for search and filter functionality
const loadAllData = async () => {
  if (allEquipmentData.length > 0) return // Already loaded

  try {
    const response = await fetch('/Equip.json')
    const allData = await response.json()
    allEquipmentData = allData
  } catch (error) {
    console.error('Failed to load all equipment data:', error)
  }
}

// Load equipment data with pagination
const loadMoreEquipment = async (reset = false) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    // If loading for the first time or resetting, load all data
    if (reset || equipment.value.length === 0) {
      // Ensure all data is loaded first
      await loadAllData()

      // Reset state
      equipment.value = []
      currentPage.value = 1
      hasMore.value = true
    }

    // Get filtered data
    const filteredData = getFilteredData()

    // Get current page of data
    const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const pageData = filteredData.slice(startIndex, endIndex)

    // Add to existing equipment
    if (reset) {
      equipment.value = pageData
    } else {
      equipment.value = [...equipment.value, ...pageData]
    }

    // Update pagination state
    currentPage.value++
    hasMore.value = endIndex < filteredData.length

  } catch (error) {
    console.error('Failed to load equipment data:', error)
  } finally {
    isLoading.value = false
  }
}

// Get filtered data based on search and part
const getFilteredData = () => {
  let filtered = allEquipmentData

  // Filter by part
  if (selectedPart.value !== 'all') {
    const partNumber = Object.keys(PART_MAP).find(key => PART_MAP[key as keyof typeof PART_MAP] === selectedPart.value)
    if (partNumber) {
      // @ts-ignore
      filtered = filtered.filter(item => item.Part.toString() === partNumber)
    }
  }

  // Filter by search term
  if (searchTerm.value) {
    filtered = filtered.filter(item =>
      item.Name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  return filtered
}

// Filter equipment based on search and part
const filteredEquipment = computed(() => {
  if (searchTerm.value || selectedPart.value !== 'all') {
    // When searching or filtering, use all data
    return getFilteredData()
  }
  return equipment.value
})

// Handle search with debouncing
let searchTimeout: number
const handleSearch = (term: string) => {
  clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    if (term || selectedPart.value !== 'all') {
      // If searching or filtering, ensure all data is loaded for complete search
      if (allEquipmentData.length === 0) {
        await loadMoreEquipment(true)
      }
    } else {
      // If search cleared and no filter, reset to pagination
      await loadMoreEquipment(true)
      // Force update observer after DOM is updated
      await nextTick()
      updateObserverTarget()
    }
  }, 300)
}

// Handle part filter
const handlePartFilter = async (part: string) => {
  selectedPart.value = part
  await handleSearch(searchTerm.value)
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

// Get unique identifier for an item
const getItemId = (item: EquipmentItem, index?: number): string => {
  const baseId = `${item.Name}_${item.Sheet}_${item.X}_${item.Y}_${item.Type}_${item.Part}`

  if (index !== undefined) {
    return `${baseId}_${index}`
  }

  return baseId
}

// Handle item hover
const handleItemHover = (item: EquipmentItem, index: number, isHovering: boolean) => {
  if (isHovering) {
    hoveredItem.value = item
    hoveredItemId.value = getItemId(item, index)
  } else {
    hoveredItem.value = null
    hoveredItemId.value = ''
  }
}


// Initialize component
onMounted(async () => {
  // Load all data on mount to enable complete search and filter functionality
  await loadAllData()

  // Load initial page for display
  loadMoreEquipment(true)

  // Setup intersection observer for infinite scroll
  setupInfiniteScroll()

  })

// Setup infinite scroll
let infiniteObserver: IntersectionObserver | null = null

const setupInfiniteScroll = () => {
  infiniteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasMore.value && !isLoading.value && !searchTerm.value && selectedPart.value === 'all') {
          loadMoreEquipment()
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

    // Only set up infinite scroll when not searching/filtering and there's more data to load
    if (!searchTerm.value && selectedPart.value === 'all' && hasMore.value) {
      // Observe the infinite scroll trigger
      const trigger = document.querySelector('.infinite-scroll-trigger')
      if (trigger) {
        infiniteObserver.observe(trigger)
      }

      // Also observe the last equipment item as backup
      const lastItem = document.querySelector('.equipment-item:last-child')
      if (lastItem) {
        infiniteObserver.observe(lastItem)
      }
    }
  })
}

// Watch for data changes to update observer
watch(() => equipment.value.length, async () => {
  await nextTick()
  updateObserverTarget()
})

// Watch for search and filter changes to ensure observer is properly updated
watch(() => [searchTerm.value, selectedPart.value], async ([newTerm, newPart], [oldTerm, oldPart]) => {
  // When search or filter is cleared, ensure observer is properly set up
  if ((oldTerm && !newTerm) || (oldPart !== 'all' && newPart === 'all')) {
    if (!newTerm && newPart === 'all') {
      await nextTick()
      updateObserverTarget()
    }
  }
})
</script>

<template>
  <div class="equipment-view">
    <h1>装备表</h1>

    <div class="filters">
      <!-- Part Filter -->
      <div class="filter-group">
        <label class="filter-label">装备部位:</label>
        <select
          v-model="selectedPart"
          @change="handlePartFilter(selectedPart)"
          class="part-select"
        >
          <option value="all">全部部位</option>
          <option v-for="(name, part) in PART_MAP" :key="part" :value="name">
            {{ name }}
          </option>
        </select>
      </div>

      <!-- Search -->
      <div class="filter-group">
        <input
          v-model="searchTerm"
          @input="handleSearch(searchTerm)"
          type="text"
          placeholder="搜索装备名称..."
          class="search-input"
        />
      </div>
    </div>

    <div class="equipment-container">
      <div
        v-for="(item, index) in filteredEquipment"
        :key="getItemId(item, index)"
        class="equipment-item"
      >
        <div
          class="item-wrapper"
          @mouseenter="handleItemHover(item, index, true)"
          @mouseleave="handleItemHover(item, index, false)"
        >
          <div
            class="item-icon"
            :style="getIconStyle(item.Sheet, item.X, item.Y)"
            :alt="item.Name"
          >
          </div>
          <div class="item-name-label">{{ item.Name }}</div>
        </div>

        <!-- Item Tooltip Component -->
        <ItemTooltip
          :item="hoveredItem"
          :visible="hoveredItemId === getItemId(item, index)"
        />
      </div>
    </div>

    <!-- Infinite Scroll Trigger -->
    <div v-if="!searchTerm && selectedPart === 'all' && hasMore" class="infinite-scroll-trigger" style="height: 1px; width: 100%;"></div>

    <!-- Auto-loading Indicator -->
    <div v-if="!searchTerm && selectedPart === 'all' && hasMore && isLoading" class="loading-indicator">
      <div class="loading-spinner"></div>
      <span>加载更多...</span>
    </div>

    <!-- No More Data -->
    <div v-if="!searchTerm && selectedPart === 'all' && !hasMore && filteredEquipment.length > 0" class="no-more">
      <span>已加载全部数据</span>
    </div>

    <!-- No Results -->
    <div v-if="filteredEquipment.length === 0 && !isLoading" class="no-results">
      <p v-if="searchTerm || selectedPart !== 'all'">
        未找到符合条件的装备
        <span v-if="searchTerm"> "{{ searchTerm }}"</span>
        <span v-if="selectedPart !== 'all'"> ({{ selectedPart }})</span>
      </p>
      <p v-else>暂无数据</p>
    </div>

      </div>
</template>

<style scoped>
.equipment-view {
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
  .equipment-view {
    padding: 30px;
  }
}

@media (min-width: 1920px) {
  .equipment-view {
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  color: #ccc;
  font-weight: 500;
}

.part-select {
  padding: 8px 12px;
  border-radius: 20px;
  border: 2px solid #444;
  background-color: #2a2a2a;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  cursor: pointer;
}

.part-select:focus {
  border-color: #ffd700;
}

.search-input {
  padding: 8px 15px;
  border-radius: 20px;
  border: 2px solid #444;
  background-color: #2a2a2a;
  color: #fff;
  font-size: 14px;
  width: 250px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #ffd700;
}

.equipment-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  gap: 12px;
  justify-content: start;
  width: 100%;
}

.equipment-item {
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
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #000;
  flex-shrink: 0;
}

.item-icon:hover {
  border-color: #ffd700;
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  height: 26px;
  font-weight: 500;
  padding: 0 2px;
  box-sizing: border-box;
}

/* Responsive layout for different screen sizes */
@media (min-width: 480px) {
  .equipment-container {
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
  .equipment-container {
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
  .equipment-container {
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
  .equipment-container {
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
  .equipment-container {
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
  .equipment-container {
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
  .equipment-container {
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
  .equipment-view {
    padding: 10px;
  }

  .filters {
    flex-direction: column;
    gap: 15px;
  }

  .filter-group {
    width: 100%;
    justify-content: center;
  }

  .search-input {
    width: 100%;
    max-width: 300px;
  }

  .equipment-container {
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


/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .equipment-view {
    background-color: #0f0f0f;
  }

  .equipment-item {
    background: linear-gradient(135deg, #1f1f1f 0%, #0f0f0f 100%);
  }
}
</style>
