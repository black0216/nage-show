<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Welcome messages rotation
const welcomeMessages = [
  "欢迎来到游戏世界！",
  "探索无尽的冒险之旅",
  "与全球玩家一起战斗",
  "发现稀有装备和道具"
]

const currentMessageIndex = ref(0)
const isVisible = ref(true)

// Rotate welcome messages
let messageInterval: number

const rotateMessage = () => {
  isVisible.value = false
  setTimeout(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % welcomeMessages.length
    isVisible.value = true
  }, 300)
}

// Parallax effect for hero section
const handleScroll = () => {
  const scrolled = window.scrollY
  const parallax = document.querySelector('.hero-section') as HTMLElement
  if (parallax) {
    // Reduce parallax effect to prevent overlap issues
    parallax.style.transform = `translateY(${Math.min(scrolled * 0.3, 100)}px)`
  }
}

onMounted(() => {
  messageInterval = setInterval(rotateMessage, 4000)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (messageInterval) {
    clearInterval(messageInterval)
  }
  window.removeEventListener('scroll', handleScroll)
})

// Quick navigation stats
const quickStats = [
  { label: "装备总数", value: "10,000+", icon: "⚔️" },
  { label: "合成配方", value: "5,000+", icon: "🔨" },
  { label: "怪物种类", value: "800+", icon: "👾" },
  { label: "在线玩家", value: "50,000+", icon: "👥" }
]

// Feature cards
const features = [
  {
    title: "装备查询",
    description: "浏览完整的装备数据库，查看详细属性和获取方式",
    icon: "🛡️",
    link: "/equipment",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "掉落查询",
    description: "查询各种怪物的掉落表，规划你的 farming 路线",
    icon: "💎",
    link: "/drops",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    title: "合成配方",
    description: "探索道具合成系统，发现强大的装备制作方法",
    icon: "⚗️",
    link: "/crafting",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "玩家排行",
    description: "查看顶级玩家排行榜，了解游戏中的强者",
    icon: "🏆",
    link: "/ranking",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  }
]

// Recent updates
const recentUpdates = [
  {
    title: "新版本 2.5.0 更新",
    description: "全新地图、装备副本上线",
    time: "2小时前",
    type: "update"
  },
  {
    title: "周末双倍经验活动",
    description: "本周末所有经验值翻倍",
    time: "5小时前",
    type: "event"
  },
  {
    title: "系统维护通知",
    description: "明天凌晨2点进行服务器维护",
    time: "1天前",
    type: "maintenance"
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-gradient">游戏资料站</span>
        </h1>
        <p class="hero-subtitle" :class="{ 'fade-in': isVisible }">
          {{ welcomeMessages[currentMessageIndex] }}
        </p>
        <div class="hero-stats">
          <div
            v-for="(stat, index) in quickStats"
            :key="index"
            class="stat-item"
          >
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-content">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-particles">
        <div class="particle" v-for="i in 20" :key="i" :style="{
          '--delay': `${i * 0.2}s`,
          '--duration': `${3 + Math.random() * 4}s`
        }"></div>
      </div>
    </section>

    <!-- Quick Access Section -->
    <section class="quick-access">
      <h2 class="section-title">快速导航</h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card"
          @click="$router.push(feature.link)"
        >
          <div class="card-header" :style="{ background: feature.gradient }">
            <div class="card-icon">{{ feature.icon }}</div>
          </div>
          <div class="card-body">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <div class="card-link">立即查看 →</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Updates Section -->
    <section class="recent-updates">
      <h2 class="section-title">最新动态</h2>
      <div class="updates-container">
        <div
          v-for="(update, index) in recentUpdates"
          :key="index"
          class="update-item"
        >
          <div class="update-icon" :class="update.type">
            <span v-if="update.type === 'update'">📱</span>
            <span v-else-if="update.type === 'event'">🎉</span>
            <span v-else>🔧</span>
          </div>
          <div class="update-content">
            <h4>{{ update.title }}</h4>
            <p>{{ update.description }}</p>
            <span class="update-time">{{ update.time }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>开始你的冒险之旅</h2>
        <p>加入我们，探索无限可能的游戏世界</p>
        <div class="cta-buttons">
          <button class="cta-button primary" @click="$router.push('/equipment')">
            查看装备
          </button>
          <button class="cta-button secondary" @click="$router.push('/ranking')">
            排行榜
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  color: #fff;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  z-index: 1;
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 1000px;
  width: 100%;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.title-gradient {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #ccc;
  margin-bottom: 3rem;
  line-height: 1.6;
  transition: opacity 0.3s ease;
}

.fade-in {
  opacity: 1;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
}

.stat-icon {
  font-size: 2rem;
  opacity: 0.8;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
  opacity: 0.8;
}

/* Particles */
.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 215, 0, 0.6);
  border-radius: 50%;
  animation: float var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

/* Quick Access Section */
.quick-access {
  padding: 4rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #444;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  border-color: #666;
}

.card-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.card-icon {
  font-size: 3rem;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}

.card-body {
  padding: 2rem;
}

.card-body h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.card-body p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-link {
  color: #ffd700;
  font-weight: 500;
  transition: all 0.3s ease;
}

.feature-card:hover .card-link {
  transform: translateX(5px);
}

/* Recent Updates Section */
.recent-updates {
  padding: 4rem 4rem;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  z-index: 2;
}

.updates-container {
  max-width: 1000px;
  margin: 0 auto;
}

.update-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 12px;
  border: 1px solid #444;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.update-item:hover {
  border-color: #666;
  transform: translateX(5px);
}

.update-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.update-icon.update {
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.4);
}

.update-icon.event {
  background: rgba(240, 147, 251, 0.2);
  border: 1px solid rgba(240, 147, 251, 0.4);
}

.update-icon.maintenance {
  background: rgba(255, 193, 7, 0.2);
  border: 1px solid rgba(255, 193, 7, 0.4);
}

.update-content {
  flex: 1;
}

.update-content h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.update-content p {
  color: #ccc;
  margin-bottom: 0.5rem;
}

.update-time {
  font-size: 0.9rem;
  color: #888;
}

/* CTA Section */
.cta-section {
  padding: 6rem 4rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
  position: relative;
  z-index: 2;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

.cta-content p {
  font-size: 1.3rem;
  color: #ccc;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.cta-button.primary {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a1a1a;
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 215, 0, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: #ffd700;
  border: 2px solid #ffd700;
}

.cta-button.secondary:hover {
  background: rgba(255, 215, 0, 0.1);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .quick-access {
    padding: 4rem 3rem;
    max-width: 1200px;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .recent-updates {
    padding: 4rem 3rem;
  }

  .cta-section {
    padding: 6rem 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 1rem;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-item {
    padding: 1rem;
  }

  .quick-access {
    padding: 3rem 2rem;
    max-width: 100%;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .recent-updates {
    padding: 3rem 2rem;
  }

  .cta-section {
    padding: 5rem 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .quick-access,
  .recent-updates {
    padding: 2rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .update-item {
    flex-direction: column;
    text-align: center;
  }

  .cta-section {
    padding: 4rem 1rem;
  }
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .home-view {
    background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);
  }
}
</style>