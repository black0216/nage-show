<template>
  <div
    v-if="visible && item"
    ref="tooltipRef"
    class="compound-tooltip"
    :style="tooltipStyle"
  >
    <dd class="item-title" :style="{ color: item.Type === 3 ? '#FF0' : 'inherit' }">{{ item.Name }}</dd>

    <!-- Equipment stats with new layout -->
    <div v-if="isEquipmentItem(item) && item.Equip">
      <!-- AP (+ AddAp) -->
      <dd v-if="item.Equip.Ap > 0" class="item-stat">
        AP {{ item.Equip.Ap }}<span v-if="item.Equip.AddAp > 0"> (+{{ item.Equip.AddAp }})</span>
      </dd>

      <!-- DP( + AddDp) -->
      <dd v-if="item.Equip.Dp > 0" class="item-stat">
        DP {{ item.Equip.Dp }}<span v-if="item.Equip.AddDp > 0"> (+{{ item.Equip.AddDp }})</span>
      </dd>

      <!-- NeedEsp,NeedSpt -->
      <dl v-if="getEspSptRequirements()" class="requirement-yellow">{{ getEspSptRequirements() }}</dl>

      <!-- NeedStr,NeedDex,NeedInt -->
      <dl v-if="getStrDexIntRequirements()" class="requirement-yellow">{{ getStrDexIntRequirements() }}</dl>

      <!-- NeedBrandish -->
      <dl v-if="item.Equip.NeedBrandish > 0" class="requirement-yellow">舞械技巧 {{ item.Equip.NeedBrandish }}</dl>

      <!-- NeedMartial -->
      <dl v-if="item.Equip.NeedMartial > 0" class="requirement-yellow">格斗技巧 {{ item.Equip.NeedMartial }}</dl>

      <!-- NeedChakra -->
      <dl v-if="item.Equip.NeedChakra > 0" class="requirement-yellow">超能技巧 {{ item.Equip.NeedChakra }}</dl>

      <!-- NeedPrana -->
      <dl v-if="item.Equip.NeedPrana > 0" class="requirement-yellow">枪手技巧 {{ item.Equip.NeedPrana }}</dl>

      <!-- NeedDodge -->
      <dl v-if="item.Equip.NeedDodge > 0" class="requirement-yellow">格档 {{ item.Equip.NeedDodge }}</dl>

      <!-- NeedTactic -->
      <dl v-if="item.Equip.NeedTactic > 0" class="requirement-yellow">命中技巧 {{ item.Equip.NeedTactic }}</dl>

      <!-- NeedHero -->
      <dl v-if="item.Equip.NeedHero > 0" class="requirement-yellow">{{ getHeroLevelText(item.Equip.NeedHero) }}</dl>

      <!-- ForChar -->
      <dl v-if="item.Equip.ForChar" class="requirement-yellow">{{ getGenderText(item.Equip.ForChar) }}</dl>

      <!-- AddEsp，AddSpt -->
      <dl v-if="getEspSptBonus()" class="item-stat">{{ getEspSptBonus() }}</dl>

      <!-- AddStr，AddDex -->
      <dl v-if="getStrDexBonus()" class="item-stat">{{ getStrDexBonus() }}</dl>

      <!-- AddHp，AddSp，AddSt -->
      <dl v-if="getHpSpStBonus()" class="item-stat">{{ getHpSpStBonus() }}</dl>

      <!-- AddHpPer，AddSpPer，AddErPer -->
      <dl v-if="getHpSpErPerBonus()" class="item-stat">{{ getHpSpErPerBonus() }}</dl>

      <!-- AddMs -->
      <dl v-if="item.Equip.AddMs > 0" class="item-stat">跑速 +{{ item.Equip.AddMs }}</dl>

      <!-- AddApPer -->
      <dl v-if="item.Equip.AddApPer > 0" class="item-stat">攻击增加 +{{ item.Equip.AddApPer }}%</dl>

      <!-- AddDpPer -->
      <dl v-if="item.Equip.AddDpPer > 0" class="item-stat">防御增加 +{{ item.Equip.AddDpPer }}%</dl>

      <!-- AddTacticPer -->
      <dl v-if="item.Equip.AddTacticPer > 0" class="item-stat">命中增加 +{{ item.Equip.AddTacticPer }}%</dl>

      <!-- AddAsPer -->
      <dl v-if="item.Equip.AddAsPer > 0" class="item-stat">攻击速度增加{{ item.Equip.AddAsPer }}%</dl>

      <!-- AttSpecRatio -->
      <dl v-if="item.Equip.AttSpecRatio > 0" class="item-stat">AP + {{ item.Equip.AttSpecRatio }} %</dl>

      <!-- 技能 -->
      <dl v-for="skill in getSkillsList()" :key="skill.id" class="item-stat">{{ getSkillName(skill.id) }} +{{ skill.level }}</dl>
    </div>

    <!-- Gift contents -->
    <div v-if="item.Type === 2 && item.Gifts && item.Gifts.length > 0">
      <div class="gift-list">
        <div v-for="(gift, giftIndex) in item.Gifts" :key="giftIndex" class="gift-item">
          <dl>{{ gift }}</dl>
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
    case 1: return '[HERO] 以上'
    case 2: return '[S-HERO] 以上'
    case 3: return '[X-HERO] 以上'
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

  // Fixed tooltip dimensions based on our design
  const tooltipWidth = 220 // Fixed width as per CSS
  const margin = 10 // Safety margin from viewport edges

  // Calculate initial position - show to the right of trigger
  let left = trigger.right + margin
  let top = trigger.top

  // Check if there's enough space to the right
  if (left + tooltipWidth > viewport.width - margin) {
    // Not enough space on right, try to show on left
    left = trigger.left - tooltipWidth - margin

    // If still not enough space on left, position at viewport edge
    if (left < margin) {
      left = margin
    }
  }

  // Check vertical positioning - ensure tooltip stays within viewport
  const tooltipHeight = tooltipRef.value ? tooltipRef.value.offsetHeight : 200
  if (top + tooltipHeight > viewport.height - margin) {
    // Would go below viewport, align to bottom
    top = viewport.height - tooltipHeight - margin
  }

  if (top < margin) {
    // Would go above viewport, align to top
    top = margin
  }

  // Apply final positioning
  tooltipStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '999999',
    minWidth: '220px',
    maxWidth: '220px'
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


