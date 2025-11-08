<script setup lang="ts">
</script>

<template>
  <div class="home-view">
    <h1>游戏官网首页</h1>
    <p>欢迎来到我们的游戏世界！</p>
    <div class="feature-cards">
      <div class="card">
        <h3>最新公告</h3>
        <p>游戏版本更新，新内容上线！</p>
      </div>
      <div class="card">
        <h3>热门活动</h3>
        <p>限时活动正在进行中，快来参与吧！</p>
      </div>
      <div class="card">
        <h3>游戏指南</h3>
        <p>新手入门攻略，助你快速上手！</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  text-align: center;
  color: #2c3e50;
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

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card p {
  font-size: 1rem;
  line-height: 1.6;
}
</style>