<script setup lang="ts">
</script>

<template>
  <div class="crafting-view">
    <h1>合成表</h1>
    <p>查看装备和道具的合成配方</p>

    <div class="crafting-container">
      <div class="recipe-categories">
        <button class="category-btn active">装备合成</button>
        <button class="category-btn">消耗品合成</button>
        <button class="category-btn">强化材料</button>
      </div>

      <div class="recipes-grid">
        <div class="recipe-item">
          <div class="recipe-result">
            <div class="item-icon">⚔️</div>
            <h4>传说之剑</h4>
          </div>
          <div class="recipe-arrow">+</div>
          <div class="recipe-materials">
            <div class="material">
              <span class="material-icon">🗡️</span>
              <span class="material-name">精铁剑 x3</span>
            </div>
            <div class="material">
              <span class="material-icon">💎</span>
              <span class="material-name">魔法水晶 x5</span>
            </div>
            <div class="material">
              <span class="material-icon">🔥</span>
              <span class="material-name">龙之炎 x1</span>
            </div>
          </div>
        </div>

        <div class="recipe-item">
          <div class="recipe-result">
            <div class="item-icon">🛡️</div>
            <h4>龙鳞盾</h4>
          </div>
          <div class="recipe-arrow">+</div>
          <div class="recipe-materials">
            <div class="material">
              <span class="material-icon">🛡️</span>
              <span class="material-name">铁盾 x2</span>
            </div>
            <div class="material">
              <span class="material-icon">🐉</span>
              <span class="material-name">龙鳞 x10</span>
            </div>
            <div class="material">
              <span class="material-icon">⚡</span>
              <span class="material-name">雷电石 x3</span>
            </div>
          </div>
        </div>

        <div class="recipe-item">
          <div class="recipe-result">
            <div class="item-icon">🧪</div>
            <h4>超级药水</h4>
          </div>
          <div class="recipe-arrow">+</div>
          <div class="recipe-materials">
            <div class="material">
              <span class="material-icon">🧪</span>
              <span class="material-name">生命药水 x3</span>
            </div>
            <div class="material">
              <span class="material-icon">🌿</span>
              <span class="material-name">魔法草药 x5</span>
            </div>
            <div class="material">
              <span class="material-icon">💧</span>
              <span class="material-name">纯净之水 x2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crafting-view {
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

.crafting-container {
  max-width: 1200px;
  margin: 0 auto;
}

.recipe-categories {
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

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.recipe-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.recipe-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.item-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.recipe-result h4 {
  font-size: 0.9rem;
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.recipe-arrow {
  font-size: 1.5rem;
  color: #3498db;
  font-weight: bold;
}

.recipe-materials {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.material {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.material-icon {
  font-size: 1.2rem;
}

.material-name {
  font-size: 0.9rem;
  color: #4a5568;
}
</style>