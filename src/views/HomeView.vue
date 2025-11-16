<script setup lang="ts">
import { ref } from 'vue'



// Server features
const serverFeatures = [
  {
    title: "纳米装备系统",
    description: "纳米科技装备可无限叠加升级，打造专属未来战士装备，支持科技属性强化",
    icon: "⚡",
    highlight: "纳米科技",
    gradient: "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)"
  },
  {
    title: "智能AI助手",
    description: "配备AI战斗助手，自动分析战况并提供战术建议，让您在都市战争中更具优势",
    icon: "🤖",
    highlight: "AI助手",
    gradient: "linear-gradient(135deg, #00C851 0%, #00FF00 100%)"
  },
  {
    title: "机甲强化系统",
    description: "机甲装备开放+9改造，支持模块化升级。+1-3用纳米芯片/+4-6用能量核心/+7-9用量子装置",
    icon: "🦾",
    highlight: "+9机甲",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #C9302C 100%)"
  },
  {
    title: "都市商城",
    description: "未来都市购物中心，可购买全息特效、机甲皮肤及高科技道具，打造个性化形象",
    icon: "🏙️",
    highlight: "形象定制",
    gradient: "linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)"
  },
  {
    title: "科技积分系统",
    description: "等级100后在线1小时获得6科技积分，可在科技中心兑换先进装备和稀有材料",
    icon: "💎",
    highlight: "科技奖励",
    gradient: "linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)"
  },
  {
    title: "量子传送网络",
    description: "使用量子传送卡在城市各区域间快速移动，配备免费能量补给，24小时不间断探索",
    icon: "🌐",
    highlight: "快速传送",
    gradient: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)"
  },
  {
    title: "都市竞技场",
    description: "每晚8点开启未来都市竞技，持续20分钟。排名前五奖励2万钻石。严禁使用外挂，违者取消资格",
    icon: "🎯",
    highlight: "钻石奖励",
    gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)"
  },
  {
    title: "科技研究活动",
    description: "定期举办科技研究庆典和不限时都市活动，发放高科技装备和稀有研究材料",
    icon: "🔬",
    highlight: "科技庆典",
    gradient: "linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)"
  },
  {
    title: "都市精英系统",
    description: "精英等级制度，每日上线可领取对应级别的科技礼品包，所有物品绑定账号",
    icon: "🏆",
    highlight: "精英礼品",
    gradient: "linear-gradient(135deg, #795548 0%, #8D6E63 100%)"
  },
  {
    title: "未来特权",
    description: "VIP特权升级：量子传送次数增加、远程科技支援、自动资源管理、私人仓库扩容",
    icon: "🚀",
    highlight: "未来特权",
    gradient: "linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)"
  }
]

// Footer notice
const footerNotice = "欢迎各位都市先锋提供宝贵建议，优秀建议将获得科技大礼包，让我们一起建设更美好的未来世界"

</script>

<template>
  <div class="home-view">
    <!-- Hero Section with Background -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="hero-logo">
          <h1 class="game-title">✨  美丽世界 N-Age ✨ </h1>
          <div class="title-decoration">⚡ 💻 🏙️ ⚡</div>
        </div>

        <p class="hero-subtitle">欢迎来到未来都市的科技与冒险世界</p>

        <div class="hero-features">
          <div class="hero-feature">
            <span class="feature-emoji">🌃</span>
            <span>未来都市体验</span>
          </div>
          <div class="hero-feature">
            <span class="feature-emoji">⚡</span>
            <span>科技战斗系统</span>
          </div>
          <div class="hero-feature">
            <span class="feature-emoji">🤖</span>
            <span>智能AI交互</span>
          </div>
        </div>

        <div class="hero-cta">
          <button class="game-button primary">开始冒险</button>
          <button class="game-button secondary">了解更多</button>
        </div>
      </div>
    </section>

    <!-- Server Features Section -->
    <section class="server-features">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🏙️</span>
          N-Age 核心系统
          <span class="title-icon">🏙️</span>
        </h2>
        <p class="section-subtitle">未来都市特色系统，打造极致科幻体验</p>
      </div>

      <div class="server-features-container">
        <div
          v-for="(feature, index) in serverFeatures"
          :key="index"
          class="server-feature-card game-card"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <div class="feature-badge" :style="{ background: feature.gradient }">
            {{ feature.highlight }}
          </div>
          <div class="feature-content">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
          <div class="feature-sparkle">✨</div>
        </div>
      </div>
    </section>

    <!-- Characters Showcase Section -->
    <section class="characters-showcase">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🤖</span>
          未来职业系统
          <span class="title-icon">🤖</span>
        </h2>
        <p class="section-subtitle">选择你的都市职业，开启科技冒险</p>
      </div>

      <div class="characters-container game-card">
        <div class="character-item">
          <div class="character-icon">🦾</div>
          <h4>格斗士</h4>
          <p>近战王者，无限战力</p>
        </div>
        <div class="character-item">
          <div class="character-icon">⚡</div>
          <h4>超能者</h4>
          <p>精神力量，掌控异能</p>
        </div>
        <div class="character-item">
          <div class="character-icon">🎯</div>
          <h4>枪手</h4>
          <p>远程精准，致命一击</p>
        </div>
        <div class="character-item">
          <div class="character-icon">🛡️</div>
          <h4>舞械者</h4>
          <p>机械操控，战术支援</p>
        </div>
      </div>
    </section>

    <!-- Footer Notice -->
    <footer class="footer-notice">
      <div class="notice-content game-card">
        <div class="notice-icon">🌆</div>
        <p>{{ footerNotice }}</p>
        <div class="notice-decoration">⚡ 🏙️ 💻 ⚡</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: transparent;
  color: #fff;
  overflow-x: hidden;
  position: relative;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.95) 25%,
    rgba(51, 65, 85, 0.95) 50%,
    rgba(15, 23, 42, 0.95) 100%);
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  z-index: 1;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/index.webp');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  animation: backgroundFloat 20s ease-in-out infinite alternate;
}

