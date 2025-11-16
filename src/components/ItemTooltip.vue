<template>
  <div
    v-if="visible && item"
    ref="tooltipRef"
    class="item-tooltip"
    :class="{
      'gift-tooltip': item.Type === 2,
      'tooltip-top': position === 'top',
      'tooltip-bottom': position === 'bottom',
      'tooltip-left': position === 'left',
      'tooltip-right': position === 'right'
    }"
    :style="tooltipStyle"
  >
    <div class="tooltip-header">
      <span class="item-name">{{ item.Name }}</span>
      <span class="item-type">{{ getItemTypeText(item.Type) }}</span>
    </div>

    <!-- Equipment stats -->
    <div v-if="isEquipmentItem(item) && item.Equip" class="equipment-stats">
      <div class="stats-section">
        <div class="stats-title">基础属性</div>
        <div class="stats-grid">
          <div v-if="item.Equip.Ap > 0" class="stat-item">
            <span class="stat-name">AP</span>
<!--            <span class="stat-value primary">{{ item.Equip.Ap }}</span>-->
            <span class="stat-value primary">{{ item.Equip.Ap }}<span v-if="item.Equip.AddAp > 0"> (+{{ item.Equip.AddAp }})</span></span>

          </div>
          <div v-if="item.Equip.Dp > 0" class="stat-item">
            <span class="stat-name">DP</span>
            <span class="stat-value secondary">{{ item.Equip.Dp }}<span v-if="item.Equip.AddDp > 0"> (+{{ item.Equip.AddDp }})</span></span>
          </div>
        </div>
      </div>

      <div v-if="hasAdditionalStats" class="stats-section">
        <div class="stats-title">附加属性</div>
        <div class="stats-grid">
          <div v-if="item.Equip.AddHp > 0" class="stat-item">
            <span class="stat-name">HP</span>
            <span class="stat-value hp">+{{ item.Equip.AddHp }}</span>
          </div>
          <div v-if="item.Equip.AddSp > 0" class="stat-item">
            <span class="stat-name">SP</span>
            <span class="stat-value sp">+{{ item.Equip.AddSp }}</span>
          </div>

          <div v-if="item.Equip.AddStr > 0" class="stat-item">
            <span class="stat-name">STR</span>
            <span class="stat-value str">+{{ item.Equip.AddStr }}</span>
          </div>
          <div v-if="item.Equip.AddDex > 0" class="stat-item">
            <span class="stat-name">DEX</span>
            <span class="stat-value dex">+{{ item.Equip.AddDex }}</span>
          </div>
          <div v-if="item.Equip.AddInt > 0" class="stat-item">
            <span class="stat-name">INT</span>
            <span class="stat-value int">+{{ item.Equip.AddInt }}</span>
          </div>
          <div v-if="item.Equip.AddSt > 0" class="stat-item">
            <span class="stat-name">ST</span>
            <span class="stat-value st">+{{ item.Equip.AddSt }}</span>
          </div>
          <div v-if="item.Equip.AddEsp > 0" class="stat-item">
            <span class="stat-name">SP</span>
            <span class="stat-value esp">+{{ item.Equip.AddEsp }}</span>
          </div>
          <div v-if="item.Equip.AddSpt > 0" class="stat-item">
            <span class="stat-name">SPT</span>
            <span class="stat-value spt">+{{ item.Equip.AddSpt }}</span>
          </div>
          <div v-if="item.Equip.AddAsPer > 0" class="stat-item">
            <span class="stat-name">增加攻击速度</span>
            <span class="stat-value asper">+{{ item.Equip.AddAsPer }}%</span>
          </div>
          <div v-if="item.Equip.AddApPer > 0" class="stat-item">
            <span class="stat-name">AP增加</span>
            <span class="stat-valueapper">+{{ item.Equip.AddApPer }}%</span>
          </div>
          <div v-if="item.Equip.AddDpPer > 0" class="stat-item">
            <span class="stat-name">DP增加</span>
            <span class="stat-value dpper">+{{ item.Equip.AddDpPer }}%</span>
          </div>
          <div v-if="item.Equip.AddHpPer > 0" class="stat-item">
            <span class="stat-name">HP增加</span>
            <span class="stat-value hpper">+{{ item.Equip.AddHpPer }}%</span>
          </div>
          <div v-if="item.Equip.AddSpPer > 0" class="stat-item">
            <span class="stat-name">SP增加</span>
            <span class="stat-value spper">+{{ item.Equip.AddSpPer }}%</span>
          </div>
          <div v-if="item.Equip.AddMartial > 0" class="stat-item">
            <span class="stat-name">格斗技巧</span>
            <span class="stat-value martial">+{{ item.Equip.AddMartial }}</span>
          </div>
          <div v-if="item.Equip.AddTactic > 0" class="stat-item">
            <span class="stat-name">命中</span>
            <span class="stat-value tactic">+{{ item.Equip.AddTactic }}</span>
          </div>
          <div v-if="item.Equip.AddTacticPer > 0" class="stat-item">
            <span class="stat-name">命中增加</span>
            <span class="stat-value tacticper">+{{ item.Equip.AddTacticPer }}%</span>
          </div>
          <div v-if="item.Equip.AddBrandish > 0" class="stat-item">
            <span class="stat-name">舞械技巧</span>
            <span class="stat-value brandish">+{{ item.Equip.AddBrandish }}</span>
          </div>
          <div v-if="item.Equip.AddChakra > 0" class="stat-item">
            <span class="stat-name">超能技巧</span>
            <span class="stat-value chakra">+{{ item.Equip.AddChakra }}</span>
          </div>
          <div v-if="item.Equip.AddPrana > 0" class="stat-item">
            <span class="stat-name">枪手技巧</span>
            <span class="stat-value prana">+{{ item.Equip.AddPrana }}</span>
          </div>
          <div v-if="item.Equip.AddDodge > 0" class="stat-item">
            <span class="stat-name">格挡</span>
            <span class="stat-value dodge">+{{ item.Equip.AddDodge }}</span>
          </div>
          <div v-if="item.Equip.AddMs > 0" class="stat-item">
            <span class="stat-name">移动速度</span>
            <span class="stat-value ms">+{{ item.Equip.AddMs }}</span>
          </div>
        </div>
      </div>

      <div class="stats-section">
        <div class="stats-title">装备需求</div>
        <div class="requirements-grid">
          <div v-if="item.Equip.NeedClass !== undefined && item.Equip.NeedClass !== null" class="requirement-item">
            <span class="requirement-name">职业</span>
            <span class="requirement-value">{{ getClassName(item.Equip.NeedClass) }}</span>
          </div>
          <div v-if="item.Equip.NeedHero > 0" class="requirement-item">
            <span class="requirement-name">英雄等级</span>
            <span class="requirement-value">{{ getHeroLevelText(item.Equip.NeedHero) }}</span>
          </div>
          <div v-if="item.Equip.NeedStr > 0" class="requirement-item">
            <span class="requirement-name">STR</span>
            <span class="requirement-value">{{ item.Equip.NeedStr }}</span>
          </div>
          <div v-if="item.Equip.NeedDex > 0" class="requirement-item">
            <span class="requirement-name">DEX</span>
            <span class="requirement-value">{{ item.Equip.NeedDex }}</span>
          </div>
          <div v-if="item.Equip.NeedInt > 0" class="requirement-item">
            <span class="requirement-name">INT</span>
            <span class="requirement-value">{{ item.Equip.NeedInt }}</span>
          </div>
            <div v-if="item.Equip.NeedEsp > 0" class="requirement-item">
            <span class="requirement-name">ESP</span>
            <span class="requirement-value">{{ item.Equip.NeedEsp }}</span>
          </div>
          <div v-if="item.Equip.NeedSpt > 0" class="requirement-item">
            <span class="requirement-name">SPT</span>
            <span class="requirement-value">{{ item.Equip.NeedSpt }}</span>
          </div>
          <div v-if="item.Equip.NeedChakra > 0" class="requirement-item">
            <span class="requirement-name">超能技巧</span>
            <span class="requirement-value">{{ item.Equip.NeedChakra }}</span>
          </div>
          <div v-if="item.Equip.NeedBrandish > 0" class="requirement-item">
            <span class="requirement-name">舞械技巧</span>
            <span class="requirement-value">{{ item.Equip.NeedBrandish }}</span>
          </div>
          <div v-if="item.Equip.NeedMartial > 0" class="requirement-item">
            <span class="requirement-name">格斗技巧</span>
            <span class="requirement-value">{{ item.Equip.NeedMartial }}</span>
          </div>
          <div v-if="item.Equip.NeedTactic > 0" class="requirement-item">
            <span class="requirement-name">命中技巧</span>
            <span class="requirement-value">{{ item.Equip.NeedTactic }}</span>
          </div>
          <div v-if="item.Equip.NeedPrana > 0" class="requirement-item">
            <span class="requirement-name">枪手技巧</span>
            <span class="requirement-value">{{ item.Equip.NeedPrana }}</span>
          </div>
          <div v-if="item.Equip.NeedDodge > 0" class="requirement-item">
            <span class="requirement-name">格挡技巧</span>
            <span class="requirement-value">{{ item.Equip.NeedDodge }}</span>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="isEquipmentItem(item) && item.Equip.AddSkill && item.Equip.AddSkill.length > 0" class="stats-section">
        <div class="stats-title">技能加成</div>
        <div class="skills-grid">
          <div
            v-for="(skill, skillIndex) in item.Equip.AddSkill"
            :key="skillIndex"
            class="skill-item"
          >
            <span class="skill-name">{{ getSkillName(skill.K) }}</span>
            <span class="skill-level">+{{ skill.V }}级</span>
          </div>
        </div>
      </div>
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
import { computed, ref, nextTick, watch } from 'vue'
import type { UnifiedItem, EquipmentItem } from '../types'
import { SKILL_MAP, CLASS_MAP } from '../types'

