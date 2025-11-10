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
}

.header {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #444;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  border: 1px solid transparent;
}

.nav-link:hover {
  background-color: #333;
  color: #ffd700;
  border-color: #444;
}

.nav-link.active {
  background: linear-gradient(135deg, #444 0%, #333 100%);
  color: #ffd700;
  border-color: #666;
  box-shadow: 0 2px 4px rgba(255, 215, 0, 0.2);
}

.main-content {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 80px); /* 减去header高度 */
}
</style>
