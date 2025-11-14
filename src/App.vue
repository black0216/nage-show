<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import BackToTop from './components/BackToTop.vue'
import UserMenu from './components/UserMenu.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

// 初始化应用时检查用户登录状态
onMounted(() => {
  userStore.initializeAuth()
})
</script>

<template>
  <div class="app-container">
    <header class="header">
      <nav class="nav">
        <div class="nav-left">
          <RouterLink to="/" class="nav-link" active-class="active">首页</RouterLink>
          <RouterLink to="/drops" class="nav-link" active-class="active">掉落表</RouterLink>
          <RouterLink to="/equipment" class="nav-link" active-class="active">装备表</RouterLink>
          <RouterLink to="/crafting" class="nav-link" active-class="active">合成表</RouterLink>
          <RouterLink to="/ranking" class="nav-link" active-class="active">排行</RouterLink>
          <RouterLink to="/lottery" class="nav-link lottery-link" active-class="active">
            <span class="lottery-icon">🎯</span>
            抽奖
          </RouterLink>
          <RouterLink to="/horse-race" class="nav-link race-link" active-class="active">
            <span class="race-icon">🐎</span>
            马战竞猜
          </RouterLink>
        </div>

        <!-- 用户区域 -->
        <div class="nav-right">
          <!-- 已登录：显示用户菜单 -->
          <UserMenu v-if="userStore.isAuthenticated" />

          <!-- 未登录：显示登录/注册按钮 -->
          <div v-else class="auth-buttons">
            <RouterLink to="/login" class="auth-btn login-btn">登录</RouterLink>
            <RouterLink to="/register" class="auth-btn register-btn">注册</RouterLink>
          </div>
        </div>
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
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
}

.nav-left {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  border: 1px solid transparent;
  white-space: nowrap;
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

/* 抽奖链接特殊样式 */
.lottery-link {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1)) !important;
  border-color: rgba(255, 152, 0, 0.3) !important;
  position: relative;
}

.lottery-link:hover {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 193, 7, 0.2)) !important;
  border-color: rgba(255, 152, 0, 0.5) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3) !important;
}

.lottery-icon {
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* 马战竞猜链接特殊样式 */
.race-link {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1)) !important;
  border-color: rgba(76, 175, 80, 0.3) !important;
  position: relative;
}

.race-link:hover {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.2)) !important;
  border-color: rgba(76, 175, 80, 0.5) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3) !important;
}

.race-icon {
  display: inline-block;
  animation: gallop 1.5s ease-in-out infinite;
}

@keyframes gallop {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-2px) rotate(-5deg);
  }
  75% {
    transform: translateX(2px) rotate(5deg);
  }
}

/* 认证按钮 */
.auth-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.auth-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 2px solid;
  white-space: nowrap;
}

.login-btn {
  color: #ffd700;
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.05);
}

.login-btn:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}

.register-btn {
  color: #ffffff;
  border-color: rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #ffd700, #ffed4e);
}

.register-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.main-content {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 80px); /* 减去header高度 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-left {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .nav-right {
    order: -1;
    width: 100%;
    justify-content: center;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .auth-buttons {
    gap: 0.5rem;
  }

  .auth-btn {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }

  .header {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .nav-left {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }

  .auth-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .auth-buttons {
    gap: 0.4rem;
  }
}
</style>