@keyframes backgroundFloat {
  0% { transform: scale(1) translateY(0); }
  100% { transform: scale(1.1) translateY(-20px); }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.6) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-logo {
  margin-bottom: 2rem;
}

.game-title {
  font-size: clamp(3rem, 8vw, 5rem);
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #ffd700, #ff69b4, #00ffff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 50px rgba(255, 215, 0, 0.6);
  animation: titleGradient 3s ease-in-out infinite, titleGlow 2s ease-in-out infinite alternate;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  letter-spacing: 2px;
}

@keyframes titleGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes titleGlow {
  from { filter: brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.5)); }
  to { filter: brightness(1.2) drop-shadow(0 0 40px rgba(255, 215, 0, 0.8)); }
}

.title-decoration {
  font-size: 1.5rem;
  margin-top: 1rem;
  letter-spacing: 8px;
  animation: sparkle 2s ease-in-out infinite alternate;
}

@keyframes sparkle {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: rgba(203, 213, 225, 0.9);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.hero-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(71, 85, 105, 0.4);
  transition: all 0.3s ease;
  font-weight: 500;
  color: rgba(203, 213, 225, 0.9);
}

.hero-feature:hover {
  transform: translateY(-2px);
  background: rgba(51, 65, 85, 0.8);
  box-shadow: 0 8px 25px rgba(76, 29, 149, 0.3);
  border-color: rgba(168, 85, 247, 0.4);
}

.feature-emoji {
  font-size: 1.2rem;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.game-button.primary {
  background: linear-gradient(135deg, #7c3aed, #8b5cf6, #a855f7);
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
}

.game-button.primary:hover {
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
}

.game-button.secondary {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(71, 85, 105, 0.4);
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  color: rgba(203, 213, 225, 0.9);
}

.game-button.secondary:hover {
  background: rgba(51, 65, 85, 0.8);
  box-shadow: 0 8px 25px rgba(76, 29, 149, 0.3);
  border-color: rgba(168, 85, 247, 0.4);
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  font-weight: 700;
  color: rgba(203, 213, 225, 0.95);
  text-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 2rem;
  animation: bounce 2s infinite;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.section-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: rgba(148, 163, 184, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

/* Server Features Section */
.server-features {
  padding: 4rem 2rem;
  position: relative;
  background: rgba(255, 255, 255, 0.02);
}

.server-features-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  align-items: stretch;
}

.server-feature-card {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  animation: slideInUp 0.8s ease-out both;
  border-radius: 20px;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 2;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1;
  padding: 2rem;
  padding-right: 8rem;
  position: relative;
  z-index: 1;
}

.feature-sparkle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  animation: twinkle 2s infinite;
  z-index: 3;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.feature-icon {
  font-size: 3rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  align-self: flex-start;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.server-feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  line-height: 1.3;
  font-weight: 700;
}

.server-feature-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
  flex: 1;
  margin: 0;
}

/* Characters Showcase Section */
.characters-showcase {
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
}

.characters-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
}

.character-item {
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.character-item:hover {
  transform: translateY(-5px) scale(1.05);
}

.character-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: characterBounce 2s infinite;
  animation-delay: calc(var(--i) * 0.2s);
}

@keyframes characterBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.character-item h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 600;
}

.character-item p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Footer Notice */
.footer-notice {
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
}

.notice-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.notice-icon {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.notice-content p {
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
  flex: 1;
  min-width: 300px;
}

.notice-decoration {
  font-size: 1.5rem;
  letter-spacing: 10px;
  animation: sparkle 3s ease-in-out infinite;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-features {
    gap: 1rem;
  }

  .hero-feature {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .server-features-container {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 1rem;
  }

  .hero-features {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }

  .hero-cta {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }

  .game-button {
    width: 200px;
  }

  .server-features {
    padding: 3rem 1rem;
  }

  .server-features-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-content {
    padding: 1.5rem;
    padding-right: 6rem;
    text-align: center;
  }

  .feature-icon {
    align-self: center;
    font-size: 2.5rem;
  }

  .characters-showcase {
    padding: 3rem 1rem;
  }

  .characters-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    padding: 2rem 1rem;
  }

  .character-icon {
    font-size: 3rem;
  }

  .footer-notice {
    padding: 2rem 1rem;
  }

  .notice-content {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .game-title {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .title-decoration {
    font-size: 1.2rem;
    letter-spacing: 4px;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-feature {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 2.5rem);
  }

  .feature-badge {
    position: static;
    margin-bottom: 1rem;
    align-self: center;
  }

  .feature-content {
    padding: 1rem;
    padding-right: 1rem;
    text-align: center;
  }

  .server-feature-card {
    min-height: auto;
  }

  .characters-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1.5rem 1rem;
  }

  .character-icon {
    font-size: 2.5rem;
  }

  .character-item h4 {
    font-size: 1.1rem;
  }

  .notice-content p {
    font-size: 1rem;
    min-width: auto;
  }
}
</style>
