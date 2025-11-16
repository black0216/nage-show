<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/" class="nav-link" active-class="active">首页</RouterLink>
        <RouterLink to="/drops" class="nav-link" active-class="active">掉落表</RouterLink>
        <RouterLink to="/equipment" class="nav-link" active-class="active">装备表</RouterLink>
        <RouterLink to="/crafting" class="nav-link" active-class="active">合成表</RouterLink>
        <RouterLink to="/ranking" class="nav-link" active-class="active">排行</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <!-- Global Back to Top Button -->
    <BackToTop />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.header {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1.5rem;
  position: relative;
}


.nav-link {
  color: rgba(219, 234, 254, 0.9);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid transparent;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(8px);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.nav-link:hover {
  transform: translateY(-3px) scale(1.05);
  color: white;
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(37, 99, 235, 0.4);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link.active {
  background: linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa);
  color: white;
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: linear-gradient(135deg, #60a5fa, #93c5fd);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
}




.main-content {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 80px); /* 减去header高度 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .header {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .nav {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>
