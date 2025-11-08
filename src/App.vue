<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
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
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #2c3e50;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background-color: #34495e;
  color: #3498db;
}

.nav-link.active {
  background-color: #3498db;
  color: white;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
