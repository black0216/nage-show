<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ItemTooltip from '../components/ItemTooltip.vue'
import type { EquipmentItem } from '../types'
import { PART_MAP, CLASS_MAP } from '../types'

// Global state for pagination
let allEquipmentData: EquipmentItem[] = []

const equipment = ref<EquipmentItem[]>([])
const searchTerm = ref('')
const selectedPart = ref<string>('all')
const selectedClass = ref<string>('all')
const hoveredItem = ref<EquipmentItem | null>(null)
const hoveredItemId = ref<string>('')
const hoveredElement = ref<HTMLElement | null>(null)

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

// Get filtered data based on search, part, and class
const getFilteredData = () => {
  let filtered = allEquipmentData

  // Filter by part
  if (selectedPart.value !== 'all') {
    const partNumber = Object.keys(PART_MAP).find(key => PART_MAP[key as keyof typeof PART_MAP] === selectedPart.value)
    if (partNumber) {
      filtered = filtered.filter(item => item.Equip.Part.toString() === partNumber)
    }
  }

  // Filter by class
  if (selectedClass.value !== 'all') {
    // Handle special class combinations (101, 102, etc.)
    const classRequirement = getClassRequirement(selectedClass.value)
    filtered = filtered.filter(item => {
      const itemClass = item.Equip.NeedClass
      return matchesClassRequirement(itemClass, classRequirement)
    })
  }

  // Filter by search term
  if (searchTerm.value) {
    filtered = filtered.filter(item =>
      item.Name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  return filtered
}

// Get class requirement numbers for filtering
const getClassRequirement = (className: string): number[] => {
  const classMap: Record<string, number[]> = {
    '格斗': [0, 101],      // 格斗单独职业 + 格斗/舞械组合
    '舞械': [2, 101],      // 舞械单独职业 + 格斗/舞械组合
    '超能': [6, 102],      // 超能单独职业 + 超能/枪手组合
    '枪手': [7, 102],      // 枪手单独职业 + 超能/枪手组合
    '不限': [100],         // 不限职业
    '格斗/舞械': [101],     // 专门的双职业组合
    '超能/枪手': [102]      // 专门的双职业组合
  }

  // Find the class requirement by name
  for (const [name, requirements] of Object.entries(classMap)) {
    if (name === className) {
      return requirements
    }
  }

  // Try to find in CLASS_MAP and return as array
  const classId = Object.keys(CLASS_MAP).find(key => CLASS_MAP[parseInt(key)] === className)
  return classId ? [parseInt(classId)] : []
}

// Check if item class matches the requirement
const matchesClassRequirement = (itemClass: number, requirement: number[]): boolean => {
  if (requirement.length === 0) return true

  return requirement.some(req => {
    switch (req) {
      case 100: // 不限
        return true
      case 101: // 格斗/舞械组合
        return itemClass === 0 || itemClass === 2 || itemClass === 101
      case 102: // 超能/枪手组合
        return itemClass === 6 || itemClass === 7 || itemClass === 102
      default:
        return itemClass === req
    }
  })
}

// Filter equipment based on search, part, and class
const filteredEquipment = computed(() => {
  if (searchTerm.value || selectedPart.value !== 'all' || selectedClass.value !== 'all') {
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
    if (term || selectedPart.value !== 'all' || selectedClass.value !== 'all') {
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

// Handle class filter
const handleClassFilter = async (className: string) => {
  selectedClass.value = className
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
  const baseId = `${item.Name}_${item.Sheet}_${item.X}_${item.Y}_${item.Type}_${item.Equip.Part}`

  if (index !== undefined) {
    return `${baseId}_${index}`
  }

  return baseId
}

// Handle item hover
const handleItemHover = (item: EquipmentItem, index: number, isHovering: boolean, event?: MouseEvent) => {
  if (isHovering && event?.currentTarget) {
    hoveredItem.value = item
    hoveredItemId.value = getItemId(item, index)
    hoveredElement.value = event.currentTarget as HTMLElement
  } else {
    hoveredItem.value = null
    hoveredItemId.value = ''
    hoveredElement.value = null
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
        if (entry.isIntersecting && hasMore.value && !isLoading.value && !searchTerm.value && selectedPart.value === 'all' && selectedClass.value === 'all') {
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
    if (!searchTerm.value && selectedPart.value === 'all' && selectedClass.value === 'all' && hasMore.value) {
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
watch(() => [searchTerm.value, selectedPart.value, selectedClass.value], async ([newTerm, newPart, newClass], [oldTerm, oldPart, oldClass]) => {
  // When search or filter is cleared, ensure observer is properly set up
  if ((oldTerm && !newTerm) || (oldPart !== 'all' && newPart === 'all') || (oldClass !== 'all' && newClass === 'all')) {
    if (!newTerm && newPart === 'all' && newClass === 'all') {
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

      <!-- Class Filter -->
      <div class="filter-group">
        <label class="filter-label">职业:</label>
        <select
          v-model="selectedClass"
          @change="handleClassFilter(selectedClass)"
          class="class-select"
        >
          <option value="all">全部职业</option>
          <option value="不限">不限</option>
          <option value="格斗">格斗</option>
          <option value="舞械">舞械</option>
          <option value="超能">超能</option>
          <option value="枪手">枪手</option>
          <option value="格斗/舞械">格斗/舞械</option>
          <option value="超能/枪手">超能/枪手</option>
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
          @mouseenter="(event) => handleItemHover(item, index, true, event)"
          @mouseleave="(event) => handleItemHover(item, index, false, event)"
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
          :trigger-element="hoveredElement"
        />
      </div>
    </div>

    <!-- Infinite Scroll Trigger -->
    <div v-if="!searchTerm && selectedPart === 'all' && selectedClass === 'all' && hasMore" class="infinite-scroll-trigger" style="height: 1px; width: 100%;"></div>

    <!-- Auto-loading Indicator -->
    <div v-if="!searchTerm && selectedPart === 'all' && selectedClass === 'all' && hasMore && isLoading" class="loading-indicator">
      <div class="loading-spinner"></div>
      <span>加载更多...</span>
    </div>

    <!-- No More Data -->
    <div v-if="!searchTerm && selectedPart === 'all' && selectedClass === 'all' && !hasMore && filteredEquipment.length > 0" class="no-more">
      <span>已加载全部数据</span>
    </div>

    <!-- No Results -->
    <div v-if="filteredEquipment.length === 0 && !isLoading" class="no-results">
      <p v-if="searchTerm || selectedPart !== 'all' || selectedClass !== 'all'">
        未找到符合条件的装备
        <span v-if="searchTerm"> "{{ searchTerm }}"</span>
        <span v-if="selectedPart !== 'all'"> ({{ selectedPart }})</span>
        <span v-if="selectedClass !== 'all'"> ({{ selectedClass }})</span>
      </p>
      <p v-else>暂无数据</p>
    </div>

      </div>
</template>

<style scoped>
.equipment-view {
  padding: 20px 200px;
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
    padding: 30px 200px;
  }
}

@media (min-width: 1920px) {
  .equipment-view {
    padding: 40px 200px;
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

.class-select {
  padding: 8px 12px;
  border-radius: 20px;
  border: 2px solid #444;
  background-color: #2a2a2a;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  cursor: pointer;
  min-width: 120px;
}

.class-select:focus {
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
  justify-content: center;
  width: 100%;
  padding: 20px;
  border: 2px solid #444;
  border-radius: 12px;
  background-color: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  margin: 0 auto;
  max-width: 1200px;
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
    padding: 10px 20px;
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
    padding: 15px;
    max-width: 100%;
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
