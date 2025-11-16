import { EquipData, DropData, CraftingData, ItemEntity, EquipTemplate, SkillMap } from '../proto'
import type { EquipmentItem, DropItem, CraftingItem } from '../types'

// 将 protobuf 装备模板转换为前端格式
const convertEquipTemplate = (equip: EquipTemplate): any => {
  return {
    Part: equip.part,
    ForChar: equip.forChar,
    NeedDex: equip.needDex,
    NeedStr: equip.needStr,
    NeedEsp: equip.needEsp,
    NeedSpt: equip.needSpt,
    NeedInt: equip.needInt,
    NeedClass: equip.needClass,
    NeedBrandish: equip.needBrandish,
    NeedMartial: equip.needMartial,
    NeedChakra: equip.needChakra,
    NeedPrana: equip.needPrana,
    NeedDodge: equip.needDodge,
    NeedTactic: equip.needTactic,
    Dp: equip.dp,
    Ap: equip.ap,
    AddStr: equip.addStr,
    AddDex: equip.addDex,
    AddEsp: equip.addEsp,
    AddSpt: equip.addSpt,
    AddInt: equip.addInt,
    AddMartial: equip.addMartial,
    AddBrandish: equip.addBrandish,
    AddChakra: equip.addChakra,
    AddPrana: equip.addPrana,
    AddDodge: equip.addDodge,
    AddTactic: equip.addTactic,
    AddHp: equip.addHp,
    AddAp: equip.addAp,
    AddDp: equip.addDp,
    AddSp: equip.addSp,
    AddSt: equip.addSt,
    AddMs: equip.addMs,
    AddTacticPer: equip.addTacticPer,
    AddDpPer: equip.addDpPer,
    AddApPer: equip.addApPer,
    NeedHero: equip.needHero,
    AddAsPer: equip.addAsPer,
    AttSpecFlag: equip.attSpecFlag,
    AttSpecRatio: equip.attSpecRatio,
    AddHpPer: equip.addHpPer,
    AddSpPer: equip.addSpPer,
    // 注意：Proto 中是 SkillMap，JSON 中是 AddSkill
    AddSkill: equip.addSkill?.map((skill: SkillMap) => ({
      K: skill.k,
      V: skill.v
    })) || []
  }
}

// 将 protobuf ItemEntity 转换为前端格式
const convertItemEntity = (item: ItemEntity): any => {
  return {
    Name: item.name,
    Type: item.type,
    Sheet: item.sheet,
    X: item.x,
    Y: item.y,
    Gifts: item.gifts || [],
    Equip: item.equip ? convertEquipTemplate(item.equip) : undefined
  }
}

// 解析二进制数据为装备数据
export const parseEquipData = async (binaryData: ArrayBuffer): Promise<EquipmentItem[]> => {
  try {
    const message = EquipData.decode(new Uint8Array(binaryData))
    const data = EquipData.toObject(message)

    // 转换为前端数据格式
    return data.equips?.map(convertItemEntity) || []
  } catch (error) {
    console.error('Failed to parse equip data:', error)
    throw error
  }
}

// 解析二进制数据为掉落数据
export const parseDropData = async (binaryData: ArrayBuffer) => {
  try {
    const message = DropData.decode(new Uint8Array(binaryData))
    const data = DropData.toObject(message)

    // 转换为前端数据格式
    return data.drops?.map((drop: any) => ({
      NpcName: drop.npcName,
      DropItems: drop.dropItems?.map(convertItemEntity) || []
    })) || []
  } catch (error) {
    console.error('Failed to parse drop data:', error)
    throw error
  }
}

// 解析二进制数据为合成数据
export const parseCraftingData = async (binaryData: ArrayBuffer) => {
  try {
    const message = CraftingData.decode(new Uint8Array(binaryData))
    const data = CraftingData.toObject(message)

    // 转换为前端数据格式
    return data.craftingItems?.map((recipe: any) => ({
      Item: recipe.item ? convertItemEntity(recipe.item) : null,
      ItemA: recipe.itemA ? convertItemEntity(recipe.itemA) : null,
      ItemB: recipe.itemB ? convertItemEntity(recipe.itemB) : null,
      ItemC: recipe.itemC ? convertItemEntity(recipe.itemC) : null
    })) || []
  } catch (error) {
    console.error('Failed to parse crafting data:', error)
    throw error
  }
}

// 加载并解析装备数据
export const loadEquipData = async () => {
  try {
    const response = await fetch('/Equip.bin')
    if (!response.ok) {
      throw new Error(`Failed to fetch equip data: ${response.status}`)
    }

    const binaryData = await response.arrayBuffer()
    return await parseEquipData(binaryData)
  } catch (error) {
    console.error('Failed to load equip data:', error)
    throw error
  }
}

// 加载并解析掉落数据
export const loadDropData = async () => {
  try {
    const response = await fetch('/Drops.bin')
    if (!response.ok) {
      throw new Error(`Failed to fetch drop data: ${response.status}`)
    }

    const binaryData = await response.arrayBuffer()
    return await parseDropData(binaryData)
  } catch (error) {
    console.error('Failed to load drop data:', error)
    throw error
  }
}

// 加载并解析合成数据
export const loadCraftingData = async () => {
  try {
    const response = await fetch('/Crafting.bin')
    if (!response.ok) {
      throw new Error(`Failed to fetch crafting data: ${response.status}`)
    }

    const binaryData = await response.arrayBuffer()
    return await parseCraftingData(binaryData)
  } catch (error) {
    console.error('Failed to load crafting data:', error)
    throw error
  }
}