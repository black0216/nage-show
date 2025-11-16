/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

export class SkillMap {
    constructor(properties?: ISkillMap);
    /** SkillMap k */
    public k?: number | null;
    /** SkillMap v */
    public v?: number | null;

    static create(properties?: ISkillMap): SkillMap;
    static encode(message: SkillMap, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: SkillMap, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SkillMap;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SkillMap;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): SkillMap;
    static toObject(message: SkillMap, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: SkillMap): { [k: string]: any };
}

export interface ISkillMap {
    k?: number | null;
    v?: number | null;
}

export class EquipTemplate {
    constructor(properties?: IEquipTemplate);
    /** EquipTemplate part */
    public part?: number | null;
    /** EquipTemplate forChar */
    public forChar?: number | null;
    /** EquipTemplate needDex */
    public needDex?: number | null;
    /** EquipTemplate needStr */
    public needStr?: number | null;
    /** EquipTemplate needEsp */
    public needEsp?: number | null;
    /** EquipTemplate needSpt */
    public needSpt?: number | null;
    /** EquipTemplate needInt */
    public needInt?: number | null;
    /** EquipTemplate needClass */
    public needClass?: number | null;
    /** EquipTemplate needBrandish */
    public needBrandish?: number | null;
    /** EquipTemplate needMartial */
    public needMartial?: number | null;
    /** EquipTemplate needChakra */
    public needChakra?: number | null;
    /** EquipTemplate needPrana */
    public needPrana?: number | null;
    /** EquipTemplate needDodge */
    public needDodge?: number | null;
    /** EquipTemplate needTactic */
    public needTactic?: number | null;
    /** EquipTemplate dp */
    public dp?: number | null;
    /** EquipTemplate ap */
    public ap?: number | null;
    /** EquipTemplate addStr */
    public addStr?: number | null;
    /** EquipTemplate addDex */
    public addDex?: number | null;
    /** EquipTemplate addEsp */
    public addEsp?: number | null;
    /** EquipTemplate addSpt */
    public addSpt?: number | null;
    /** EquipTemplate addInt */
    public addInt?: number | null;
    /** EquipTemplate addMartial */
    public addMartial?: number | null;
    /** EquipTemplate addBrandish */
    public addBrandish?: number | null;
    /** EquipTemplate addChakra */
    public addChakra?: number | null;
    /** EquipTemplate addPrana */
    public addPrana?: number | null;
    /** EquipTemplate addDodge */
    public addDodge?: number | null;
    /** EquipTemplate addTactic */
    public addTactic?: number | null;
    /** EquipTemplate addHp */
    public addHp?: number | null;
    /** EquipTemplate addAp */
    public addAp?: number | null;
    /** EquipTemplate addDp */
    public addDp?: number | null;
    /** EquipTemplate addSp */
    public addSp?: number | null;
    /** EquipTemplate addSt */
    public addSt?: number | null;
    /** EquipTemplate addMs */
    public addMs?: number | null;
    /** EquipTemplate addTacticPer */
    public addTacticPer?: number | null;
    /** EquipTemplate addDpPer */
    public addDpPer?: number | null;
    /** EquipTemplate addApPer */
    public addApPer?: number | null;
    /** EquipTemplate needHero */
    public needHero?: number | null;
    /** EquipTemplate addAsPer */
    public addAsPer?: number | null;
    /** EquipTemplate attSpecFlag */
    public attSpecFlag?: boolean | null;
    /** EquipTemplate attSpecRatio */
    public attSpecRatio?: number | null;
    /** EquipTemplate addHpPer */
    public addHpPer?: number | null;
    /** EquipTemplate addSpPer */
    public addSpPer?: number | null;
    /** EquipTemplate addSkill */
    public addSkill?: SkillMap[] | null;

    static create(properties?: IEquipTemplate): EquipTemplate;
    static encode(message: EquipTemplate, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: EquipTemplate, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EquipTemplate;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EquipTemplate;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): EquipTemplate;
    static toObject(message: EquipTemplate, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: EquipTemplate): { [k: string]: any };
}

