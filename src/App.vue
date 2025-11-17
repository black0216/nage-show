<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import BackToTop from './components/BackToTop.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const router = useRouter()
const backToTopRef = ref<InstanceType<typeof BackToTop>>()

// 监听路由变化，确保切换时回到顶部
onMounted(() => {
  router.afterEach(() => {
    // 调用 BackToTop 组件的 scrollToTop 方法
    if (backToTopRef.value) {
      backToTopRef.value.scrollToTop()
    }
  })
})
</script>

<template>
  <div class="app-container">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/" class="nav-link" active-class="active">首页</RouterLink>
        <RouterLink to="/drops" class="nav-link" active-class="active">掉落表</RouterLink>
        <RouterLink to="/equipment" class="nav-link" active-class="active">装备表</RouterLink>
        <RouterLink to="/crafting" class="nav-link" active-class="active">合成表</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <!-- Global Back to Top Button -->
    <BackToTop ref="backToTopRef" />

    <!-- Theme Toggle Button -->
    <ThemeToggle />
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
  background: var(--card);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
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
  color: var(--card-foreground);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid transparent;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  background: var(--muted);
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
  color: var(--foreground);
  border-color: var(--primary);
  background: var(--accent);
  box-shadow: var(--shadow-xl);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link.active {
  background: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
  box-shadow: var(--shadow-md);
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