type ItemData = UnifiedItem | EquipmentItem

interface Props {
  item: ItemData | null
  visible: boolean
  triggerElement?: HTMLElement | null
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  visible: false,
  triggerElement: null
})

// Get hero level text from hero level ID
const getHeroLevelText = (heroLevel: number): string => {
  switch (heroLevel) {
    case 0: return '不限'
    case 1: return 'HERO'
    case 2: return 'S-HERO'
    case 3: return 'X-HERO'
    default: return '未知'
  }
}

// Template ref
const tooltipRef = ref<HTMLElement | null>(null)

// Position state
const position = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const tooltipStyle = ref<Record<string, string>>({})

// Calculate optimal tooltip position
const calculatePosition = async () => {
  if (!props.visible || !props.triggerElement) return

  await nextTick()

  // Get trigger element position
  const trigger = props.triggerElement.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Default tooltip dimensions (more compact)
  let tooltipWidth = 280
  let tooltipHeight = 200

  // Try to get actual tooltip dimensions
  if (tooltipRef.value) {
    const rect = tooltipRef.value.getBoundingClientRect()
    if (rect.width > 0) tooltipWidth = rect.width
    if (rect.height > 0) tooltipHeight = rect.height
  }

  // Calculate position - centered on trigger
  let left = trigger.left + (trigger.width / 2) - (tooltipWidth / 2)
  let top = trigger.top - tooltipHeight - 10

  // Position preference: top > bottom
  if (trigger.top - tooltipHeight - 10 < 10) {
    // Not enough space above, show below
    top = trigger.bottom + 10
    position.value = 'bottom'
  } else {
    position.value = 'top'
  }

  // Ensure tooltip stays within viewport bounds
  if (left < 10) {
    left = 10
  } else if (left + tooltipWidth > viewport.width - 10) {
    left = viewport.width - tooltipWidth - 10
  }

  // Final position check
  if (top < 10) {
    top = 10
  } else if (top + tooltipHeight > viewport.height - 10) {
    top = viewport.height - tooltipHeight - 10
  }

  // Apply final positioning
  tooltipStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '999999'
  }
}

