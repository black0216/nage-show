<script setup lang="ts">
</script>

<template>
  <div class="equipment-view">
    <h1>装备表</h1>
    <p>查看游戏中所有装备的详细信息和属性</p>

    <div class="equipment-container">
      <div class="equipment-categories">
        <button class="category-btn active">武器</button>
        <button class="category-btn">防具</button>
        <button class="category-btn">饰品</button>
        <button class="category-btn">消耗品</button>
      </div>

      <div class="equipment-grid">
        <div class="equipment-item">
          <div class="item-icon">⚔️</div>
          <h4>传说之剑</h4>
          <p class="item-rarity legendary">传说</p>
          <div class="item-stats">
            <p>攻击力: +150</p>
            <p>暴击率: +15%</p>
            <p>攻击速度: +10%</p>
          </div>
        </div>

        <div class="equipment-item">
          <div class="item-icon">🛡️</div>
          <h4>龙鳞盾</h4>
          <p class="item-rarity epic">史诗</p>
          <div class="item-stats">
            <p>防御力: +120</p>
            <p>魔法抗性: +25</p>
            <p>生命值: +500</p>
          </div>
        </div>

        <div class="equipment-item">
          <div class="item-icon">🏹</div>
          <h4>精灵弓</h4>
          <p class="item-rarity rare">稀有</p>
          <div class="item-stats">
            <p>攻击力: +80</p>
            <p>射程: +20%</p>
            <p>命中: +10%</p>
          </div>
        </div>

        <div class="equipment-item">
          <div class="item-icon">🗡️</div>
          <h4>匕首</h4>
          <p class="item-rarity common">普通</p>
          <div class="item-stats">
            <p>攻击力: +30</p>
            <p>攻击速度: +25%</p>
            <p>暴击率: +5%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.equipment-view {
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #3498db;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #7f8c8d;
}

.equipment-container {
  max-width: 1000px;
  margin: 0 auto;
}

.equipment-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.category-btn:hover,
.category-btn.active {
  background: #3498db;
  color: white;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.equipment-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.equipment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.item-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.equipment-item h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.item-rarity {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 1rem;
}

.legendary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.epic {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.rare {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.common {
  background: #e2e8f0;
  color: #4a5568;
}

.item-stats {
  text-align: left;
  font-size: 0.9rem;
  color: #718096;
}

.item-stats p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
</style>