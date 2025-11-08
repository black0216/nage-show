<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

interface DropItem {
  Name: string
  Sheet: string
  Type: number // 1: 普通, 2: 礼包, 3: 装备
  X: number
  Y: number
  Gifts?: string[]
}

interface DropData {
  NpcName: string
  DropItems: DropItem[]
}

// Global state for pagination
let allDropsData: DropData[] = []

const drops = ref<DropData[]>([])
const searchTerm = ref('')
const hoveredItem = ref<DropItem | null>(null)

// Pagination and loading states
const ITEMS_PER_PAGE = 20
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)

// Back to top button state
const showBackToTop = ref(false)

// Load all data for search functionality
const loadAllData = async () => {
  if (allDropsData.length > 0) return // Already loaded

  try {
    const response = await fetch('/Drops.json')
    const allData = await response.json()
    allDropsData = allData
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
  if (!searchTerm.value) return drops.value

  // Search from all data instead of just loaded data
  return allDropsData.filter(drop =>
    drop.NpcName.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Handle search with debouncing
let searchTimeout: number
const handleSearch = (term: string) => {
  clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    if (term) {
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
  const formattedSheet = sheet.startsWith('Item') ? sheet : `Item${sheet.substring(sheet.length - 2)}`
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

// Back to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Handle scroll events to show/hide back to top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Initialize component
onMounted(async () => {
  // Load all data on mount to enable complete search functionality
  await loadAllData()

  // Load initial page for display
  loadMoreDrops(true)

  // Setup intersection observer for infinite scroll
  setupInfiniteScroll()

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)
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
    // Remove scroll event listener
    window.removeEventListener('scroll', handleScroll)
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
  if (oldTerm && !newTerm) {
    await nextTick()
    updateObserverTarget()
  }
})
</script>

<template>
  <div class="drops-view">
    <h1>掉落表</h1>

    <div class="filters">
      <input
        v-model="searchTerm"
        @input="handleSearch(searchTerm)"
        type="text"
        placeholder="搜索怪物名称..."
        class="search-input"
      />
    </div>

    <div class="drops-container">
      <div
        v-for="(drop, index) in filteredDrops"
        :key="index"
        class="drop-item"
      >
        <div class="monster-name">{{ drop.NpcName }}</div>

        <div class="items-grid">
          <div
            v-for="(item, itemIndex) in drop.DropItems"
            :key="itemIndex"
            class="item-container"
            :class="{ 'equipment': item.Type === 3, 'gift': item.Type === 2 }"
          >
            <div
              class="item-wrapper"
              @mouseenter="hoveredItem = item"
              @mouseleave="hoveredItem = null"
            >
              <div
                class="item-icon"
                :style="getIconStyle(item.Sheet, item.X, item.Y)"
                :alt="item.Name"
              >
              </div>
              <div class="item-name-label">{{ item.Name }}</div>
            </div>

            <!-- Hover tooltip -->
            <div
              v-if="hoveredItem === item"
              class="tooltip"
              :class="{ 'gift-tooltip': item.Type === 2 }"
            >
              <div class="tooltip-header">
                <span class="item-name">{{ item.Name }}</span>
                <span class="item-type">{{ getItemTypeText(item.Type) }}</span>
              </div>

              <!-- Gift contents -->
              <div v-if="item.Type === 2 && item.Gifts && item.Gifts.length > 0" class="gift-contents">
                <div class="gift-title">礼包内容：</div>
                <div class="gift-items">
                  <div
                    v-for="(gift, giftIndex) in item.Gifts"
                    :key="giftIndex"
                    class="gift-item"
                  >
                    <span class="gift-item-name">{{ gift }}</span>
                  </div>
                </div>
              </div>
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
        <p v-if="searchTerm">未找到 "{{ searchTerm }}" 相关的怪物</p>
        <p v-else>暂无数据</p>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="back-to-top"
      title="返回顶部"
      aria-label="返回顶部"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.drops-view {
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
  .drops-view {
    padding: 30px;
  }
}

@media (min-width: 1920px) {
  .drops-view {
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

.drops-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.drop-item {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #444;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.monster-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ff6b6b;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
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
    padding: 10px;
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  height: 26px;
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

.tooltip {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #333 0%, #222 100%);
  border: 2px solid #555;
  border-radius: 6px;
  padding: 10px;
  min-width: 180px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.7);
  pointer-events: none;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: #555;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid #444;
  padding-bottom: 6px;
}

.item-name {
  font-weight: bold;
  color: #ffd700;
  font-size: 14px;
}

.item-type {
  background-color: #555;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.gift-contents {
  margin-top: 8px;
}

.gift-title {
  font-weight: bold;
  color: #4ecdc4;
  margin-bottom: 6px;
  font-size: 13px;
}

.gift-items {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.gift-item-name {
  color: #ccc;
  font-size: 12px;
  padding-left: 10px;
  position: relative;
}

.gift-item-name::before {
  content: '•';
  position: absolute;
  left: 2px;
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

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  color: #1a1a1a;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
}

.back-to-top:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.back-to-top svg {
  transition: transform 0.3s ease;
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

/* Animation for button appearance */
.back-to-top {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile optimization for back to top button */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }

  .back-to-top svg {
    width: 20px;
    height: 20px;
  }
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .drops-view {
    background-color: #0f0f0f;
  }

  .drop-item {
    background: linear-gradient(135deg, #1f1f1f 0%, #0f0f0f 100%);
  }
}
</style>
