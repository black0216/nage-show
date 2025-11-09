// 统一的道具和装备类型定义文件

// 基础道具接口
export interface BaseItem {
  Name: string
  Type: number // 道具类型: 1=普通, 2=礼包, 3=装备
  Gifts?: string[]
  Sheet: string
  X: number
  Y: number
}

// 装备属性接口
export interface EquipmentAttributes {
  AddAp: number
  AddApPer: number
  AddAsPer: number
  AddBrandish: number
  AddChakra: number
  AddDex: number
  AddDodge: number
  AddDp: number
  AddDpPer: number
  AddEsp: number
  AddHp: number
  AddHpPer: number
  AddInt: number
  AddMartial: number
  AddMs: number
  AddPrana: number
  AddSkill: Array<{K: number, V: number}> // K: 技能ID, V: 技能等级
  AddSp: number
  AddSpPer: number
  AddSpt: number
  AddSt: number
  AddStr: number
  AddTactic: number
  AddTacticPer: number
  Ap: number
  AttSpecFlag: boolean
  AttSpecRatio: number
  Dp: number
  ForChar: number
  NeedBrandish: number
  NeedChakra: number
  NeedClass: number
  NeedDex: number
  NeedDodge: number
  NeedEsp: number
  NeedHero: number
  NeedInt: number
  NeedMartial: number
  NeedPrana: number
  NeedSpt: number
  NeedStr: number
  NeedTactic: number
  Part: number // 装备部位: 头部=9, 面具=1, 上衣=2, 下装=5, 鞋子=8, 右手=3, 左手=4, 特殊=6
}

// 统一的道具类型 - 可用于掉落表、合成表、装备表等
export interface UnifiedItem extends BaseItem {
  Equip?: EquipmentAttributes // 只有装备类型(Type=3)才会有Equip字段
}

// 掉落表专用类型
export interface DropItem extends BaseItem {
  // 可以添加掉落表特有的字段
}

// 合成表专用类型
export interface CraftingItem extends BaseItem {
  // 可以添加合成表特有的字段
}

// 装备表专用类型
export interface EquipmentItem extends BaseItem {
  Equip: EquipmentAttributes // 装备表必须有Equip字段
}

// 通用联合类型
export type ItemData = DropItem | CraftingItem | EquipmentItem | UnifiedItem

// 装备部位映射常量
export const PART_MAP: Record<string, string> = {
  '1': '面具',
  '2': '上衣',
  '3': '右手',
  '4': '左手',
  '5': '下装',
  '6': '特殊',
  '8': '鞋子',
  '9': '头部'
}

// 技能映射常量
export const SKILL_MAP: Record<number, string> = {
  1: '蓄力',
  2: '天罡',
  3: '疾风',
  4: '高能量波',
  5: '龙之风',
  6: '神拳百破',
  7: '麻痹',
  8: '移花接木',
  9: '力挽狂澜',
  10: '蓄力',
  11: '天罡',
  12: '突刺',
  13: '风火轮',
  14: '风刃',
  15: '神拳百破',
  16: '飓风之怒',
  17: '七星连珠',
  18: '炼狱烈火',
  19: '雷动八方',
  20: '心灵攻击',
  21: '心灵攻击二阶',
  22: '尖峰刺初始',
  23: '尖峰刺二阶',
  24: '飞火流星',
  25: '超能掌握初始',
  26: '爆破攻击初始',
  27: '爆破攻击二阶',
  28: '暂未开放',
  29: '暂未开放',
  30: '意转乾坤'
}

// 职业映射常量
export const CLASS_MAP: Record<number, string> = {
  0: '格斗',
  2: '舞械',
  6: '超能',
  7: '枪手',
  100: '不限',
  101: '格斗/舞械',
  102: '超能/枪手'
}
