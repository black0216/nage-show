<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

// Handle scroll events to show/hide button
const handleScroll = () => {
  isVisible.value = window.scrollY > 100
}

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Initialize component
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="back-to-top"
    title="返回顶部"
    aria-label="返回顶部"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="tooltip">返回顶部</span>
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed !important;
  bottom: 30px !important;
  right: 30px !important;
  width: 50px !important;
  height: 50px !important;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex !important;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 9999 !important;
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  line-height: 1;
  text-align: center;
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
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

/* Tooltip */
.back-to-top .tooltip {
  position: absolute;
  bottom: 60px;
  right: 50%;
  transform: translateX(50%);
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  border: 1px solid #444;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 10000 !important;
}

.back-to-top .tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #2a2a2a;
}

.back-to-top:hover .tooltip {
  opacity: 1;
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

/* Ripple effect on click */
.back-to-top::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.back-to-top:active::before {
  width: 100px;
  height: 100px;
}

/* Mobile optimization */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 16px;
  }

  .back-to-top .tooltip {
    bottom: 55px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  .back-to-top svg {
    width: 20px;
    height: 20px;
  }

  .back-to-top .tooltip {
    bottom: 50px;
    font-size: 10px;
  }
}

/* Global overrides to ensure button displays correctly */
.back-to-top {
  box-sizing: border-box !important;
  min-width: 50px !important;
  min-height: 50px !important;
  max-width: 50px !important;
  max-height: 50px !important;
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .back-to-top {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  }
}
</style>