// Watch for visibility changes to recalculate position
watch(() => props.visible, (newVal) => {
  if (newVal) {
    calculatePosition()
  }
})

// Watch for window resize
window.addEventListener('resize', calculatePosition)

// Get item type text
const getItemTypeText = (type: number): string => {
  switch (type) {
    case 1: return '普通道具'
    case 2: return '礼包'
    case 3: return '装备'
    default: return '未知'
  }
}

// Check if equipment has additional stats
const hasAdditionalStats = computed(() => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return false

  const equip = props.item.Equip
  return (
    equip.AddHp > 0 || equip.AddSp > 0 || equip.AddAp > 0 || equip.AddDp > 0 ||
    equip.AddStr > 0 || equip.AddDex > 0 || equip.AddInt > 0 || equip.AddSt > 0 ||
    equip.AddEsp > 0 || equip.AddSpt > 0 || equip.AddAsPer > 0 || equip.AddApPer > 0 ||
    equip.AddDpPer > 0 || equip.AddHpPer > 0 || equip.AddSpPer > 0 || equip.AddMartial > 0 ||
    equip.AddTactic > 0 || equip.AddTacticPer > 0 || equip.AddBrandish > 0 || equip.AddChakra > 0 ||
    equip.AddPrana > 0 || equip.AddDodge > 0 || equip.AddMs > 0
  )
})

