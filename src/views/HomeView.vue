<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // 可以添加其他初始化逻辑
})



// Server features
const serverFeatures = [
  {
    title: "材料叠加系统",
    description: "纳米/黄金/重生/改造/紫水晶/支票 都可以叠加（包括升级可直接叠加放入）",
    icon: "🔷",
    highlight: "无限叠加",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
  },
  {
    title: "超强自动补药",
    description: "自动补药的容量增加到20E，让您一次爽个够！可离线挂机摆摊！",
    icon: "💊",
    highlight: "20E容量",
    gradient: "linear-gradient(135deg, #00C851 0%, #00FF00 100%)"
  },
  {
    title: "装备强化系统",
    description: "装备开放+9（部分有隐藏属性）+1-3用纳米/+4-6用黄金/+7-9用紫水晶",
    icon: "⚔️",
    highlight: "+9强化",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #C9302C 100%)"
  },
  {
    title: "伊甸商店",
    description: "伊甸NPC可直接购买包括光环特效、装备皮肤及对应的各种道具打造属于自己的外观",
    icon: "✨",
    highlight: "外观定制",
    gradient: "linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)"
  },
  {
    title: "积分商城",
    description: "开放积分商城人物等级100后在线1小时可获得6积分，可在伊甸积分NPC购买道具",
    icon: "🎫",
    highlight: "在线奖励",
    gradient: "linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)"
  },
  {
    title: "传送卡兑换",
    description: "传送卡可用礼包的装备去NPC对话更换哦！免费的坚固药水，让你24小时挂机不烦脑",
    icon: "🎁",
    highlight: "免费药水",
    gradient: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)"
  },
  {
    title: "每日竞技场",
    description: "每晚8点开放竞技场持续20分钟，竞技排名前五奖励2W钻石。注：竞技场是激情之地，严禁消极刷分 一经举报核实将取消刷分者奖励",
    icon: "🏆",
    highlight: "钻石奖励",
    gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)"
  },
  {
    title: "定期活动",
    description: "本服还将定期和不定期的发放福利以及开展每周和每月活动",
    icon: "🎉",
    highlight: "丰富活动",
    gradient: "linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)"
  },
  {
    title: "会员系统",
    description: "开放等级制会员，每日上线可领取对应级别会员礼品。礼品均为绑定",
    icon: "👑",
    highlight: "每日礼品",
    gradient: "linear-gradient(135deg, #795548 0%, #8D6E63 100%)"
  },
  {
    title: "VIP特权",
    description: "VIP新增（飞旗数量，远程组队，钱满自动换票，仓库数量增加）",
    icon: "💎",
    highlight: "专属特权",
    gradient: "linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)"
  }
]

// Footer notice
const footerNotice = "欢迎大家提供宝贵建议 如您所提建议一经采纳 将给您奉上一份神秘大礼"

</script>

<template>
  <div class="home-view">
    <!-- Header -->
    <header class="home-header">
      <h1 class="main-title">本服特色</h1>
      <p class="subtitle">十大核心特色系统，打造极致游戏体验</p>
    </header>

    <!-- Server Features Section -->
    <section class="server-features">
      <div class="server-features-container">
        <div
          v-for="(feature, index) in serverFeatures"
          :key="index"
          class="server-feature-card"
        >
          <div class="feature-badge" :style="{ background: feature.gradient }">
            {{ feature.highlight }}
          </div>
          <div class="feature-content">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Notice -->
    <footer class="footer-notice">
      <div class="notice-content">
        <p>💡 {{ footerNotice }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  color: #fff;
  overflow-x: hidden;
}

/* Header */
.home-header {
  text-align: center;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.main-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1rem;
  font-weight: 700;
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

.subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

/* Server Features Section */
.server-features {
  padding: 2rem 4rem 4rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.02) 0%, transparent 100%);
  position: relative;
  z-index: 2;
}

.server-features-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  align-items: stretch;
}

.server-feature-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #444;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 180px;
}

.server-feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  border-color: #666;
}

.feature-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 2;
  white-space: nowrap;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  padding-right: 6rem;
}

/* Mobile responsive for server features */
@media (max-width: 768px) {
  .feature-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding-right: 0;
  }

  .feature-icon {
    align-self: center;
    font-size: 2.5rem;
  }

  .server-feature-card {
    padding: 1.5rem;
  }

  .feature-badge {
    position: static;
    margin-bottom: 1rem;
    align-self: center;
  }
}

.feature-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
  align-self: flex-start;
}

.server-feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  line-height: 1.3;
}

.server-feature-card p {
  color: #ccc;
  line-height: 1.5;
  font-size: 0.95rem;
  flex: 1;
  margin: 0;
}

/* Footer Notice */
.footer-notice {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  padding: 2rem;
  text-align: center;
}

.notice-content {
  max-width: 1000px;
  margin: 0 auto;
}

.notice-content p {
  color: #ffd700;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .home-header {
    padding: 3rem 2rem 1.5rem;
  }

  .server-features {
    padding: 1.5rem 3rem 3rem;
  }

  .server-features-container {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .home-header {
    padding: 2rem 1.5rem 1rem;
  }

  .server-features {
    padding: 1rem 2rem 2rem;
  }

  .server-features-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-notice {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .home-header {
    padding: 1.5rem 1rem 0.5rem;
  }

  .server-features {
    padding: 0.5rem 1rem 1.5rem;
  }

  .footer-notice {
    padding: 1rem;
  }
}


/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .home-view {
    background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);
  }
}
</style>