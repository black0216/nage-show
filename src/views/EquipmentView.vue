<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ItemTooltip from '../components/ItemTooltip.vue'
import type { EquipmentItem } from '../types'
import { PART_MAP, CLASS_MAP } from '../types'
import { loadEquipData } from '../utils/protobuf.utils'

// Global state for pagination
let allEquipmentData: EquipmentItem[] = []

const equipment = ref<EquipmentItem[]>([])
const searchTerm = ref('')
const selectedPart = ref<string>('all')
const selectedClass = ref<string>('all')
const hoveredItem = ref<EquipmentItem | null>(null)
const hoveredItemId = ref<string | null>(null)
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
    allEquipmentData = await loadEquipData()
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
    hoveredItemId.value = null
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

    <!-- Global Item Tooltip -->
    <ItemTooltip
      :item="hoveredItem"
      :visible="hoveredItemId !== null"
      :trigger-element="hoveredElement"
    />

      </div>
</template>

<style scoped>
.equipment-view {
  padding: 2rem;
  width: 100%;
  max-width: none;
  margin: 0;
  background: transparent;
  color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
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
  margin-bottom: 3rem;
  color: rgba(203, 213, 225, 0.95);
  text-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

h1::before {
  content: '⚔️';
  font-size: 2rem;
  animation: bounce 2s infinite;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
}

h1::after {
  content: '🛡️';
  font-size: 2rem;
  animation: bounce 2s infinite 0.5s;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
}

.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  color: rgba(203, 213, 225, 0.9);
  font-weight: 600;
  font-size: 0.95rem;
}

.part-select,
.class-select {
  padding: 0.8rem 1rem;
  border-radius: 25px;
  border: 2px solid rgba(71, 85, 105, 0.4);
  background: rgba(30, 41, 59, 0.8);
  color: rgba(203, 213, 225, 0.9);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(5px);
  min-width: 120px;
}

.part-select:focus,
.class-select:focus {
  border-color: rgba(168, 85, 247, 0.4);
  background: rgba(51, 65, 85, 0.8);
  box-shadow: 0 0 20px rgba(76, 29, 149, 0.3);
}

.part-select option,
.class-select option {
  background: rgba(15, 23, 42, 0.95);
  color: rgba(203, 213, 225, 0.9);
}

.search-input {
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 2px solid rgba(71, 85, 105, 0.4);
  background: rgba(30, 41, 59, 0.8);
  color: rgba(203, 213, 225, 0.9);
  font-size: 0.9rem;
  width: 250px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.search-input::placeholder {
  color: rgba(148, 163, 184, 0.6);
}

.search-input:focus {
  border-color: rgba(168, 85, 247, 0.4);
  background: rgba(51, 65, 85, 0.8);
  box-shadow: 0 0 20px rgba(76, 29, 149, 0.3);
}

.equipment-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  gap: 1.2rem;
  justify-content: center;
  width: 100%;
  padding: 2.5rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  overflow: hidden;
}

.equipment-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #4c1d95, #6d28d9, #a855f7);
  border-radius: 20px 20px 0 0;
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
  border: 2px solid rgba(71, 85, 105, 0.4);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(15, 23, 42, 0.8);
  flex-shrink: 0;
  backdrop-filter: blur(5px);
}

.item-icon:hover {
  border-color: rgba(248, 113, 113, 0.8);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(248, 113, 113, 0.5);
}

.item-name-label {
  font-size: 11px;
  color: rgba(203, 213, 225, 0.8);
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
  gap: 1rem;
  margin-top: 3rem;
  padding: 2rem;
  color: rgba(203, 213, 225, 0.8);
  font-size: 1rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(71, 85, 105, 0.3);
  border-top: 3px solid #a855f7;
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
  color: rgba(203, 213, 225, 0.8);
  font-size: 1.1rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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
  .equipment-view {
    padding: 1rem;
  }

  .filters {
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
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
    padding: 1.5rem;
  }

  .loading-indicator,
  .no-results {
    margin: 2rem 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .equipment-view {
    padding: 0.5rem;
  }

  .filters {
    padding: 1rem;
  }

  .equipment-container {
    grid-template-columns: repeat(auto-fill, 55px);
    gap: 8px;
    padding: 1rem;
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
