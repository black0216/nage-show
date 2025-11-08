<template>
  <div
    v-if="visible && item"
    class="item-tooltip"
    :class="{ 'gift-tooltip': item.Type === 2 }"
  >
    <div class="tooltip-header">
      <span class="item-name">{{ item.Name }}</span>
      <span class="item-type">{{ getItemTypeText(item.Type) }}</span>
    </div>

    <!-- Gift contents -->
    <div v-if="item.Type === 2 && item.Gifts && item.Gifts.length > 0" class="gift-contents">
      <div class="gift-title">礼包内容：</div>
      <div class="gift-items">
        <div
          v-for="(gift, giftIndex) in item.Gifts"
          :key="giftIndex"
          class="gift-item"
        >
          <span class="gift-item-name">{{ gift }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Unified interface for different item types
interface BaseItem {
  Name: string
  Type: number // 1: 普通, 2: 礼包, 3: 装备
  Gifts?: string[]
}

interface DropItem extends BaseItem {
  Sheet: string
  X: number
  Y: number
}

interface CraftingItem extends BaseItem {
  Sheet: string
  X: number
  Y: number
}

type ItemData = DropItem | CraftingItem

interface Props {
  item: ItemData | null
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  visible: false
})

// Get item type text
const getItemTypeText = (type: number): string => {
  switch (type) {
    case 1: return '普通道具'
    case 2: return '礼包'
    case 3: return '装备'
    default: return '未知'
  }
}
</script>

<style scoped>
.item-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #333 0%, #222 100%);
  border: 2px solid #555;
  border-radius: 6px;
  padding: 10px;
  min-width: 180px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.7);
  pointer-events: none;
  white-space: nowrap;
}

.item-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: #555;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid #444;
  padding-bottom: 6px;
}

.item-name {
  font-weight: bold;
  color: #ffd700;
  font-size: 14px;
}

.item-type {
  background-color: #555;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.gift-contents {
  margin-top: 8px;
}

.gift-title {
  font-weight: bold;
  color: #4ecdc4;
  margin-bottom: 6px;
  font-size: 13px;
}

.gift-items {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.gift-item-name {
  color: #ccc;
  font-size: 12px;
  padding-left: 10px;
  position: relative;
}

.gift-item-name::before {
  content: '•';
  position: absolute;
  left: 2px;
  color: #4ecdc4;
}
</style>
