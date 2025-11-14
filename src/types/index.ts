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

// ========================= 用户相关类型定义 =========================

// 用户基础信息接口
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
  profile?: UserProfile
}

// 用户详细信息接口
export interface UserProfile {
  nickname?: string
  bio?: string
  favoriteClass?: number // 最喜欢的职业
  favoriteItems?: string[] // 收藏的道具ID列表
  gameStats?: {
    playTime?: number // 游戏时长（小时）
    level?: number // 角色等级
    achievements?: string[] // 成就列表
  }
}

// 登录表单数据接口
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

// 注册表单数据接口
export interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreement: boolean
}

// 修改密码表单数据接口
export interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// 编辑资料表单数据接口
export interface EditProfileFormData {
  nickname: string
  bio: string
  favoriteClass: number
}

// 认证状态接口
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// 用户收藏项接口
export interface UserFavoriteItem {
  itemId: string
  itemType: 'equipment' | 'drop' | 'crafting'
  addedAt: string
  notes?: string
}

// ========================= 钻石系统类型定义 =========================

// 钱包接口
export interface Wallet {
  diamonds: number
  lastUpdated: string
  totalEarned: number
  totalSpent: number
}

// 钻石交易记录接口
export interface DiamondTransaction {
  id: string
  type: 'earn' | 'spend' | 'daily_reward'
  amount: number
  description: string
  timestamp: string
  relatedItem?: string
}

// ========================= 抽奖系统类型定义 =========================

// 抽奖配置接口
export interface LotteryConfig {
  singleDrawCost: number        // 单抽价格（钻石）
  multiDrawCost: number         // 十连抽价格（钻石）
  guaranteedRareDraws: number   // 稀有保底次数
  guaranteedEpicDraws: number   // 史诗保底次数
  initialDiamonds: number       // 初始钻石数量
}

// 道具稀有度枚举
export enum ItemRarity {
  COMMON = 'common',     // 普通
  RARE = 'rare',         // 稀有
  EPIC = 'epic',         // 史诗
  LEGENDARY = 'legendary' // 传说
}

// 抽奖道具接口
export interface LotteryItem extends UnifiedItem {
  rarity: ItemRarity
  weight: number         // 权重（用于概率计算）
  category: string       // 分类
  description?: string   // 道具描述
}

// 抽奖结果接口
export interface LotteryResult {
  id: string
  items: LotteryItem[]   // 抽到的道具（单抽1个，十连抽10个）
  drawType: 'single' | 'multi'
  cost: number           // 消耗的钻石
  timestamp: string
  hasRareItem: boolean   // 是否包含稀有以上道具
  hasEpicItem: boolean   // 是否包含史诗以上道具
}

// 抽奖统计接口
export interface LotteryStatistics {
  totalDraws: number
  totalSpent: number
  rareCount: number
  epicCount: number
  legendaryCount: number
  currentStreak: number  // 当前未获得稀有道具的抽奖次数
  lastRareDraw: string | null
  lastEpicDraw: string | null
}

// 公告消息接口
export interface AnnouncementMessage {
  id: string
  type: 'user_win' | 'system' | 'legendary_win'
  message: string
  timestamp: string
  priority: 'low' | 'medium' | 'high'
}

// 抽奖奖池接口
export interface LotteryPool {
  common: LotteryItem[]     // 普通道具池
  rare: LotteryItem[]      // 稀有道具池
  epic: LotteryItem[]      // 史诗道具池
  legendary: LotteryItem[] // 传说道具池
}

// 抽奖历史记录接口
export interface LotteryHistory {
  id: string
  userId: string
  results: LotteryResult[]
  createdAt: string
  updatedAt: string
}

// 常量定义
export const LOTTERY_CONFIG: LotteryConfig = {
  singleDrawCost: 100,      // 单抽100钻石
  multiDrawCost: 900,       // 十连抽900钻石（优惠100钻）
  guaranteedRareDraws: 30,  // 30抽保底稀有
  guaranteedEpicDraws: 90,  // 90抽保底史诗
  initialDiamonds: 1000     // 初始1000钻石
}

// 稀有度权重配置
export const RARITY_WEIGHTS: Record<ItemRarity, number> = {
  [ItemRarity.COMMON]: 70,      // 普通 70%
  [ItemRarity.RARE]: 25,        // 稀有 25%
  [ItemRarity.EPIC]: 4.5,       // 史诗 4.5%
  [ItemRarity.LEGENDARY]: 0.5   // 传说 0.5%
}

