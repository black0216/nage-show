import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/drops',
      name: 'drops',
      component: () => import('../views/DropsView.vue')
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: () => import('../views/EquipmentView.vue')
    },
    {
      path: '/crafting',
      name: 'crafting',
      component: () => import('../views/CraftingView.vue')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../views/RankingView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresGuest: true // 只有未登录用户可以访问
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        requiresGuest: true // 只有未登录用户可以访问
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserCenterView.vue'),
      meta: {
        requiresAuth: true // 需要登录才能访问
      }
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: () => import('../views/LotteryView.vue'),
      meta: {
        requiresAuth: true // 需要登录才能访问
      }
    },
    {
      path: '/horse-race',
      name: 'horse-race',
      component: () => import('../views/HorseRaceView.vue'),
      meta: {
        requiresAuth: true // 需要登录才能访问
      }
    }
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查用户登录状态
  const isAuthenticated = checkAuthentication()

  // 需要登录的页面
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 重定向到登录页面，并保存目标路由
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // 只有游客才能访问的页面（登录/注册）
  if (to.meta.requiresGuest && isAuthenticated) {
    // 已登录用户访问登录页面，重定向到用户中心
    next({ name: 'user' })
    return
  }

  next()
})

// 检查用户认证状态的辅助函数
function checkAuthentication(): boolean {
  try {
    const userStore = useUserStore()
    return userStore.isAuthenticated
  } catch (error) {
    // 如果 store 还未初始化，检查本地存储
    const storedData = localStorage.getItem('nage_show_user_data')
    if (storedData) {
      try {
        const userData = JSON.parse(storedData)
        return !!(userData.user && userData.rememberMe)
      } catch (parseError) {
        return false
      }
    }
    return false
  }
}

export default router