// Get gender text from ForChar value
const getGenderText = (forChar: number): string => {
  switch (forChar) {
    case 5: return '不限性别'
    case 6: return '男性'
    case 7: return '女性'
    default: return '未知'
  }
}


// Get skills list
const getSkillsList = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip?.AddSkill) return []
  return props.item.Equip.AddSkill.map((skill: any) => ({
    id: skill.K,
    level: skill.V
  }))
}

// NeedEsp,NeedSpt
const getEspSptRequirements = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return ''

  const equip = props.item.Equip
  const stats = []

  if (equip.NeedEsp > 0) stats.push(`ESP ${equip.NeedEsp}`)
  if (equip.NeedSpt > 0) stats.push(`SPT ${equip.NeedSpt}`)

  return stats.join(' ')
}

// NeedStr,NeedDex,NeedInt
const getStrDexIntRequirements = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return ''

  const equip = props.item.Equip
  const stats = []

  if (equip.NeedStr > 0) stats.push(`STR ${equip.NeedStr}`)
  if (equip.NeedDex > 0) stats.push(`DEX ${equip.NeedDex}`)
  if (equip.NeedInt > 0) stats.push(`INT ${equip.NeedInt}`)

  return stats.join(',')
}

// AddEsp,AddSpt
const getEspSptBonus = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return ''

  const equip = props.item.Equip
  const stats = []

  if (equip.AddEsp > 0) stats.push(`ESP +${equip.AddEsp}`)
  if (equip.AddSpt > 0) stats.push(`SPT +${equip.AddSpt}`)

  return stats.join(' ')
}

// AddStr,AddDex
const getStrDexBonus = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return ''

  const equip = props.item.Equip
  const stats = []

  if (equip.AddStr > 0) stats.push(`STR +${equip.AddStr}`)
  if (equip.AddDex > 0) stats.push(`DEX +${equip.AddDex}`)

  return stats.join(' ')
}

// AddHp,AddSp,AddSt
const getHpSpStBonus = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return ''

  const equip = props.item.Equip
  const stats = []

  if (equip.AddHp > 0) stats.push(`HP +${equip.AddHp}`)
  if (equip.AddSp > 0) stats.push(`SP +${equip.AddSp}`)
  if (equip.AddSt > 0) stats.push(`ST +${equip.AddSt}`)

  return stats.join(' ')
}

// AddHpPer,AddSpPer,AddErPer
const getHpSpErPerBonus = () => {
  if (!props.item || !isEquipmentItem(props.item) || !props.item.Equip) return ''

  const equip = props.item.Equip
  const stats = []

  if (equip.AddHpPer > 0) stats.push(`HP ${equip.AddHpPer}%`)
  if (equip.AddSpPer > 0) stats.push(`SP ${equip.AddSpPer}%`)
  // if (equip.AddErPer > 0) stats.push(`ER ${equip.AddErPer}%`)

  return stats.join(' ')
}
</script>

<style scoped>
.compound-tooltip {
  position: fixed !important;
  background: #333c;
  padding: 3px 0;
  border-radius: 0;
  min-width: 220px;
  max-width: 220px;
  width: 220px;
  z-index: 999999 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #555;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-align: left;
  white-space: normal;
  margin: 0;
  display: block;
  overflow: hidden;
  contain: layout style;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Item title with special color for equipment */
.item-title {
  font-weight: bold;
  color: #FF0;
  margin: 5px;
  line-height: inherit;
}

.item-stat {
  color: #0F0;
  margin: 5px;
  line-height: inherit;
}

.item-req {
  color: #0F0;
  margin: 5px;
  line-height: inherit;
}

.requirement-yellow {
  color: #FF0;
  margin: 5px;
  line-height: inherit;
}

/* Gift contents styling */
.gift-title {
  font-weight: bold;
  color: #FF0;
  margin: 5px;
  line-height: inherit;
}

.gift-list {
  margin-top: 0;
}

.gift-item dl {
  color: #0F0;
  margin: 5px;
  line-height: inherit;
  padding-left: 10px;
  position: relative;
}

.gift-item dl::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #FF0;
}

/* dd and dl base styles */
.compound-tooltip dd,
.compound-tooltip dl {
  margin: 5px;
  line-height: inherit;
}

.compound-tooltip dl.requirement-yellow {
  color: #FF0;
}

.compound-tooltip dl.item-stat {
  color: #0F0;
}

.compound-tooltip dl.item-req {
  color: #0F0;
}

.compound-tooltip dd {
  color: #0F0;
}
</style>