// 稀有度显示配置
export const RARITY_DISPLAY: Record<ItemRarity, {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  [ItemRarity.COMMON]: {
    name: '普通',
    color: '#ffffff',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  [ItemRarity.RARE]: {
    name: '稀有',
    color: '#00bcd4',
    bgColor: 'rgba(0, 188, 212, 0.1)',
    borderColor: 'rgba(0, 188, 212, 0.5)'
  },
  [ItemRarity.EPIC]: {
    name: '史诗',
    color: '#9c27b0',
    bgColor: 'rgba(156, 39, 176, 0.1)',
    borderColor: 'rgba(156, 39, 176, 0.5)'
  },
  [ItemRarity.LEGENDARY]: {
    name: '传说',
    color: '#ff9800',
    bgColor: 'rgba(255, 152, 0, 0.1)',
    borderColor: 'rgba(255, 152, 0, 0.5)'
  }
}

// ==================== 马战竞猜系统 ====================

// 马匹接口
export interface Horse {
  id: string
  name: string
  level: number
  health: number        // 健康度
  stamina: number       // 耐力
  speed: number         // 速度
  power: number         // 力量
  winRate: number       // 基础胜率
  color: string         // 颜色主题
  avatar: string        // 头像标识
  description?: string  // 描述
}

// 竞猜类型
export type BetType = 'win' | 'place' | 'exacta' | 'quinella' | 'trifecta'

// 竞猜类型显示配置
export const BET_TYPE_DISPLAY: Record<BetType, {
  name: string
  description: string
  oddsMultiplier: number
}> = {
  win: {
    name: '独赢',
    description: '预测指定马匹获得第一名',
    oddsMultiplier: 1.0
  },
  place: {
    name: '位置',
    description: '预测指定马匹获得前三名',
    oddsMultiplier: 0.4
  },
  exacta: {
    name: '连赢',
    description: '预测第一、二名马匹（顺序要正确）',
    oddsMultiplier: 3.0
  },
  quinella: {
    name: '位置连赢',
    description: '预测第一、二名马匹（顺序不限）',
    oddsMultiplier: 2.5
  },
  trifecta: {
    name: '三重彩',
    description: '预测第一、二、三名马匹（顺序要正确）',
    oddsMultiplier: 8.0
  }
}

// 下注记录接口
export interface RaceBet {
  id: string
  userId: string
  roundId: string
  horseIds: string[]      // 下注的马匹ID列表
  betType: BetType        // 竞猜类型
  amount: number          // 下注金额
  odds: number            // 赔率
  timestamp: number       // 下注时间戳
  status: 'pending' | 'won' | 'lost'  // 状态
  winAmount?: number      // 中奖金额
}

// 竞猜轮次接口
export interface RaceRound {
  id: string
  startTime: number       // 开始时间
  endTime: number         // 结束时间
  countdownDuration: number // 倒计时时长（秒）
  status: 'preparing' | 'betting' | 'running' | 'finished' | 'result'
  horses: Horse[]         // 参赛马匹
  results?: Horse[]       // 比赛结果
  totalPool: number       // 总奖池
  bets: RaceBet[]         // 所有下注
  winnerBets: RaceBet[]   // 中奖的下注
}

// 竞猜配置
export interface RaceConfig {
  roundDuration: number   // 每轮时长（秒）
  bettingDuration: number // 下注时长（秒）
  runningDuration: number // 比赛时长（秒）
  resultDuration: number  // 结果展示时长（秒）
  minBetAmount: number    // 最小下注金额
  maxBetAmount: number    // 最大下注金额
  houseEdge: number       // 庄家优势（抽水比例）
  horseCount: number      // 参赛马匹数量
}

// 用户竞猜统计
export interface UserRaceStats {
  userId: string
  totalBets: number       // 总下注次数
  totalBetAmount: number  // 总下注金额
  totalWins: number       // 总获胜次数
  totalWinAmount: number  // 总获胜金额
  biggestWin: number      // 最大单次赢取
  currentStreak: number   // 当前连胜/连败
  bestStreak: number      // 最佳连胜
  favoriteHorse: string   // 最常下注的马匹
  favoriteBetType: BetType // 最常用的下注类型
  lastPlayedAt: number    // 最后游戏时间
}

// 马战竞猜历史记录
export interface RaceHistory {
  id: string
  roundId: string
  userId: string
  bet: RaceBet
  result: Horse[]
  timestamp: number
}

// 实时竞猜状态
export interface RaceLiveState {
  currentRound: RaceRound | null
  nextRound?: RaceRound
  timeRemaining: number
  isBettingOpen: boolean
  userCurrentBets: RaceBet[]
  userStats: UserRaceStats | null
}

// 马战竞猜配置常量
export const RACE_CONFIG: RaceConfig = {
  roundDuration: 600,      // 每轮10分钟
  bettingDuration: 480,    // 下注8分钟
  runningDuration: 60,     // 比赛1分钟
  resultDuration: 60,      // 结果展示1分钟
  minBetAmount: 10,        // 最小下注10钻石
  maxBetAmount: 10000,     // 最大下注10000钻石
  houseEdge: 0.05,         // 5%抽水
  horseCount: 8            // 8匹马参赛
}
