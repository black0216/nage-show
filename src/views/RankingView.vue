<script setup lang="ts">
</script>

<template>
  <div class="ranking-view">
    <h1>排行榜</h1>
    <p>查看全服玩家的实力排名</p>

    <div class="ranking-container">
      <div class="ranking-tabs">
        <button class="tab-btn active">等级榜</button>
        <button class="tab-btn">战力榜</button>
        <button class="tab-btn">公会榜</button>
        <button class="tab-btn">竞技榜</button>
      </div>

      <div class="ranking-table">
        <div class="ranking-header">
          <div class="rank-header">排名</div>
          <div class="player-header">玩家</div>
          <div class="level-header">等级</div>
          <div class="power-header">战力</div>
          <div class="guild-header">公会</div>
        </div>

        <div class="ranking-list">
          <div class="ranking-item top-1">
            <div class="rank">🥇</div>
            <div class="player">
              <div class="player-avatar">👤</div>
              <div class="player-info">
                <div class="player-name">暗影刺客</div>
                <div class="player-class">刺客 Lv.99</div>
              </div>
            </div>
            <div class="level">99</div>
            <div class="power">2,850,000</div>
            <div class="guild">龙之军团</div>
          </div>

          <div class="ranking-item top-2">
            <div class="rank">🥈</div>
            <div class="player">
              <div class="player-avatar">👤</div>
              <div class="player-info">
                <div class="player-name">圣光法师</div>
                <div class="player-class">法师 Lv.98</div>
              </div>
            </div>
            <div class="level">98</div>
            <div class="power">2,750,000</div>
            <div class="guild">光明联盟</div>
          </div>

          <div class="ranking-item top-3">
            <div class="rank">🥉</div>
            <div class="player">
              <div class="player-avatar">👤</div>
              <div class="player-info">
                <div class="player-name">狂战士</div>
                <div class="player-class">战士 Lv.97</div>
              </div>
            </div>
            <div class="level">97</div>
            <div class="power">2,650,000</div>
            <div class="guild">狂战部落</div>
          </div>

          <div class="ranking-item">
            <div class="rank">4</div>
            <div class="player">
              <div class="player-avatar">👤</div>
              <div class="player-info">
                <div class="player-name">元素使</div>
                <div class="player-class">法师 Lv.96</div>
              </div>
            </div>
            <div class="level">96</div>
            <div class="power">2,500,000</div>
            <div class="guild">元素学院</div>
          </div>

          <div class="ranking-item">
            <div class="rank">5</div>
            <div class="player">
              <div class="player-avatar">👤</div>
              <div class="player-info">
                <div class="player-name">神射手</div>
                <div class="player-class">弓箭手 Lv.95</div>
              </div>
            </div>
            <div class="level">95</div>
            <div class="power">2,400,000</div>
            <div class="guild">猎鹰公会</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ranking-view {
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

.ranking-container {
  max-width: 900px;
  margin: 0 auto;
}

.ranking-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover,
.tab-btn.active {
  background: #3498db;
  color: white;
}

.ranking-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.ranking-header {
  display: grid;
  grid-template-columns: 80px 250px 80px 120px 150px;
  background: #3498db;
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 2px solid #2980b9;
}

.ranking-header > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ranking-list {
  background: white;
}

.ranking-item {
  display: grid;
  grid-template-columns: 80px 250px 80px 120px 150px;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
  transition: background-color 0.3s ease;
}

.ranking-item:hover {
  background: #f8f9fa;
}

.ranking-item.top-1 {
  background: linear-gradient(135deg, #fff9e6 0%, #fff5cc 100%);
  border-left: 4px solid #ffd700;
}

.ranking-item.top-2 {
  background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
  border-left: 4px solid #c0c0c0;
}

.ranking-item.top-3 {
  background: linear-gradient(135deg, #ffe4d6 0%, #ffd4b3 100%);
  border-left: 4px solid #cd7f32;
}

.rank {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.player-avatar {
  width: 40px;
  height: 40px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.player-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

.player-class {
  font-size: 0.8rem;
  color: #718096;
}

.level, .power, .guild {
  font-weight: 500;
  color: #4a5568;
}

.power {
  color: #3498db;
  font-weight: 600;
}

.guild {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  border: 1px solid #e2e8f0;
}
</style>