export interface IEquipTemplate {
    part?: number | null;
    forChar?: number | null;
    needDex?: number | null;
    needStr?: number | null;
    needEsp?: number | null;
    needSpt?: number | null;
    needInt?: number | null;
    needClass?: number | null;
    needBrandish?: number | null;
    needMartial?: number | null;
    needChakra?: number | null;
    needPrana?: number | null;
    needDodge?: number | null;
    needTactic?: number | null;
    dp?: number | null;
    ap?: number | null;
    addStr?: number | null;
    addDex?: number | null;
    addEsp?: number | null;
    addSpt?: number | null;
    addInt?: number | null;
    addMartial?: number | null;
    addBrandish?: number | null;
    addChakra?: number | null;
    addPrana?: number | null;
    addDodge?: number | null;
    addTactic?: number | null;
    addHp?: number | null;
    addAp?: number | null;
    addDp?: number | null;
    addSp?: number | null;
    addSt?: number | null;
    addMs?: number | null;
    addTacticPer?: number | null;
    addDpPer?: number | null;
    addApPer?: number | null;
    needHero?: number | null;
    addAsPer?: number | null;
    attSpecFlag?: boolean | null;
    attSpecRatio?: number | null;
    addHpPer?: number | null;
    addSpPer?: number | null;
    addSkill?: SkillMap[] | null;
}

export class ItemEntity {
    constructor(properties?: IItemEntity);
    /** ItemEntity type */
    public type?: number | null;
    /** ItemEntity name */
    public name?: string | null;
    /** ItemEntity sheet */
    public sheet?: string | null;
    /** ItemEntity x */
    public x?: number | null;
    /** ItemEntity y */
    public y?: number | null;
    /** ItemEntity gifts */
    public gifts?: string[] | null;
    /** ItemEntity equip */
    public equip?: EquipTemplate | null;

    static create(properties?: IItemEntity): ItemEntity;
    static encode(message: ItemEntity, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: ItemEntity, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ItemEntity;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ItemEntity;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): ItemEntity;
    static toObject(message: ItemEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: ItemEntity): { [k: string]: any };
}

export interface IItemEntity {
    type?: number | null;
    name?: string | null;
    sheet?: string | null;
    x?: number | null;
    y?: number | null;
    gifts?: string[] | null;
    equip?: EquipTemplate | null;
}

export class DropEntity {
    constructor(properties?: IDropEntity);
    /** DropEntity npcName */
    public npcName?: string | null;
    /** DropEntity dropItems */
    public dropItems?: ItemEntity[] | null;

    static create(properties?: IDropEntity): DropEntity;
    static encode(message: DropEntity, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: DropEntity, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DropEntity;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DropEntity;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): DropEntity;
    static toObject(message: DropEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: DropEntity): { [k: string]: any };
}

export interface IDropEntity {
    npcName?: string | null;
    dropItems?: ItemEntity[] | null;
}

export class CraftingEntity {
    constructor(properties?: ICraftingEntity);
    /** CraftingEntity item */
    public item?: ItemEntity | null;
    /** CraftingEntity itemA */
    public itemA?: ItemEntity | null;
    /** CraftingEntity itemB */
    public itemB?: ItemEntity | null;
    /** CraftingEntity itemC */
    public itemC?: ItemEntity | null;

    static create(properties?: ICraftingEntity): CraftingEntity;
    static encode(message: CraftingEntity, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: CraftingEntity, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CraftingEntity;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CraftingEntity;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): CraftingEntity;
    static toObject(message: CraftingEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: CraftingEntity): { [k: string]: any };
}

export interface ICraftingEntity {
    item?: ItemEntity | null;
    itemA?: ItemEntity | null;
    itemB?: ItemEntity | null;
    itemC?: ItemEntity | null;
}

export class DropData {
    constructor(properties?: IDropData);
    /** DropData drops */
    public drops?: DropEntity[] | null;

    static create(properties?: IDropData): DropData;
    static encode(message: DropData, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: DropData, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DropData;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DropData;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): DropData;
    static toObject(message: DropData, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: DropData): { [k: string]: any };
}

export interface IDropData {
    drops?: DropEntity[] | null;
}

export class CraftingData {
    constructor(properties?: ICraftingData);
    /** CraftingData craftingItems */
    public craftingItems?: CraftingEntity[] | null;

    static create(properties?: ICraftingData): CraftingData;
    static encode(message: CraftingData, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: CraftingData, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CraftingData;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CraftingData;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): CraftingData;
    static toObject(message: CraftingData, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: CraftingData): { [k: string]: any };
}

export interface ICraftingData {
    craftingItems?: CraftingEntity[] | null;
}

export class EquipData {
    constructor(properties?: IEquipData);
    /** EquipData equips */
    public equips?: ItemEntity[] | null;

    static create(properties?: IEquipData): EquipData;
    static encode(message: EquipData, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: EquipData, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EquipData;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EquipData;
    static verify(message: { [k: string]: any }): { [key: string]: string } | null;
    static fromObject(object: { [k: string]: any }): EquipData;
    static toObject(message: EquipData, options?: $protobuf.IConversionOptions): { [k: string]: any };
    static toJSON(message: EquipData): { [k: string]: any };
}

export interface IEquipData {
    equips?: ItemEntity[] | null;
}