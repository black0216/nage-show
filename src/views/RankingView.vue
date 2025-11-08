<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Ranking categories
const categories = [
  { id: 'level', name: '等级榜', icon: '⭐' },
  { id: 'power', name: '战力榜', icon: '⚔️' },
  { id: 'guild', name: '公会榜', icon: '🏰' },
  { id: 'pvp', name: '竞技榜', icon: '🎯' }
]

const selectedCategory = ref('level')

// Mock ranking data
const generateMockData = (category: string) => {
  const baseNames = ['暗影', '圣光', '狂战', '元素', '神射', '龙骑', '死灵', '时空', '风暴', '冰霜']
  const classes = ['刺客', '法师', '战士', '弓箭手', '龙骑士', '死灵法师', '时空法师', '风暴召唤者']
  const guilds = ['龙之军团', '光明联盟', '狂战部落', '元素学院', '猎鹰公会', '暗影兄弟会', '圣殿骑士团']

  const data = []
  for (let i = 1; i <= 100; i++) {
    const name = (baseNames[Math.floor(Math.random() * baseNames.length)] || '') +
                (classes[Math.floor(Math.random() * classes.length)] || '')
    const guild = guilds[Math.floor(Math.random() * guilds.length)] || '未知公会'

    data.push({
      rank: i,
      name: name,
      class: classes[Math.floor(Math.random() * classes.length)],
      level: Math.max(100 - i + Math.floor(Math.random() * 5), 50),
      power: Math.max(3000000 - (i * 25000) + Math.floor(Math.random() * 100000), 100000),
      guild: guild,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      change: Math.floor(Math.random() * 11) - 5, // -5 to +5
      isOnline: Math.random() > 0.3,
      title: i <= 3 ? getRankTitle(i) : null
    })
  }
  return data
}

const getRankTitle = (rank: number) => {
  switch(rank) {
    case 1: return '最强王者'
    case 2: return '超凡大师'
    case 3: return '璀璨钻石'
    default: return null
  }
}

const rankingData = ref(generateMockData(selectedCategory.value))
const isLoading = ref(false)

// Auto-refresh simulation
let refreshInterval: number

const startAutoRefresh = () => {
  refreshInterval = setInterval(() => {
    // Simulate small ranking changes
    rankingData.value = rankingData.value.map(player => ({
      ...player,
      power: player.power + Math.floor(Math.random() * 1000) - 500,
      change: Math.floor(Math.random() * 3) - 1,
      isOnline: Math.random() > 0.3
    }))
  }, 10000) // Update every 10 seconds
}

const handleCategoryChange = async (categoryId: string) => {
  selectedCategory.value = categoryId
  isLoading.value = true

  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 500))

  rankingData.value = generateMockData(categoryId)
  isLoading.value = false
}

// Computed properties
const topPlayers = computed(() => rankingData.value.slice(0, 3))
const otherPlayers = computed(() => rankingData.value.slice(3, 20))

// Format large numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Get rank change indicator
const getRankChangeClass = (change: number) => {
  if (change > 0) return 'up'
  if (change < 0) return 'down'
  return 'neutral'
}

const getRankChangeIcon = (change: number) => {
  if (change > 0) return '↑'
  if (change < 0) return '↓'
  return '—'
}

