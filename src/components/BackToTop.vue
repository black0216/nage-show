<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)  // 初始不显示，滚动时才显示

// Handle scroll events to show/hide button
const handleScroll = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop
  isVisible.value = scrollY > 200  // 滚动超过200px时显示
}

// Scroll to top functionality
const scrollToTop = () => {
  console.log('BackToTop clicked') // Debug log

  // 使用多种方法确保滚动到顶部
  try {
    // 方法1：现代浏览器的smooth滚动
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } catch (e) {
    // 方法2：兼容性滚动
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  // 方法3：强制设置滚动位置（备用）
  setTimeout(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, 100)
}

// Initialize component
onMounted(() => {
  // 立即检查当前滚动位置
  handleScroll()
  // 添加滚动监听器
  window.addEventListener('scroll', handleScroll)
})

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    v-show="isVisible"
    @click="scrollToTop"
    class="back-to-top"
    title="返回顶部"
    aria-label="返回顶部"
    type="button"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style>
/* Global styles for BackToTop button */
.back-to-top {
  position: fixed !important;
  bottom: 30px !important;
  right: 30px !important;
  width: 50px !important;
  height: 50px !important;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%) !important;
  border: 2px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 50% !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 9999999 !important;
  color: #1a1a1a !important;
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.2) !important;
  transition: all 0.3s ease !important;
  pointer-events: auto !important;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  font-family: inherit !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  touch-action: manipulation !important;
  transform: translateZ(0) !important;
  will-change: transform !important;
}

.back-to-top:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.3) !important;
}

.back-to-top svg {
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
}
</style>