// Type guard for equipment items
const isEquipmentItem = (item: ItemData): item is EquipmentItem => {
  return item.Type === 3
}

// Get class name from class ID
const getClassName = (classId: number): string => {
  return CLASS_MAP[classId] || '不限'
}

// Get skill name from skill ID
const getSkillName = (skillId: number): string => {
  return SKILL_MAP[skillId] || `技能${skillId}`
}
</script>

<style scoped>
.item-tooltip {
  position: fixed !important;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(71, 85, 105, 0.4);
  border-radius: 12px;
  padding: 0.75rem;
  min-width: 250px;
  max-width: 320px;
  z-index: 999999 !important;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  pointer-events: none;
  white-space: normal;
}

.item-tooltip::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #4c1d95, #6d28d9, #a855f7);
  border-radius: 16px 16px 0 0;
}

/* Position-specific arrow styles */
.item-tooltip.tooltip-top::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: rgba(71, 85, 105, 0.6);
}

.item-tooltip.tooltip-bottom::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-color: rgba(71, 85, 105, 0.6);
}

.item-tooltip.tooltip-left::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border: 8px solid transparent;
  border-right-color: rgba(71, 85, 105, 0.6);
}

.item-tooltip.tooltip-right::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border: 8px solid transparent;
  border-left-color: rgba(71, 85, 105, 0.6);
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid rgba(71, 85, 105, 0.4);
  padding-bottom: 0.4rem;
}

.item-name {
  font-weight: 700;
  color: rgba(203, 213, 225, 0.95);
  font-size: 0.9rem;
  text-shadow: 0 0 10px rgba(124, 58, 237, 0.3);
}

.item-type {
  background: linear-gradient(135deg, #4c1d95, #6d28d9);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(76, 29, 149, 0.3);
}

.gift-contents {
  margin-top: 0.6rem;
}

.gift-title {
  font-weight: 700;
  color: rgba(52, 211, 153, 0.9);
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.3);
}

.gift-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.gift-item-name {
  color: rgba(203, 213, 225, 0.8);
  font-size: 0.7rem;
  padding-left: 0.8rem;
  position: relative;
  line-height: 1.3;
}

.gift-item-name::before {
  content: '✨';
  position: absolute;
  left: 0;
  color: rgba(52, 211, 153, 0.8);
}

/* Equipment Stats Styling */
.equipment-stats {
  margin-top: 1rem;
}

.stats-section {
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(71, 85, 105, 0.4);
}