onMounted(() => {
  startAutoRefresh()
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<template>
  <div class="ranking-view">
    <!-- Header Section -->
    <section class="ranking-header">
      <h1 class="page-title">
        <span class="title-gradient">玩家排行榜</span>
      </h1>
      <p class="page-subtitle">实时更新 · 每10秒自动刷新</p>

      <!-- Category Tabs -->
      <div class="category-tabs">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-tab"
          :class="{ active: selectedCategory === category.id }"
          @click="handleCategoryChange(category.id)"
        >
          <span class="tab-icon">{{ category.icon }}</span>
          <span class="tab-name">{{ category.name }}</span>
        </div>
      </div>
    </section>

    <!-- Top 3 Players Showcase -->
    <section class="top-players">
      <div class="podium">
        <div
          v-for="(player, index) in topPlayers"
          :key="player.rank"
          class="podium-player"
          :class="`rank-${player.rank}`"
        >
          <div class="podium-position">
            <div class="rank-medal">
              <span v-if="player.rank === 1">👑</span>
              <span v-else-if="player.rank === 2">🥈</span>
              <span v-else>🥉</span>
            </div>
            <div class="rank-number">#{{ player.rank }}</div>
          </div>

          <div class="player-card">
            <div class="player-avatar-container">
              <div class="player-avatar" :class="{ online: player.isOnline }">
                <span class="avatar-text">{{ player.name.charAt(0) }}</span>
                <div class="online-indicator"></div>
              </div>
              <div class="player-title" v-if="player.title">{{ player.title }}</div>
            </div>

            <div class="player-info">
              <h3 class="player-name">{{ player.name }}</h3>
              <p class="player-class">{{ player.class }} Lv.{{ player.level }}</p>
              <div class="player-stats">
                <div class="stat-item">
                  <span class="stat-label">战力</span>
                  <span class="stat-value">{{ formatNumber(player.power) }}</span>
                </div>
              </div>
              <div class="player-guild">{{ player.guild }}</div>
            </div>

            <div class="rank-change" :class="getRankChangeClass(player.change)">
              <span class="change-icon">{{ getRankChangeIcon(player.change) }}</span>
              <span class="change-value">{{ Math.abs(player.change) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rankings Table -->
    <section class="rankings-section">
      <div class="rankings-container">
        <div class="table-header">
          <div class="header-rank">排名</div>
          <div class="header-player">玩家</div>
          <div class="header-level">等级</div>
          <div class="header-power">战力</div>
          <div class="header-guild">公会</div>
          <div class="header-change">变化</div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <span>加载排行榜数据中...</span>
        </div>

        <!-- Rankings List -->
        <div v-else class="rankings-list">
          <div
            v-for="player in otherPlayers"
            :key="player.rank"
            class="ranking-item"
          >
            <div class="rank-cell">
              <span class="rank-number">{{ player.rank }}</span>
            </div>

            <div class="player-cell">
              <div class="player-avatar-small" :class="{ online: player.isOnline }">
                <span class="avatar-text">{{ player.name.charAt(0) }}</span>
                <div class="online-indicator"></div>
              </div>
              <div class="player-details">
                <div class="player-name">{{ player.name }}</div>
                <div class="player-class">{{ player.class }}</div>
              </div>
            </div>

            <div class="level-cell">
              <span class="level-value">{{ player.level }}</span>
            </div>

            <div class="power-cell">
              <span class="power-value">{{ formatNumber(player.power) }}</span>
            </div>

            <div class="guild-cell">
              <span class="guild-name">{{ player.guild }}</span>
            </div>

            <div class="change-cell">
              <div class="rank-change" :class="getRankChangeClass(player.change)">
                <span class="change-icon">{{ getRankChangeIcon(player.change) }}</span>
                <span class="change-value">{{ Math.abs(player.change) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="load-more">
          <button class="load-more-btn">
            查看更多排名
            <span>↓</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Overview -->
    <section class="stats-overview">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-value">50,000+</div>
            <div class="stat-label">活跃玩家</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚔️</div>
          <div class="stat-content">
            <div class="stat-value">3.5M</div>
            <div class="stat-label">最高战力</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏰</div>
          <div class="stat-content">
            <div class="stat-value">500+</div>
            <div class="stat-label">活跃公会</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔄</div>
          <div class="stat-content">
            <div class="stat-value">10s</div>
            <div class="stat-label">更新频率</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ranking-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  color: #fff;
  padding: 2rem;
}

/* Header Section */
.ranking-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  font-weight: 700;
}

.title-gradient {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

.page-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border: 2px solid #444;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.category-tab:hover {
  border-color: #666;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.category-tab.active {
  background: linear-gradient(135deg, #444 0%, #333 100%);
  border-color: #ffd700;
  color: #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
}

.tab-icon {
  font-size: 1.5rem;
}

.tab-name {
  font-weight: 600;
  font-size: 1rem;
}

/* Top 3 Players Showcase */
.top-players {
  margin-bottom: 4rem;
}

.podium {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.podium-player {
  position: relative;
}

.podium-position {
  text-align: center;
  margin-bottom: 1rem;
}

.rank-medal {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.rank-number {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.player-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #444;
  position: relative;
  transition: all 0.3s ease;
}

.podium-player.rank-1 .player-card {
  border-color: #ffd700;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.podium-player.rank-2 .player-card {
  border-color: #c0c0c0;
  box-shadow: 0 0 20px rgba(192, 192, 192, 0.2);
}

.podium-player.rank-3 .player-card {
  border-color: #cd7f32;
  box-shadow: 0 0 20px rgba(205, 127, 50, 0.2);
}

.player-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.player-avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.player-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #444 0%, #333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  border: 3px solid #555;
  transition: all 0.3s ease;
}

.player-avatar.online {
  border-color: #4ade80;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.4);
}

.online-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4ade80;
  border: 2px solid #1a1a1a;
}

.player-title {
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a1a1a;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.player-info {
  text-align: center;
}

.player-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.player-class {
  color: #ccc;
  margin-bottom: 1rem;
}

.player-stats {
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #888;
  font-size: 0.9rem;
}

.stat-value {
  color: #ffd700;
  font-weight: 700;
  font-size: 1.1rem;
}

.player-guild {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid #444;
}

.rank-change {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rank-change.up {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.4);
}

.rank-change.down {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.rank-change.neutral {
  background: rgba(255, 255, 255, 0.1);
  color: #888;
  border: 1px solid #444;
}

/* Rankings Section */
.rankings-section {
  max-width: 1200px;
  margin: 0 auto 4rem;
}

.rankings-container {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 16px;
  border: 1px solid #444;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 80px 120px 150px 80px;
  background: linear-gradient(135deg, #444 0%, #333 100%);
  padding: 1.5rem;
  font-weight: 600;
  color: #ffd700;
  border-bottom: 2px solid #555;
}

.table-header > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  color: #ccc;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #333;
  border-top: 3px solid #ffd700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.rankings-list {
  max-height: 600px;
  overflow-y: auto;
}

.ranking-item {
  display: grid;
  grid-template-columns: 80px 1fr 80px 120px 150px 80px;
  padding: 1.5rem;
  border-bottom: 1px solid #333;
  align-items: center;
  transition: all 0.3s ease;
}

.ranking-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.ranking-item:last-child {
  border-bottom: none;
}

.rank-cell {
  display: flex;
  justify-content: center;
}

.rank-number {
  font-weight: 700;
  color: #ccc;
  font-size: 1.1rem;
}

.player-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.player-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #444 0%, #333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  position: relative;
  border: 2px solid #555;
  flex-shrink: 0;
}

.player-avatar-small.online {
  border-color: #4ade80;
}

.player-avatar-small .online-indicator {
  width: 10px;
  height: 10px;
  bottom: 2px;
  right: 2px;
}

.avatar-text {
  font-size: 0.9rem;
}

.player-details {
  flex: 1;
}

.player-name {
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
}

.player-class {
  font-size: 0.85rem;
  color: #888;
}

.level-cell, .power-cell, .guild-cell {
  display: flex;
  justify-content: center;
}

.level-value, .power-value, .guild-name {
  color: #ccc;
  font-weight: 500;
}

.power-value {
  color: #ffd700;
  font-weight: 600;
}

.change-cell {
  display: flex;
  justify-content: center;
}

.change-cell .rank-change {
  position: static;
  padding: 0.25rem 0.5rem;
}

.load-more {
  padding: 2rem;
  text-align: center;
}

.load-more-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #444 0%, #333 100%);
  border: 2px solid #666;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.load-more-btn:hover {
  border-color: #ffd700;
  color: #ffd700;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

/* Stats Overview */
.stats-overview {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #666;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.stat-icon {
  font-size: 2.5rem;
  opacity: 0.8;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #ccc;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .ranking-view {
    padding: 1rem;
  }

  .category-tabs {
    gap: 0.5rem;
  }

  .category-tab {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .podium {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .player-card {
    padding: 1.5rem;
  }

  .player-avatar {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .table-header,
  .ranking-item {
    grid-template-columns: 60px 1fr 60px 80px 1fr 60px;
  }

  .guild-name {
    display: none;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .table-header,
  .ranking-item {
    grid-template-columns: 50px 1fr 50px 70px;
  }

  .table-header > div:nth-child(5),
  .ranking-item > div:nth-child(5),
  .table-header > div:nth-child(6),
  .ranking-item > div:nth-child(6) {
    display: none;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .rankings-list {
    max-height: 400px;
  }
}

/* Custom scrollbar */
.rankings-list::-webkit-scrollbar {
  width: 8px;
}

.rankings-list::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.rankings-list::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.rankings-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .ranking-view {
    background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);
  }
}
</style>