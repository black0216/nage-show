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

  // First, reset to default to get accurate measurements
  tooltipStyle.value = {
    position: 'absolute',
    bottom: 'calc(100% + 10px)',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 'auto',
    right: 'auto'
  }
  position.value = 'top'

  await nextTick()

  // Get measurements after applying default position
  const trigger = props.triggerElement.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Estimate tooltip dimensions (use max-width as fallback)
  let tooltipWidth = 350 // max-width from CSS
  let tooltipHeight = 200 // estimated height

  if (tooltipRef.value) {
    const tooltipRect = tooltipRef.value.getBoundingClientRect()
    tooltipWidth = tooltipRect.width || tooltipWidth
    tooltipHeight = tooltipRect.height || tooltipHeight
  }

  // Calculate available space
  const spaceAbove = trigger.top
  const spaceBelow = viewport.height - trigger.bottom
  const spaceLeft = trigger.left
  const spaceRight = viewport.width - trigger.right

  // Determine best position with priority order: top > bottom > left > right
  if (spaceAbove >= tooltipHeight + 10) {
    // Show above (default)
    position.value = 'top'
    tooltipStyle.value = {
      position: 'absolute',
      bottom: 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 'auto',
      right: 'auto'
    }
  } else if (spaceBelow >= tooltipHeight + 10) {
    // Show below
    position.value = 'bottom'
    tooltipStyle.value = {
      position: 'absolute',
      top: 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 'auto',
      right: 'auto'
    }
  } else if (spaceLeft >= tooltipWidth + 10) {
    // Show to the left
    position.value = 'left'
    tooltipStyle.value = {
      position: 'absolute',
      right: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)',
      left: 'auto',
      bottom: 'auto'
    }
  } else if (spaceRight >= tooltipWidth + 10) {
    // Show to the right
    position.value = 'right'
    tooltipStyle.value = {
      position: 'absolute',
      left: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)',
      right: 'auto',
      bottom: 'auto'
    }
  } else {
    // Fallback: use fixed positioning to fit in viewport
    position.value = 'top'
    let left = trigger.left + (trigger.width / 2) - (tooltipWidth / 2)
    let top = trigger.top - tooltipHeight - 10

    // Ensure tooltip stays within viewport bounds with 10px margin
    if (left < 10) {
      left = 10
    } else if (left + tooltipWidth > viewport.width - 10) {
      left = viewport.width - tooltipWidth - 10
    }

    if (top < 10) {
      // If no space above, show below instead
      top = trigger.bottom + 10
    }

    tooltipStyle.value = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      transform: 'none',
      bottom: 'auto',
      right: 'auto'
    }
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
  position: absolute;
  background: linear-gradient(135deg, #333 0%, #222 100%);
  border: 2px solid #555;
  border-radius: 6px;
  padding: 10px;
  min-width: 250px;
  max-width: 350px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.7);
  pointer-events: none;
  white-space: normal;
}

/* Position-specific arrow styles */
.item-tooltip.tooltip-top::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: #555;
}

.item-tooltip.tooltip-bottom::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-color: #555;
}

.item-tooltip.tooltip-left::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border: 8px solid transparent;
  border-right-color: #555;
}

.item-tooltip.tooltip-right::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border: 8px solid transparent;
  border-left-color: #555;
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

/* Equipment Stats Styling */
.equipment-stats {
  margin-top: 8px;
}

.stats-section {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #444;
}

.stats-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.stats-title {
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 6px;
  font-size: 13px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 8px;
  font-size: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
}

.stat-name {
  color: #ccc;
  font-size: 11px;
}

.stat-value {
  font-weight: bold;
  font-size: 11px;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
}

.stat-value.primary { color: #ff6b6b; }
.stat-value.secondary { color: #4ecdc4; }
.stat-value.hp { color: #ff4757; }
.stat-value.sp { color: #3742fa; }
.stat-value.ap { color: #ff6348; }
.stat-value.dp { color: #2ed573; }
.stat-value.str { color: #ffa502; }
.stat-value.dex { color: #ff9ff3; }
.stat-value.int { color: #7bed9f; }
.stat-value.st { color: #ff7675; }
.stat-value.esp { color: #70a1ff; }
.stat-value.spt { color: #ff6348; }
.stat-value.asper { color: #ff9ff3; }
.stat-valueapper { color: #ff6348; }
.stat-value.dpper { color: #2ed573; }
.stat-value.hpper { color: #ff4757; }
.stat-value.spper { color: #3742fa; }
.stat-value.martial { color: #ff6b6b; }
.stat-value.tactic { color: #4834d4; }
.stat-value.tacticper { color: #686de0; }
.stat-value.brandish { color: #f9ca24; }
.stat-value.chakra { color: #f0932b; }
.stat-value.prana { color: #eb4d4b; }
.stat-value.dodge { color: #22a6b3; }
.stat-value.ms { color: #6c5ce7; }

/* Requirements Styling */
.requirements-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 8px;
  font-size: 11px;
}

.requirement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
}

.requirement-name {
  color: #999;
  font-size: 10px;
}

.requirement-value {
  color: #ff6348;
  font-weight: bold;
  font-size: 10px;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
}

/* Skills Styling */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  border-left: 3px solid #9b59b6;
}

.skill-name {
  color: #fff;
  font-size: 11px;
  font-weight: 500;
}

.skill-level {
  color: #9b59b6;
  font-weight: bold;
  font-size: 11px;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
}
</style>