.stats-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.stats-title {
  font-weight: 700;
  color: rgba(203, 213, 225, 0.95);
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  text-shadow: 0 0 8px rgba(124, 58, 237, 0.3);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stats-title::before {
  content: '⚡';
  font-size: 0.7rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem 0.8rem;
  font-size: 0.75rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.4rem;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 6px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(51, 65, 85, 0.6);
  border-color: rgba(168, 85, 247, 0.3);
  transform: translateY(-1px);
}

.stat-name {
  color: rgba(148, 163, 184, 0.8);
  font-size: 0.65rem;
  font-weight: 500;
}

.stat-value {
  font-weight: 700;
  font-size: 0.7rem;
  text-shadow: 0 0 8px rgba(0,0,0,0.5);
}

.stat-value.primary {
  color: rgba(248, 113, 113, 0.9);
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.5);
}
.stat-value.secondary {
  color: rgba(52, 211, 153, 0.9);
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.5);
}
.stat-value.hp {
  color: rgba(248, 113, 113, 0.9);
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.5);
}
.stat-value.sp {
  color: rgba(96, 165, 250, 0.9);
  text-shadow: 0 0 8px rgba(96, 165, 250, 0.5);
}
.stat-value.ap {
  color: rgba(251, 146, 60, 0.9);
  text-shadow: 0 0 8px rgba(251, 146, 60, 0.5);
}
.stat-value.dp {
  color: rgba(74, 222, 128, 0.9);
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.5);
}
.stat-value.str {
  color: rgba(251, 191, 36, 0.9);
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}
.stat-value.dex {
  color: rgba(244, 114, 182, 0.9);
  text-shadow: 0 0 8px rgba(244, 114, 182, 0.5);
}
.stat-value.int {
  color: rgba(134, 239, 172, 0.9);
  text-shadow: 0 0 8px rgba(134, 239, 172, 0.5);
}
.stat-value.st {
  color: rgba(248, 113, 113, 0.9);
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.5);
}
.stat-value.esp {
  color: rgba(165, 180, 252, 0.9);
  text-shadow: 0 0 8px rgba(165, 180, 252, 0.5);
}
.stat-value.spt {
  color: rgba(251, 146, 60, 0.9);
  text-shadow: 0 0 8px rgba(251, 146, 60, 0.5);
}
.stat-value.asper {
  color: rgba(244, 114, 182, 0.9);
  text-shadow: 0 0 8px rgba(244, 114, 182, 0.5);
}
.stat-valueapper {
  color: rgba(251, 146, 60, 0.9);
  text-shadow: 0 0 8px rgba(251, 146, 60, 0.5);
}
.stat-value.dpper {
  color: rgba(74, 222, 128, 0.9);
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.5);
}
.stat-value.hpper {
  color: rgba(248, 113, 113, 0.9);
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.5);
}
.stat-value.spper {
  color: rgba(96, 165, 250, 0.9);
  text-shadow: 0 0 8px rgba(96, 165, 250, 0.5);
}
.stat-value.martial {
  color: rgba(248, 113, 113, 0.9);
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.5);
}
.stat-value.tactic {
  color: rgba(139, 92, 246, 0.9);
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
}
.stat-value.tacticper {
  color: rgba(167, 139, 250, 0.9);
  text-shadow: 0 0 8px rgba(167, 139, 250, 0.5);
}
.stat-value.brandish {
  color: rgba(250, 204, 21, 0.9);
  text-shadow: 0 0 8px rgba(250, 204, 21, 0.5);
}
.stat-value.chakra {
  color: rgba(251, 146, 60, 0.9);
  text-shadow: 0 0 8px rgba(251, 146, 60, 0.5);
}
.stat-value.prana {
  color: rgba(248, 113, 113, 0.9);
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.5);
}
.stat-value.dodge {
  color: rgba(34, 197, 94, 0.9);
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}
.stat-value.ms {
  color: rgba(168, 85, 247, 0.9);
  text-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
}

/* Requirements Styling */
.requirements-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem 0.6rem;
  font-size: 0.65rem;
}

.requirement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.4rem;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 4px;
  border: 1px solid rgba(71, 85, 105, 0.2);
  transition: all 0.3s ease;
}

.requirement-item:hover {
  background: rgba(51, 65, 85, 0.5);
  border-color: rgba(168, 85, 247, 0.2);
}

.requirement-name {
  color: rgba(148, 163, 184, 0.7);
  font-size: 0.6rem;
  font-weight: 500;
}

.requirement-value {
  color: rgba(251, 146, 60, 0.9);
  font-weight: 700;
  font-size: 0.65rem;
  text-shadow: 0 0 8px rgba(251, 146, 60, 0.4);
}

/* Skills Styling */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.5rem;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 6px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-left: 2px solid rgba(168, 85, 247, 0.6);
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(51, 65, 85, 0.6);
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
}

.skill-name {
  color: rgba(203, 213, 225, 0.9);
  font-size: 0.7rem;
  font-weight: 600;
}

.skill-level {
  color: rgba(168, 85, 247, 0.9);
  font-weight: 700;
  font-size: 0.65rem;
  text-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
  background: rgba(168, 85, 247, 0.2);
  padding: 0.15rem 0.4rem;
  border-radius: 8px;
}

</style>
