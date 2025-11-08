import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
  ],
})

export default router
