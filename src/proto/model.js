/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const SkillMap = $root.SkillMap = (() => {

    /**
     * Properties of a SkillMap.
     * @exports ISkillMap
     * @interface ISkillMap
     * @property {number|null} [k] SkillMap k
     * @property {number|null} [v] SkillMap v
     */

    /**
     * Constructs a new SkillMap.
     * @exports SkillMap
     * @classdesc Represents a SkillMap.
     * @implements ISkillMap
     * @constructor
     * @param {ISkillMap=} [properties] Properties to set
     */
    function SkillMap(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SkillMap k.
     * @member {number} k
     * @memberof SkillMap
     * @instance
     */
    SkillMap.prototype.k = 0;

    /**
     * SkillMap v.
     * @member {number} v
     * @memberof SkillMap
     * @instance
     */
    SkillMap.prototype.v = 0;

    /**
     * Creates a new SkillMap instance using the specified properties.
     * @function create
     * @memberof SkillMap
     * @static
     * @param {ISkillMap=} [properties] Properties to set
     * @returns {SkillMap} SkillMap instance
     */
    SkillMap.create = function create(properties) {
        return new SkillMap(properties);
    };

    /**
     * Encodes the specified SkillMap message. Does not implicitly {@link SkillMap.verify|verify} messages.
     * @function encode
     * @memberof SkillMap
     * @static
     * @param {ISkillMap} message SkillMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SkillMap.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.k != null && Object.hasOwnProperty.call(message, "k"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.k);
        if (message.v != null && Object.hasOwnProperty.call(message, "v"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.v);
        return writer;
    };

    /**
     * Encodes the specified SkillMap message, length delimited. Does not implicitly {@link SkillMap.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SkillMap
     * @static
     * @param {ISkillMap} message SkillMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SkillMap.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SkillMap message from the specified reader or buffer.
     * @function decode
     * @memberof SkillMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SkillMap} SkillMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SkillMap.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SkillMap();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.k = reader.int32();
                    break;
                }
            case 2: {
                    message.v = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SkillMap message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SkillMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SkillMap} SkillMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SkillMap.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SkillMap message.
     * @function verify
     * @memberof SkillMap
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SkillMap.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.k != null && message.hasOwnProperty("k"))
            if (!$util.isInteger(message.k))
                return "k: integer expected";
        if (message.v != null && message.hasOwnProperty("v"))
            if (!$util.isInteger(message.v))
                return "v: integer expected";
        return null;
    };

    /**
     * Creates a SkillMap message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SkillMap
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SkillMap} SkillMap
     */
    SkillMap.fromObject = function fromObject(object) {
        if (object instanceof $root.SkillMap)
            return object;
        let message = new $root.SkillMap();
        if (object.k != null)
            message.k = object.k | 0;
        if (object.v != null)
            message.v = object.v | 0;
        return message;
    };

    /**
     * Creates a plain object from a SkillMap message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SkillMap
     * @static
     * @param {SkillMap} message SkillMap
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SkillMap.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.k = 0;
            object.v = 0;
        }
        if (message.k != null && message.hasOwnProperty("k"))
            object.k = message.k;
        if (message.v != null && message.hasOwnProperty("v"))
            object.v = message.v;
        return object;
    };

    /**
     * Converts this SkillMap to JSON.
     * @function toJSON
     * @memberof SkillMap
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SkillMap.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SkillMap
     * @function getTypeUrl
     * @memberof SkillMap
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SkillMap.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SkillMap";
    };

    return SkillMap;
})();

export const EquipTemplate = $root.EquipTemplate = (() => {

    /**
     * Properties of an EquipTemplate.
     * @exports IEquipTemplate
     * @interface IEquipTemplate
     * @property {number|null} [part] EquipTemplate part
     * @property {number|null} [forChar] EquipTemplate forChar
     * @property {number|null} [needDex] EquipTemplate needDex
     * @property {number|null} [needStr] EquipTemplate needStr
     * @property {number|null} [needEsp] EquipTemplate needEsp
     * @property {number|null} [needSpt] EquipTemplate needSpt
     * @property {number|null} [needInt] EquipTemplate needInt
     * @property {number|null} [needClass] EquipTemplate needClass
     * @property {number|null} [needBrandish] EquipTemplate needBrandish
     * @property {number|null} [needMartial] EquipTemplate needMartial
     * @property {number|null} [needChakra] EquipTemplate needChakra
     * @property {number|null} [needPrana] EquipTemplate needPrana
     * @property {number|null} [needDodge] EquipTemplate needDodge
     * @property {number|null} [needTactic] EquipTemplate needTactic
     * @property {number|null} [dp] EquipTemplate dp
     * @property {number|null} [ap] EquipTemplate ap
     * @property {number|null} [addStr] EquipTemplate addStr
     * @property {number|null} [addDex] EquipTemplate addDex
     * @property {number|null} [addEsp] EquipTemplate addEsp
     * @property {number|null} [addSpt] EquipTemplate addSpt
     * @property {number|null} [addInt] EquipTemplate addInt
     * @property {number|null} [addMartial] EquipTemplate addMartial
     * @property {number|null} [addBrandish] EquipTemplate addBrandish
     * @property {number|null} [addChakra] EquipTemplate addChakra
     * @property {number|null} [addPrana] EquipTemplate addPrana
     * @property {number|null} [addDodge] EquipTemplate addDodge
     * @property {number|null} [addTactic] EquipTemplate addTactic
     * @property {number|null} [addHp] EquipTemplate addHp
     * @property {number|null} [addAp] EquipTemplate addAp
     * @property {number|null} [addDp] EquipTemplate addDp
     * @property {number|null} [addSp] EquipTemplate addSp
     * @property {number|null} [addSt] EquipTemplate addSt
     * @property {number|null} [addMs] EquipTemplate addMs
     * @property {number|null} [addTacticPer] EquipTemplate addTacticPer
     * @property {number|null} [addDpPer] EquipTemplate addDpPer
     * @property {number|null} [addApPer] EquipTemplate addApPer
     * @property {number|null} [needHero] EquipTemplate needHero
     * @property {number|null} [addAsPer] EquipTemplate addAsPer
     * @property {boolean|null} [attSpecFlag] EquipTemplate attSpecFlag
     * @property {number|null} [attSpecRatio] EquipTemplate attSpecRatio
     * @property {number|null} [addHpPer] EquipTemplate addHpPer
     * @property {number|null} [addSpPer] EquipTemplate addSpPer
     * @property {Array.<ISkillMap>|null} [addSkill] EquipTemplate addSkill
     */

    /**
     * Constructs a new EquipTemplate.
     * @exports EquipTemplate
     * @classdesc Represents an EquipTemplate.
     * @implements IEquipTemplate
     * @constructor
     * @param {IEquipTemplate=} [properties] Properties to set
     */
    function EquipTemplate(properties) {
        this.addSkill = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EquipTemplate part.
     * @member {number} part
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.part = 0;

    /**
     * EquipTemplate forChar.
     * @member {number} forChar
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.forChar = 0;

    /**
     * EquipTemplate needDex.
     * @member {number} needDex
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needDex = 0;

    /**
     * EquipTemplate needStr.
     * @member {number} needStr
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needStr = 0;

    /**
     * EquipTemplate needEsp.
     * @member {number} needEsp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needEsp = 0;

    /**
     * EquipTemplate needSpt.
     * @member {number} needSpt
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needSpt = 0;

    /**
     * EquipTemplate needInt.
     * @member {number} needInt
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needInt = 0;

    /**
     * EquipTemplate needClass.
     * @member {number} needClass
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needClass = 0;

    /**
     * EquipTemplate needBrandish.
     * @member {number} needBrandish
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needBrandish = 0;

    /**
     * EquipTemplate needMartial.
     * @member {number} needMartial
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needMartial = 0;

    /**
     * EquipTemplate needChakra.
     * @member {number} needChakra
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needChakra = 0;

    /**
     * EquipTemplate needPrana.
     * @member {number} needPrana
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needPrana = 0;

    /**
     * EquipTemplate needDodge.
     * @member {number} needDodge
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needDodge = 0;

    /**
     * EquipTemplate needTactic.
     * @member {number} needTactic
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needTactic = 0;

    /**
     * EquipTemplate dp.
     * @member {number} dp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.dp = 0;

    /**
     * EquipTemplate ap.
     * @member {number} ap
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.ap = 0;

    /**
     * EquipTemplate addStr.
     * @member {number} addStr
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addStr = 0;

    /**
     * EquipTemplate addDex.
     * @member {number} addDex
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addDex = 0;

    /**
     * EquipTemplate addEsp.
     * @member {number} addEsp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addEsp = 0;

    /**
     * EquipTemplate addSpt.
     * @member {number} addSpt
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addSpt = 0;

    /**
     * EquipTemplate addInt.
     * @member {number} addInt
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addInt = 0;

    /**
     * EquipTemplate addMartial.
     * @member {number} addMartial
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addMartial = 0;

    /**
     * EquipTemplate addBrandish.
     * @member {number} addBrandish
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addBrandish = 0;

    /**
     * EquipTemplate addChakra.
     * @member {number} addChakra
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addChakra = 0;

    /**
     * EquipTemplate addPrana.
     * @member {number} addPrana
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addPrana = 0;

    /**
     * EquipTemplate addDodge.
     * @member {number} addDodge
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addDodge = 0;

    /**
     * EquipTemplate addTactic.
     * @member {number} addTactic
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addTactic = 0;

    /**
     * EquipTemplate addHp.
     * @member {number} addHp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addHp = 0;

    /**
     * EquipTemplate addAp.
     * @member {number} addAp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addAp = 0;

    /**
     * EquipTemplate addDp.
     * @member {number} addDp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addDp = 0;

    /**
     * EquipTemplate addSp.
     * @member {number} addSp
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addSp = 0;

    /**
     * EquipTemplate addSt.
     * @member {number} addSt
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addSt = 0;

    /**
     * EquipTemplate addMs.
     * @member {number} addMs
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addMs = 0;

    /**
     * EquipTemplate addTacticPer.
     * @member {number} addTacticPer
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addTacticPer = 0;

    /**
     * EquipTemplate addDpPer.
     * @member {number} addDpPer
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addDpPer = 0;

    /**
     * EquipTemplate addApPer.
     * @member {number} addApPer
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addApPer = 0;

    /**
     * EquipTemplate needHero.
     * @member {number} needHero
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.needHero = 0;

    /**
     * EquipTemplate addAsPer.
     * @member {number} addAsPer
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addAsPer = 0;

    /**
     * EquipTemplate attSpecFlag.
     * @member {boolean} attSpecFlag
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.attSpecFlag = false;

    /**
     * EquipTemplate attSpecRatio.
     * @member {number} attSpecRatio
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.attSpecRatio = 0;

    /**
     * EquipTemplate addHpPer.
     * @member {number} addHpPer
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addHpPer = 0;

    /**
     * EquipTemplate addSpPer.
     * @member {number} addSpPer
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addSpPer = 0;

    /**
     * EquipTemplate addSkill.
     * @member {Array.<ISkillMap>} addSkill
     * @memberof EquipTemplate
     * @instance
     */
    EquipTemplate.prototype.addSkill = $util.emptyArray;

    /**
     * Creates a new EquipTemplate instance using the specified properties.
     * @function create
     * @memberof EquipTemplate
     * @static
     * @param {IEquipTemplate=} [properties] Properties to set
     * @returns {EquipTemplate} EquipTemplate instance
     */
    EquipTemplate.create = function create(properties) {
        return new EquipTemplate(properties);
    };

    /**
     * Encodes the specified EquipTemplate message. Does not implicitly {@link EquipTemplate.verify|verify} messages.
     * @function encode
     * @memberof EquipTemplate
     * @static
     * @param {IEquipTemplate} message EquipTemplate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EquipTemplate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.part != null && Object.hasOwnProperty.call(message, "part"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.part);
        if (message.forChar != null && Object.hasOwnProperty.call(message, "forChar"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.forChar);
        if (message.needDex != null && Object.hasOwnProperty.call(message, "needDex"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.needDex);
        if (message.needStr != null && Object.hasOwnProperty.call(message, "needStr"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.needStr);
        if (message.needEsp != null && Object.hasOwnProperty.call(message, "needEsp"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.needEsp);
        if (message.needSpt != null && Object.hasOwnProperty.call(message, "needSpt"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.needSpt);
        if (message.needInt != null && Object.hasOwnProperty.call(message, "needInt"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.needInt);
        if (message.needClass != null && Object.hasOwnProperty.call(message, "needClass"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.needClass);
        if (message.needBrandish != null && Object.hasOwnProperty.call(message, "needBrandish"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.needBrandish);
        if (message.needMartial != null && Object.hasOwnProperty.call(message, "needMartial"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.needMartial);
        if (message.needChakra != null && Object.hasOwnProperty.call(message, "needChakra"))
            writer.uint32(/* id 11, wireType 0 =*/88).int32(message.needChakra);
        if (message.needPrana != null && Object.hasOwnProperty.call(message, "needPrana"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.needPrana);
        if (message.needDodge != null && Object.hasOwnProperty.call(message, "needDodge"))
            writer.uint32(/* id 13, wireType 0 =*/104).int32(message.needDodge);
        if (message.needTactic != null && Object.hasOwnProperty.call(message, "needTactic"))
            writer.uint32(/* id 14, wireType 0 =*/112).int32(message.needTactic);
        if (message.dp != null && Object.hasOwnProperty.call(message, "dp"))
            writer.uint32(/* id 15, wireType 0 =*/120).int32(message.dp);
        if (message.ap != null && Object.hasOwnProperty.call(message, "ap"))
            writer.uint32(/* id 16, wireType 0 =*/128).int32(message.ap);
        if (message.addStr != null && Object.hasOwnProperty.call(message, "addStr"))
            writer.uint32(/* id 17, wireType 0 =*/136).int32(message.addStr);
        if (message.addDex != null && Object.hasOwnProperty.call(message, "addDex"))
            writer.uint32(/* id 18, wireType 0 =*/144).int32(message.addDex);
        if (message.addEsp != null && Object.hasOwnProperty.call(message, "addEsp"))
            writer.uint32(/* id 19, wireType 0 =*/152).int32(message.addEsp);
        if (message.addSpt != null && Object.hasOwnProperty.call(message, "addSpt"))
            writer.uint32(/* id 20, wireType 0 =*/160).int32(message.addSpt);
        if (message.addInt != null && Object.hasOwnProperty.call(message, "addInt"))
            writer.uint32(/* id 21, wireType 0 =*/168).int32(message.addInt);
        if (message.addMartial != null && Object.hasOwnProperty.call(message, "addMartial"))
            writer.uint32(/* id 22, wireType 0 =*/176).int32(message.addMartial);
        if (message.addBrandish != null && Object.hasOwnProperty.call(message, "addBrandish"))
            writer.uint32(/* id 23, wireType 0 =*/184).int32(message.addBrandish);
        if (message.addChakra != null && Object.hasOwnProperty.call(message, "addChakra"))
            writer.uint32(/* id 24, wireType 0 =*/192).int32(message.addChakra);
        if (message.addPrana != null && Object.hasOwnProperty.call(message, "addPrana"))
            writer.uint32(/* id 25, wireType 0 =*/200).int32(message.addPrana);
        if (message.addDodge != null && Object.hasOwnProperty.call(message, "addDodge"))
            writer.uint32(/* id 26, wireType 0 =*/208).int32(message.addDodge);
        if (message.addTactic != null && Object.hasOwnProperty.call(message, "addTactic"))
            writer.uint32(/* id 27, wireType 0 =*/216).int32(message.addTactic);
        if (message.addHp != null && Object.hasOwnProperty.call(message, "addHp"))
            writer.uint32(/* id 28, wireType 0 =*/224).int32(message.addHp);
        if (message.addAp != null && Object.hasOwnProperty.call(message, "addAp"))
            writer.uint32(/* id 29, wireType 0 =*/232).int32(message.addAp);
        if (message.addDp != null && Object.hasOwnProperty.call(message, "addDp"))
            writer.uint32(/* id 30, wireType 0 =*/240).int32(message.addDp);
        if (message.addSp != null && Object.hasOwnProperty.call(message, "addSp"))
            writer.uint32(/* id 31, wireType 0 =*/248).int32(message.addSp);
        if (message.addSt != null && Object.hasOwnProperty.call(message, "addSt"))
            writer.uint32(/* id 32, wireType 0 =*/256).int32(message.addSt);
        if (message.addMs != null && Object.hasOwnProperty.call(message, "addMs"))
            writer.uint32(/* id 33, wireType 0 =*/264).int32(message.addMs);
        if (message.addTacticPer != null && Object.hasOwnProperty.call(message, "addTacticPer"))
            writer.uint32(/* id 34, wireType 0 =*/272).int32(message.addTacticPer);
        if (message.addDpPer != null && Object.hasOwnProperty.call(message, "addDpPer"))
            writer.uint32(/* id 35, wireType 0 =*/280).int32(message.addDpPer);
        if (message.addApPer != null && Object.hasOwnProperty.call(message, "addApPer"))
            writer.uint32(/* id 36, wireType 0 =*/288).int32(message.addApPer);
        if (message.needHero != null && Object.hasOwnProperty.call(message, "needHero"))
            writer.uint32(/* id 37, wireType 0 =*/296).int32(message.needHero);
        if (message.addAsPer != null && Object.hasOwnProperty.call(message, "addAsPer"))
            writer.uint32(/* id 38, wireType 0 =*/304).int32(message.addAsPer);
        if (message.attSpecFlag != null && Object.hasOwnProperty.call(message, "attSpecFlag"))
            writer.uint32(/* id 39, wireType 0 =*/312).bool(message.attSpecFlag);
        if (message.attSpecRatio != null && Object.hasOwnProperty.call(message, "attSpecRatio"))
            writer.uint32(/* id 40, wireType 0 =*/320).int32(message.attSpecRatio);
        if (message.addHpPer != null && Object.hasOwnProperty.call(message, "addHpPer"))
            writer.uint32(/* id 41, wireType 0 =*/328).int32(message.addHpPer);
        if (message.addSpPer != null && Object.hasOwnProperty.call(message, "addSpPer"))
            writer.uint32(/* id 42, wireType 0 =*/336).int32(message.addSpPer);
        if (message.addSkill != null && message.addSkill.length)
            for (let i = 0; i < message.addSkill.length; ++i)
                $root.SkillMap.encode(message.addSkill[i], writer.uint32(/* id 43, wireType 2 =*/346).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified EquipTemplate message, length delimited. Does not implicitly {@link EquipTemplate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EquipTemplate
     * @static
     * @param {IEquipTemplate} message EquipTemplate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EquipTemplate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EquipTemplate message from the specified reader or buffer.
     * @function decode
     * @memberof EquipTemplate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EquipTemplate} EquipTemplate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EquipTemplate.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EquipTemplate();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.part = reader.int32();
                    break;
                }
            case 2: {
                    message.forChar = reader.int32();
                    break;
                }
            case 3: {
                    message.needDex = reader.int32();
                    break;
                }
            case 4: {
                    message.needStr = reader.int32();
                    break;
                }
            case 5: {
                    message.needEsp = reader.int32();
                    break;
                }
            case 6: {
                    message.needSpt = reader.int32();
                    break;
                }
            case 7: {
                    message.needInt = reader.int32();
                    break;
                }
            case 8: {
                    message.needClass = reader.int32();
                    break;
                }
            case 9: {
                    message.needBrandish = reader.int32();
                    break;
                }
            case 10: {
                    message.needMartial = reader.int32();
                    break;
                }
            case 11: {
                    message.needChakra = reader.int32();
                    break;
                }
            case 12: {
                    message.needPrana = reader.int32();
                    break;
                }
            case 13: {
                    message.needDodge = reader.int32();
                    break;
                }
            case 14: {
                    message.needTactic = reader.int32();
                    break;
                }
            case 15: {
                    message.dp = reader.int32();
                    break;
                }
            case 16: {
                    message.ap = reader.int32();
                    break;
                }
            case 17: {
                    message.addStr = reader.int32();
                    break;
                }
            case 18: {
                    message.addDex = reader.int32();
                    break;
                }
            case 19: {
                    message.addEsp = reader.int32();
                    break;
                }
            case 20: {
                    message.addSpt = reader.int32();
                    break;
                }
            case 21: {
                    message.addInt = reader.int32();
                    break;
                }
            case 22: {
                    message.addMartial = reader.int32();
                    break;
                }
            case 23: {
                    message.addBrandish = reader.int32();
                    break;
                }
            case 24: {
                    message.addChakra = reader.int32();
                    break;
                }
            case 25: {
                    message.addPrana = reader.int32();
                    break;
                }
            case 26: {
                    message.addDodge = reader.int32();
                    break;
                }
            case 27: {
                    message.addTactic = reader.int32();
                    break;
                }
            case 28: {
                    message.addHp = reader.int32();
                    break;
                }
            case 29: {
                    message.addAp = reader.int32();
                    break;
                }
            case 30: {
                    message.addDp = reader.int32();
                    break;
                }
            case 31: {
                    message.addSp = reader.int32();
                    break;
                }
            case 32: {
                    message.addSt = reader.int32();
                    break;
                }
            case 33: {
                    message.addMs = reader.int32();
                    break;
                }
            case 34: {
                    message.addTacticPer = reader.int32();
                    break;
                }
            case 35: {
                    message.addDpPer = reader.int32();
                    break;
                }
            case 36: {
                    message.addApPer = reader.int32();
                    break;
                }
            case 37: {
                    message.needHero = reader.int32();
                    break;
                }
            case 38: {
                    message.addAsPer = reader.int32();
                    break;
                }
            case 39: {
                    message.attSpecFlag = reader.bool();
                    break;
                }
            case 40: {
                    message.attSpecRatio = reader.int32();
                    break;
                }
            case 41: {
                    message.addHpPer = reader.int32();
                    break;
                }
            case 42: {
                    message.addSpPer = reader.int32();
                    break;
                }
            case 43: {
                    if (!(message.addSkill && message.addSkill.length))
                        message.addSkill = [];
                    message.addSkill.push($root.SkillMap.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EquipTemplate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EquipTemplate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EquipTemplate} EquipTemplate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EquipTemplate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EquipTemplate message.
     * @function verify
     * @memberof EquipTemplate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EquipTemplate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.part != null && message.hasOwnProperty("part"))
            if (!$util.isInteger(message.part))
                return "part: integer expected";
        if (message.forChar != null && message.hasOwnProperty("forChar"))
            if (!$util.isInteger(message.forChar))
                return "forChar: integer expected";
        if (message.needDex != null && message.hasOwnProperty("needDex"))
            if (!$util.isInteger(message.needDex))
                return "needDex: integer expected";
        if (message.needStr != null && message.hasOwnProperty("needStr"))
            if (!$util.isInteger(message.needStr))
                return "needStr: integer expected";
        if (message.needEsp != null && message.hasOwnProperty("needEsp"))
            if (!$util.isInteger(message.needEsp))
                return "needEsp: integer expected";
        if (message.needSpt != null && message.hasOwnProperty("needSpt"))
            if (!$util.isInteger(message.needSpt))
                return "needSpt: integer expected";
        if (message.needInt != null && message.hasOwnProperty("needInt"))
            if (!$util.isInteger(message.needInt))
                return "needInt: integer expected";
        if (message.needClass != null && message.hasOwnProperty("needClass"))
            if (!$util.isInteger(message.needClass))
                return "needClass: integer expected";
        if (message.needBrandish != null && message.hasOwnProperty("needBrandish"))
            if (!$util.isInteger(message.needBrandish))
                return "needBrandish: integer expected";
        if (message.needMartial != null && message.hasOwnProperty("needMartial"))
            if (!$util.isInteger(message.needMartial))
                return "needMartial: integer expected";
        if (message.needChakra != null && message.hasOwnProperty("needChakra"))
            if (!$util.isInteger(message.needChakra))
                return "needChakra: integer expected";
        if (message.needPrana != null && message.hasOwnProperty("needPrana"))
            if (!$util.isInteger(message.needPrana))
                return "needPrana: integer expected";
        if (message.needDodge != null && message.hasOwnProperty("needDodge"))
            if (!$util.isInteger(message.needDodge))
                return "needDodge: integer expected";
        if (message.needTactic != null && message.hasOwnProperty("needTactic"))
            if (!$util.isInteger(message.needTactic))
                return "needTactic: integer expected";
        if (message.dp != null && message.hasOwnProperty("dp"))
            if (!$util.isInteger(message.dp))
                return "dp: integer expected";
        if (message.ap != null && message.hasOwnProperty("ap"))
            if (!$util.isInteger(message.ap))
                return "ap: integer expected";
        if (message.addStr != null && message.hasOwnProperty("addStr"))
            if (!$util.isInteger(message.addStr))
                return "addStr: integer expected";
        if (message.addDex != null && message.hasOwnProperty("addDex"))
            if (!$util.isInteger(message.addDex))
                return "addDex: integer expected";
        if (message.addEsp != null && message.hasOwnProperty("addEsp"))
            if (!$util.isInteger(message.addEsp))
                return "addEsp: integer expected";
        if (message.addSpt != null && message.hasOwnProperty("addSpt"))
            if (!$util.isInteger(message.addSpt))
                return "addSpt: integer expected";
        if (message.addInt != null && message.hasOwnProperty("addInt"))
            if (!$util.isInteger(message.addInt))
                return "addInt: integer expected";
        if (message.addMartial != null && message.hasOwnProperty("addMartial"))
            if (!$util.isInteger(message.addMartial))
                return "addMartial: integer expected";
        if (message.addBrandish != null && message.hasOwnProperty("addBrandish"))
            if (!$util.isInteger(message.addBrandish))
                return "addBrandish: integer expected";
        if (message.addChakra != null && message.hasOwnProperty("addChakra"))
            if (!$util.isInteger(message.addChakra))
                return "addChakra: integer expected";
        if (message.addPrana != null && message.hasOwnProperty("addPrana"))
            if (!$util.isInteger(message.addPrana))
                return "addPrana: integer expected";
        if (message.addDodge != null && message.hasOwnProperty("addDodge"))
            if (!$util.isInteger(message.addDodge))
                return "addDodge: integer expected";
        if (message.addTactic != null && message.hasOwnProperty("addTactic"))
            if (!$util.isInteger(message.addTactic))
                return "addTactic: integer expected";
        if (message.addHp != null && message.hasOwnProperty("addHp"))
            if (!$util.isInteger(message.addHp))
                return "addHp: integer expected";
        if (message.addAp != null && message.hasOwnProperty("addAp"))
            if (!$util.isInteger(message.addAp))
                return "addAp: integer expected";
        if (message.addDp != null && message.hasOwnProperty("addDp"))
            if (!$util.isInteger(message.addDp))
                return "addDp: integer expected";
        if (message.addSp != null && message.hasOwnProperty("addSp"))
            if (!$util.isInteger(message.addSp))
                return "addSp: integer expected";
        if (message.addSt != null && message.hasOwnProperty("addSt"))
            if (!$util.isInteger(message.addSt))
                return "addSt: integer expected";
        if (message.addMs != null && message.hasOwnProperty("addMs"))
            if (!$util.isInteger(message.addMs))
                return "addMs: integer expected";
        if (message.addTacticPer != null && message.hasOwnProperty("addTacticPer"))
            if (!$util.isInteger(message.addTacticPer))
                return "addTacticPer: integer expected";
        if (message.addDpPer != null && message.hasOwnProperty("addDpPer"))
            if (!$util.isInteger(message.addDpPer))
                return "addDpPer: integer expected";
        if (message.addApPer != null && message.hasOwnProperty("addApPer"))
            if (!$util.isInteger(message.addApPer))
                return "addApPer: integer expected";
        if (message.needHero != null && message.hasOwnProperty("needHero"))
            if (!$util.isInteger(message.needHero))
                return "needHero: integer expected";
        if (message.addAsPer != null && message.hasOwnProperty("addAsPer"))
            if (!$util.isInteger(message.addAsPer))
                return "addAsPer: integer expected";
        if (message.attSpecFlag != null && message.hasOwnProperty("attSpecFlag"))
            if (typeof message.attSpecFlag !== "boolean")
                return "attSpecFlag: boolean expected";
        if (message.attSpecRatio != null && message.hasOwnProperty("attSpecRatio"))
            if (!$util.isInteger(message.attSpecRatio))
                return "attSpecRatio: integer expected";
        if (message.addHpPer != null && message.hasOwnProperty("addHpPer"))
            if (!$util.isInteger(message.addHpPer))
                return "addHpPer: integer expected";
        if (message.addSpPer != null && message.hasOwnProperty("addSpPer"))
            if (!$util.isInteger(message.addSpPer))
                return "addSpPer: integer expected";
        if (message.addSkill != null && message.hasOwnProperty("addSkill")) {
            if (!Array.isArray(message.addSkill))
                return "addSkill: array expected";
            for (let i = 0; i < message.addSkill.length; ++i) {
                let error = $root.SkillMap.verify(message.addSkill[i]);
                if (error)
                    return "addSkill." + error;
            }
        }
        return null;
    };

    /**
     * Creates an EquipTemplate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EquipTemplate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EquipTemplate} EquipTemplate
     */
    EquipTemplate.fromObject = function fromObject(object) {
        if (object instanceof $root.EquipTemplate)
            return object;
        let message = new $root.EquipTemplate();
        if (object.part != null)
            message.part = object.part | 0;
        if (object.forChar != null)
            message.forChar = object.forChar | 0;
        if (object.needDex != null)
            message.needDex = object.needDex | 0;
        if (object.needStr != null)
            message.needStr = object.needStr | 0;
        if (object.needEsp != null)
            message.needEsp = object.needEsp | 0;
        if (object.needSpt != null)
            message.needSpt = object.needSpt | 0;
        if (object.needInt != null)
            message.needInt = object.needInt | 0;
        if (object.needClass != null)
            message.needClass = object.needClass | 0;
        if (object.needBrandish != null)
            message.needBrandish = object.needBrandish | 0;
        if (object.needMartial != null)
            message.needMartial = object.needMartial | 0;
        if (object.needChakra != null)
            message.needChakra = object.needChakra | 0;
        if (object.needPrana != null)
            message.needPrana = object.needPrana | 0;
        if (object.needDodge != null)
            message.needDodge = object.needDodge | 0;
        if (object.needTactic != null)
            message.needTactic = object.needTactic | 0;
        if (object.dp != null)
            message.dp = object.dp | 0;
        if (object.ap != null)
            message.ap = object.ap | 0;
        if (object.addStr != null)
            message.addStr = object.addStr | 0;
        if (object.addDex != null)
            message.addDex = object.addDex | 0;
        if (object.addEsp != null)
            message.addEsp = object.addEsp | 0;
        if (object.addSpt != null)
            message.addSpt = object.addSpt | 0;
        if (object.addInt != null)
            message.addInt = object.addInt | 0;
        if (object.addMartial != null)
            message.addMartial = object.addMartial | 0;
        if (object.addBrandish != null)
            message.addBrandish = object.addBrandish | 0;
        if (object.addChakra != null)
            message.addChakra = object.addChakra | 0;
        if (object.addPrana != null)
            message.addPrana = object.addPrana | 0;
        if (object.addDodge != null)
            message.addDodge = object.addDodge | 0;
        if (object.addTactic != null)
            message.addTactic = object.addTactic | 0;
        if (object.addHp != null)
            message.addHp = object.addHp | 0;
        if (object.addAp != null)
            message.addAp = object.addAp | 0;
        if (object.addDp != null)
            message.addDp = object.addDp | 0;
        if (object.addSp != null)
            message.addSp = object.addSp | 0;
        if (object.addSt != null)
            message.addSt = object.addSt | 0;
        if (object.addMs != null)
            message.addMs = object.addMs | 0;
        if (object.addTacticPer != null)
            message.addTacticPer = object.addTacticPer | 0;
        if (object.addDpPer != null)
            message.addDpPer = object.addDpPer | 0;
        if (object.addApPer != null)
            message.addApPer = object.addApPer | 0;
        if (object.needHero != null)
            message.needHero = object.needHero | 0;
        if (object.addAsPer != null)
            message.addAsPer = object.addAsPer | 0;
        if (object.attSpecFlag != null)
            message.attSpecFlag = Boolean(object.attSpecFlag);
        if (object.attSpecRatio != null)
            message.attSpecRatio = object.attSpecRatio | 0;
        if (object.addHpPer != null)
            message.addHpPer = object.addHpPer | 0;
        if (object.addSpPer != null)
            message.addSpPer = object.addSpPer | 0;
        if (object.addSkill) {
            if (!Array.isArray(object.addSkill))
                throw TypeError(".EquipTemplate.addSkill: array expected");
            message.addSkill = [];
            for (let i = 0; i < object.addSkill.length; ++i) {
                if (typeof object.addSkill[i] !== "object")
                    throw TypeError(".EquipTemplate.addSkill: object expected");
                message.addSkill[i] = $root.SkillMap.fromObject(object.addSkill[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an EquipTemplate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EquipTemplate
     * @static
     * @param {EquipTemplate} message EquipTemplate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EquipTemplate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.addSkill = [];
        if (options.defaults) {
            object.part = 0;
            object.forChar = 0;
            object.needDex = 0;
            object.needStr = 0;
            object.needEsp = 0;
            object.needSpt = 0;
            object.needInt = 0;
            object.needClass = 0;
            object.needBrandish = 0;
            object.needMartial = 0;
            object.needChakra = 0;
            object.needPrana = 0;
            object.needDodge = 0;
            object.needTactic = 0;
            object.dp = 0;
            object.ap = 0;
            object.addStr = 0;
            object.addDex = 0;
            object.addEsp = 0;
            object.addSpt = 0;
            object.addInt = 0;
            object.addMartial = 0;
            object.addBrandish = 0;
            object.addChakra = 0;
            object.addPrana = 0;
            object.addDodge = 0;
            object.addTactic = 0;
            object.addHp = 0;
            object.addAp = 0;
            object.addDp = 0;
            object.addSp = 0;
            object.addSt = 0;
            object.addMs = 0;
            object.addTacticPer = 0;
            object.addDpPer = 0;
            object.addApPer = 0;
            object.needHero = 0;
            object.addAsPer = 0;
            object.attSpecFlag = false;
            object.attSpecRatio = 0;
            object.addHpPer = 0;
            object.addSpPer = 0;
        }
        if (message.part != null && message.hasOwnProperty("part"))
            object.part = message.part;
        if (message.forChar != null && message.hasOwnProperty("forChar"))
            object.forChar = message.forChar;
        if (message.needDex != null && message.hasOwnProperty("needDex"))
            object.needDex = message.needDex;
        if (message.needStr != null && message.hasOwnProperty("needStr"))
            object.needStr = message.needStr;
        if (message.needEsp != null && message.hasOwnProperty("needEsp"))
            object.needEsp = message.needEsp;
        if (message.needSpt != null && message.hasOwnProperty("needSpt"))
            object.needSpt = message.needSpt;
        if (message.needInt != null && message.hasOwnProperty("needInt"))
            object.needInt = message.needInt;
        if (message.needClass != null && message.hasOwnProperty("needClass"))
            object.needClass = message.needClass;
        if (message.needBrandish != null && message.hasOwnProperty("needBrandish"))
            object.needBrandish = message.needBrandish;
        if (message.needMartial != null && message.hasOwnProperty("needMartial"))
            object.needMartial = message.needMartial;
        if (message.needChakra != null && message.hasOwnProperty("needChakra"))
            object.needChakra = message.needChakra;
        if (message.needPrana != null && message.hasOwnProperty("needPrana"))
            object.needPrana = message.needPrana;
        if (message.needDodge != null && message.hasOwnProperty("needDodge"))
            object.needDodge = message.needDodge;
        if (message.needTactic != null && message.hasOwnProperty("needTactic"))
            object.needTactic = message.needTactic;
        if (message.dp != null && message.hasOwnProperty("dp"))
            object.dp = message.dp;
        if (message.ap != null && message.hasOwnProperty("ap"))
            object.ap = message.ap;
        if (message.addStr != null && message.hasOwnProperty("addStr"))
            object.addStr = message.addStr;
        if (message.addDex != null && message.hasOwnProperty("addDex"))
            object.addDex = message.addDex;
        if (message.addEsp != null && message.hasOwnProperty("addEsp"))
            object.addEsp = message.addEsp;
        if (message.addSpt != null && message.hasOwnProperty("addSpt"))
            object.addSpt = message.addSpt;
        if (message.addInt != null && message.hasOwnProperty("addInt"))
            object.addInt = message.addInt;
        if (message.addMartial != null && message.hasOwnProperty("addMartial"))
            object.addMartial = message.addMartial;
        if (message.addBrandish != null && message.hasOwnProperty("addBrandish"))
            object.addBrandish = message.addBrandish;
        if (message.addChakra != null && message.hasOwnProperty("addChakra"))
            object.addChakra = message.addChakra;
        if (message.addPrana != null && message.hasOwnProperty("addPrana"))
            object.addPrana = message.addPrana;
        if (message.addDodge != null && message.hasOwnProperty("addDodge"))
            object.addDodge = message.addDodge;
        if (message.addTactic != null && message.hasOwnProperty("addTactic"))
            object.addTactic = message.addTactic;
        if (message.addHp != null && message.hasOwnProperty("addHp"))
            object.addHp = message.addHp;
        if (message.addAp != null && message.hasOwnProperty("addAp"))
            object.addAp = message.addAp;
        if (message.addDp != null && message.hasOwnProperty("addDp"))
            object.addDp = message.addDp;
        if (message.addSp != null && message.hasOwnProperty("addSp"))
            object.addSp = message.addSp;
        if (message.addSt != null && message.hasOwnProperty("addSt"))
            object.addSt = message.addSt;
        if (message.addMs != null && message.hasOwnProperty("addMs"))
            object.addMs = message.addMs;
        if (message.addTacticPer != null && message.hasOwnProperty("addTacticPer"))
            object.addTacticPer = message.addTacticPer;
        if (message.addDpPer != null && message.hasOwnProperty("addDpPer"))
            object.addDpPer = message.addDpPer;
        if (message.addApPer != null && message.hasOwnProperty("addApPer"))
            object.addApPer = message.addApPer;
        if (message.needHero != null && message.hasOwnProperty("needHero"))
            object.needHero = message.needHero;
        if (message.addAsPer != null && message.hasOwnProperty("addAsPer"))
            object.addAsPer = message.addAsPer;
        if (message.attSpecFlag != null && message.hasOwnProperty("attSpecFlag"))
            object.attSpecFlag = message.attSpecFlag;
        if (message.attSpecRatio != null && message.hasOwnProperty("attSpecRatio"))
            object.attSpecRatio = message.attSpecRatio;
        if (message.addHpPer != null && message.hasOwnProperty("addHpPer"))
            object.addHpPer = message.addHpPer;
        if (message.addSpPer != null && message.hasOwnProperty("addSpPer"))
            object.addSpPer = message.addSpPer;
        if (message.addSkill && message.addSkill.length) {
            object.addSkill = [];
            for (let j = 0; j < message.addSkill.length; ++j)
                object.addSkill[j] = $root.SkillMap.toObject(message.addSkill[j], options);
        }
        return object;
    };

    /**
     * Converts this EquipTemplate to JSON.
     * @function toJSON
     * @memberof EquipTemplate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EquipTemplate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for EquipTemplate
     * @function getTypeUrl
     * @memberof EquipTemplate
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    EquipTemplate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/EquipTemplate";
    };

    return EquipTemplate;
})();

export const ItemEntity = $root.ItemEntity = (() => {

    /**
     * Properties of an ItemEntity.
     * @exports IItemEntity
     * @interface IItemEntity
     * @property {number|null} [type] ItemEntity type
     * @property {string|null} [name] ItemEntity name
     * @property {string|null} [sheet] ItemEntity sheet
     * @property {number|null} [x] ItemEntity x
     * @property {number|null} [y] ItemEntity y
     * @property {Array.<string>|null} [gifts] ItemEntity gifts
     * @property {IEquipTemplate|null} [equip] ItemEntity equip
     */

    /**
     * Constructs a new ItemEntity.
     * @exports ItemEntity
     * @classdesc Represents an ItemEntity.
     * @implements IItemEntity
     * @constructor
     * @param {IItemEntity=} [properties] Properties to set
     */
    function ItemEntity(properties) {
        this.gifts = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ItemEntity type.
     * @member {number} type
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.type = 0;

    /**
     * ItemEntity name.
     * @member {string} name
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.name = "";

    /**
     * ItemEntity sheet.
     * @member {string} sheet
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.sheet = "";

    /**
     * ItemEntity x.
     * @member {number} x
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.x = 0;

    /**
     * ItemEntity y.
     * @member {number} y
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.y = 0;

    /**
     * ItemEntity gifts.
     * @member {Array.<string>} gifts
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.gifts = $util.emptyArray;

    /**
     * ItemEntity equip.
     * @member {IEquipTemplate|null|undefined} equip
     * @memberof ItemEntity
     * @instance
     */
    ItemEntity.prototype.equip = null;

    /**
     * Creates a new ItemEntity instance using the specified properties.
     * @function create
     * @memberof ItemEntity
     * @static
     * @param {IItemEntity=} [properties] Properties to set
     * @returns {ItemEntity} ItemEntity instance
     */
    ItemEntity.create = function create(properties) {
        return new ItemEntity(properties);
    };

    /**
     * Encodes the specified ItemEntity message. Does not implicitly {@link ItemEntity.verify|verify} messages.
     * @function encode
     * @memberof ItemEntity
     * @static
     * @param {IItemEntity} message ItemEntity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ItemEntity.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.sheet != null && Object.hasOwnProperty.call(message, "sheet"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.sheet);
        if (message.x != null && Object.hasOwnProperty.call(message, "x"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.x);
        if (message.y != null && Object.hasOwnProperty.call(message, "y"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.y);
        if (message.gifts != null && message.gifts.length)
            for (let i = 0; i < message.gifts.length; ++i)
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.gifts[i]);
        if (message.equip != null && Object.hasOwnProperty.call(message, "equip"))
            $root.EquipTemplate.encode(message.equip, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ItemEntity message, length delimited. Does not implicitly {@link ItemEntity.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ItemEntity
     * @static
     * @param {IItemEntity} message ItemEntity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ItemEntity.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ItemEntity message from the specified reader or buffer.
     * @function decode
     * @memberof ItemEntity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ItemEntity} ItemEntity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ItemEntity.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ItemEntity();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.type = reader.int32();
                    break;
                }
            case 2: {
                    message.name = reader.string();
                    break;
                }
            case 3: {
                    message.sheet = reader.string();
                    break;
                }
            case 4: {
                    message.x = reader.int32();
                    break;
                }
            case 5: {
                    message.y = reader.int32();
                    break;
                }
            case 6: {
                    if (!(message.gifts && message.gifts.length))
                        message.gifts = [];
                    message.gifts.push(reader.string());
                    break;
                }
            case 7: {
                    message.equip = $root.EquipTemplate.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ItemEntity message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ItemEntity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ItemEntity} ItemEntity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ItemEntity.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ItemEntity message.
     * @function verify
     * @memberof ItemEntity
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ItemEntity.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.sheet != null && message.hasOwnProperty("sheet"))
            if (!$util.isString(message.sheet))
                return "sheet: string expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (!$util.isInteger(message.x))
                return "x: integer expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (!$util.isInteger(message.y))
                return "y: integer expected";
        if (message.gifts != null && message.hasOwnProperty("gifts")) {
            if (!Array.isArray(message.gifts))
                return "gifts: array expected";
            for (let i = 0; i < message.gifts.length; ++i)
                if (!$util.isString(message.gifts[i]))
                    return "gifts: string[] expected";
        }
        if (message.equip != null && message.hasOwnProperty("equip")) {
            let error = $root.EquipTemplate.verify(message.equip);
            if (error)
                return "equip." + error;
        }
        return null;
    };

    /**
     * Creates an ItemEntity message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ItemEntity
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ItemEntity} ItemEntity
     */
    ItemEntity.fromObject = function fromObject(object) {
        if (object instanceof $root.ItemEntity)
            return object;
        let message = new $root.ItemEntity();
        if (object.type != null)
            message.type = object.type | 0;
        if (object.name != null)
            message.name = String(object.name);
        if (object.sheet != null)
            message.sheet = String(object.sheet);
        if (object.x != null)
            message.x = object.x | 0;
        if (object.y != null)
            message.y = object.y | 0;
        if (object.gifts) {
            if (!Array.isArray(object.gifts))
                throw TypeError(".ItemEntity.gifts: array expected");
            message.gifts = [];
            for (let i = 0; i < object.gifts.length; ++i)
                message.gifts[i] = String(object.gifts[i]);
        }
        if (object.equip != null) {
            if (typeof object.equip !== "object")
                throw TypeError(".ItemEntity.equip: object expected");
            message.equip = $root.EquipTemplate.fromObject(object.equip);
        }
        return message;
    };

    /**
     * Creates a plain object from an ItemEntity message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ItemEntity
     * @static
     * @param {ItemEntity} message ItemEntity
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ItemEntity.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.gifts = [];
        if (options.defaults) {
            object.type = 0;
            object.name = "";
            object.sheet = "";
            object.x = 0;
            object.y = 0;
            object.equip = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.sheet != null && message.hasOwnProperty("sheet"))
            object.sheet = message.sheet;
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        if (message.gifts && message.gifts.length) {
            object.gifts = [];
            for (let j = 0; j < message.gifts.length; ++j)
                object.gifts[j] = message.gifts[j];
        }
        if (message.equip != null && message.hasOwnProperty("equip"))
            object.equip = $root.EquipTemplate.toObject(message.equip, options);
        return object;
    };

    /**
     * Converts this ItemEntity to JSON.
     * @function toJSON
     * @memberof ItemEntity
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ItemEntity.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ItemEntity
     * @function getTypeUrl
     * @memberof ItemEntity
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ItemEntity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ItemEntity";
    };

    return ItemEntity;
})();

export const DropEntity = $root.DropEntity = (() => {

    /**
     * Properties of a DropEntity.
     * @exports IDropEntity
     * @interface IDropEntity
     * @property {string|null} [npcName] DropEntity npcName
     * @property {Array.<IItemEntity>|null} [dropItems] DropEntity dropItems
     */

    /**
     * Constructs a new DropEntity.
     * @exports DropEntity
     * @classdesc Represents a DropEntity.
     * @implements IDropEntity
     * @constructor
     * @param {IDropEntity=} [properties] Properties to set
     */
    function DropEntity(properties) {
        this.dropItems = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DropEntity npcName.
     * @member {string} npcName
     * @memberof DropEntity
     * @instance
     */
    DropEntity.prototype.npcName = "";

    /**
     * DropEntity dropItems.
     * @member {Array.<IItemEntity>} dropItems
     * @memberof DropEntity
     * @instance
     */
    DropEntity.prototype.dropItems = $util.emptyArray;

    /**
     * Creates a new DropEntity instance using the specified properties.
     * @function create
     * @memberof DropEntity
     * @static
     * @param {IDropEntity=} [properties] Properties to set
     * @returns {DropEntity} DropEntity instance
     */
    DropEntity.create = function create(properties) {
        return new DropEntity(properties);
    };

    /**
     * Encodes the specified DropEntity message. Does not implicitly {@link DropEntity.verify|verify} messages.
     * @function encode
     * @memberof DropEntity
     * @static
     * @param {IDropEntity} message DropEntity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DropEntity.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.npcName != null && Object.hasOwnProperty.call(message, "npcName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.npcName);
        if (message.dropItems != null && message.dropItems.length)
            for (let i = 0; i < message.dropItems.length; ++i)
                $root.ItemEntity.encode(message.dropItems[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DropEntity message, length delimited. Does not implicitly {@link DropEntity.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DropEntity
     * @static
     * @param {IDropEntity} message DropEntity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DropEntity.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DropEntity message from the specified reader or buffer.
     * @function decode
     * @memberof DropEntity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DropEntity} DropEntity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DropEntity.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DropEntity();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.npcName = reader.string();
                    break;
                }
            case 2: {
                    if (!(message.dropItems && message.dropItems.length))
                        message.dropItems = [];
                    message.dropItems.push($root.ItemEntity.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DropEntity message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DropEntity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DropEntity} DropEntity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DropEntity.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DropEntity message.
     * @function verify
     * @memberof DropEntity
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DropEntity.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.npcName != null && message.hasOwnProperty("npcName"))
            if (!$util.isString(message.npcName))
                return "npcName: string expected";
        if (message.dropItems != null && message.hasOwnProperty("dropItems")) {
            if (!Array.isArray(message.dropItems))
                return "dropItems: array expected";
            for (let i = 0; i < message.dropItems.length; ++i) {
                let error = $root.ItemEntity.verify(message.dropItems[i]);
                if (error)
                    return "dropItems." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DropEntity message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DropEntity
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DropEntity} DropEntity
     */
    DropEntity.fromObject = function fromObject(object) {
        if (object instanceof $root.DropEntity)
            return object;
        let message = new $root.DropEntity();
        if (object.npcName != null)
            message.npcName = String(object.npcName);
        if (object.dropItems) {
            if (!Array.isArray(object.dropItems))
                throw TypeError(".DropEntity.dropItems: array expected");
            message.dropItems = [];
            for (let i = 0; i < object.dropItems.length; ++i) {
                if (typeof object.dropItems[i] !== "object")
                    throw TypeError(".DropEntity.dropItems: object expected");
                message.dropItems[i] = $root.ItemEntity.fromObject(object.dropItems[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a DropEntity message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DropEntity
     * @static
     * @param {DropEntity} message DropEntity
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DropEntity.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.dropItems = [];
        if (options.defaults)
            object.npcName = "";
        if (message.npcName != null && message.hasOwnProperty("npcName"))
            object.npcName = message.npcName;
        if (message.dropItems && message.dropItems.length) {
            object.dropItems = [];
            for (let j = 0; j < message.dropItems.length; ++j)
                object.dropItems[j] = $root.ItemEntity.toObject(message.dropItems[j], options);
        }
        return object;
    };

    /**
     * Converts this DropEntity to JSON.
     * @function toJSON
     * @memberof DropEntity
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DropEntity.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DropEntity
     * @function getTypeUrl
     * @memberof DropEntity
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DropEntity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DropEntity";
    };

    return DropEntity;
})();

export const CraftingEntity = $root.CraftingEntity = (() => {

    /**
     * Properties of a CraftingEntity.
     * @exports ICraftingEntity
     * @interface ICraftingEntity
     * @property {IItemEntity|null} [item] CraftingEntity item
     * @property {IItemEntity|null} [itemA] CraftingEntity itemA
     * @property {IItemEntity|null} [itemB] CraftingEntity itemB
     * @property {IItemEntity|null} [itemC] CraftingEntity itemC
     */

    /**
     * Constructs a new CraftingEntity.
     * @exports CraftingEntity
     * @classdesc Represents a CraftingEntity.
     * @implements ICraftingEntity
     * @constructor
     * @param {ICraftingEntity=} [properties] Properties to set
     */
    function CraftingEntity(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CraftingEntity item.
     * @member {IItemEntity|null|undefined} item
     * @memberof CraftingEntity
     * @instance
     */
    CraftingEntity.prototype.item = null;

    /**
     * CraftingEntity itemA.
     * @member {IItemEntity|null|undefined} itemA
     * @memberof CraftingEntity
     * @instance
     */
    CraftingEntity.prototype.itemA = null;

    /**
     * CraftingEntity itemB.
     * @member {IItemEntity|null|undefined} itemB
     * @memberof CraftingEntity
     * @instance
     */
    CraftingEntity.prototype.itemB = null;

    /**
     * CraftingEntity itemC.
     * @member {IItemEntity|null|undefined} itemC
     * @memberof CraftingEntity
     * @instance
     */
    CraftingEntity.prototype.itemC = null;

    /**
     * Creates a new CraftingEntity instance using the specified properties.
     * @function create
     * @memberof CraftingEntity
     * @static
     * @param {ICraftingEntity=} [properties] Properties to set
     * @returns {CraftingEntity} CraftingEntity instance
     */
    CraftingEntity.create = function create(properties) {
        return new CraftingEntity(properties);
    };

    /**
     * Encodes the specified CraftingEntity message. Does not implicitly {@link CraftingEntity.verify|verify} messages.
     * @function encode
     * @memberof CraftingEntity
     * @static
     * @param {ICraftingEntity} message CraftingEntity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CraftingEntity.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.item != null && Object.hasOwnProperty.call(message, "item"))
            $root.ItemEntity.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.itemA != null && Object.hasOwnProperty.call(message, "itemA"))
            $root.ItemEntity.encode(message.itemA, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.itemB != null && Object.hasOwnProperty.call(message, "itemB"))
            $root.ItemEntity.encode(message.itemB, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.itemC != null && Object.hasOwnProperty.call(message, "itemC"))
            $root.ItemEntity.encode(message.itemC, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CraftingEntity message, length delimited. Does not implicitly {@link CraftingEntity.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CraftingEntity
     * @static
     * @param {ICraftingEntity} message CraftingEntity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CraftingEntity.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CraftingEntity message from the specified reader or buffer.
     * @function decode
     * @memberof CraftingEntity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CraftingEntity} CraftingEntity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CraftingEntity.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CraftingEntity();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.item = $root.ItemEntity.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.itemA = $root.ItemEntity.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.itemB = $root.ItemEntity.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.itemC = $root.ItemEntity.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CraftingEntity message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CraftingEntity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CraftingEntity} CraftingEntity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CraftingEntity.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CraftingEntity message.
     * @function verify
     * @memberof CraftingEntity
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CraftingEntity.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.item != null && message.hasOwnProperty("item")) {
            let error = $root.ItemEntity.verify(message.item);
            if (error)
                return "item." + error;
        }
        if (message.itemA != null && message.hasOwnProperty("itemA")) {
            let error = $root.ItemEntity.verify(message.itemA);
            if (error)
                return "itemA." + error;
        }
        if (message.itemB != null && message.hasOwnProperty("itemB")) {
            let error = $root.ItemEntity.verify(message.itemB);
            if (error)
                return "itemB." + error;
        }
        if (message.itemC != null && message.hasOwnProperty("itemC")) {
            let error = $root.ItemEntity.verify(message.itemC);
            if (error)
                return "itemC." + error;
        }
        return null;
    };

    /**
     * Creates a CraftingEntity message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CraftingEntity
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CraftingEntity} CraftingEntity
     */
    CraftingEntity.fromObject = function fromObject(object) {
        if (object instanceof $root.CraftingEntity)
            return object;
        let message = new $root.CraftingEntity();
        if (object.item != null) {
            if (typeof object.item !== "object")
                throw TypeError(".CraftingEntity.item: object expected");
            message.item = $root.ItemEntity.fromObject(object.item);
        }
        if (object.itemA != null) {
            if (typeof object.itemA !== "object")
                throw TypeError(".CraftingEntity.itemA: object expected");
            message.itemA = $root.ItemEntity.fromObject(object.itemA);
        }
        if (object.itemB != null) {
            if (typeof object.itemB !== "object")
                throw TypeError(".CraftingEntity.itemB: object expected");
            message.itemB = $root.ItemEntity.fromObject(object.itemB);
        }
        if (object.itemC != null) {
            if (typeof object.itemC !== "object")
                throw TypeError(".CraftingEntity.itemC: object expected");
            message.itemC = $root.ItemEntity.fromObject(object.itemC);
        }
        return message;
    };

    /**
     * Creates a plain object from a CraftingEntity message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CraftingEntity
     * @static
     * @param {CraftingEntity} message CraftingEntity
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CraftingEntity.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.item = null;
            object.itemA = null;
            object.itemB = null;
            object.itemC = null;
        }
        if (message.item != null && message.hasOwnProperty("item"))
            object.item = $root.ItemEntity.toObject(message.item, options);
        if (message.itemA != null && message.hasOwnProperty("itemA"))
            object.itemA = $root.ItemEntity.toObject(message.itemA, options);
        if (message.itemB != null && message.hasOwnProperty("itemB"))
            object.itemB = $root.ItemEntity.toObject(message.itemB, options);
        if (message.itemC != null && message.hasOwnProperty("itemC"))
            object.itemC = $root.ItemEntity.toObject(message.itemC, options);
        return object;
    };

    /**
     * Converts this CraftingEntity to JSON.
     * @function toJSON
     * @memberof CraftingEntity
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CraftingEntity.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CraftingEntity
     * @function getTypeUrl
     * @memberof CraftingEntity
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CraftingEntity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CraftingEntity";
    };

    return CraftingEntity;
})();

export const DropData = $root.DropData = (() => {

    /**
     * Properties of a DropData.
     * @exports IDropData
     * @interface IDropData
     * @property {Array.<IDropEntity>|null} [drops] DropData drops
     */

    /**
     * Constructs a new DropData.
     * @exports DropData
     * @classdesc Represents a DropData.
     * @implements IDropData
     * @constructor
     * @param {IDropData=} [properties] Properties to set
     */
    function DropData(properties) {
        this.drops = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DropData drops.
     * @member {Array.<IDropEntity>} drops
     * @memberof DropData
     * @instance
     */
    DropData.prototype.drops = $util.emptyArray;

    /**
     * Creates a new DropData instance using the specified properties.
     * @function create
     * @memberof DropData
     * @static
     * @param {IDropData=} [properties] Properties to set
     * @returns {DropData} DropData instance
     */
    DropData.create = function create(properties) {
        return new DropData(properties);
    };

    /**
     * Encodes the specified DropData message. Does not implicitly {@link DropData.verify|verify} messages.
     * @function encode
     * @memberof DropData
     * @static
     * @param {IDropData} message DropData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DropData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.drops != null && message.drops.length)
            for (let i = 0; i < message.drops.length; ++i)
                $root.DropEntity.encode(message.drops[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DropData message, length delimited. Does not implicitly {@link DropData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DropData
     * @static
     * @param {IDropData} message DropData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DropData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DropData message from the specified reader or buffer.
     * @function decode
     * @memberof DropData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DropData} DropData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DropData.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DropData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.drops && message.drops.length))
                        message.drops = [];
                    message.drops.push($root.DropEntity.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DropData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DropData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DropData} DropData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DropData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DropData message.
     * @function verify
     * @memberof DropData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DropData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.drops != null && message.hasOwnProperty("drops")) {
            if (!Array.isArray(message.drops))
                return "drops: array expected";
            for (let i = 0; i < message.drops.length; ++i) {
                let error = $root.DropEntity.verify(message.drops[i]);
                if (error)
                    return "drops." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DropData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DropData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DropData} DropData
     */
    DropData.fromObject = function fromObject(object) {
        if (object instanceof $root.DropData)
            return object;
        let message = new $root.DropData();
        if (object.drops) {
            if (!Array.isArray(object.drops))
                throw TypeError(".DropData.drops: array expected");
            message.drops = [];
            for (let i = 0; i < object.drops.length; ++i) {
                if (typeof object.drops[i] !== "object")
                    throw TypeError(".DropData.drops: object expected");
                message.drops[i] = $root.DropEntity.fromObject(object.drops[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a DropData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DropData
     * @static
     * @param {DropData} message DropData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DropData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.drops = [];
        if (message.drops && message.drops.length) {
            object.drops = [];
            for (let j = 0; j < message.drops.length; ++j)
                object.drops[j] = $root.DropEntity.toObject(message.drops[j], options);
        }
        return object;
    };

    /**
     * Converts this DropData to JSON.
     * @function toJSON
     * @memberof DropData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DropData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DropData
     * @function getTypeUrl
     * @memberof DropData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DropData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DropData";
    };

    return DropData;
})();

export const CraftingData = $root.CraftingData = (() => {

    /**
     * Properties of a CraftingData.
     * @exports ICraftingData
     * @interface ICraftingData
     * @property {Array.<ICraftingEntity>|null} [craftingItems] CraftingData craftingItems
     */

    /**
     * Constructs a new CraftingData.
     * @exports CraftingData
     * @classdesc Represents a CraftingData.
     * @implements ICraftingData
     * @constructor
     * @param {ICraftingData=} [properties] Properties to set
     */
    function CraftingData(properties) {
        this.craftingItems = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CraftingData craftingItems.
     * @member {Array.<ICraftingEntity>} craftingItems
     * @memberof CraftingData
     * @instance
     */
    CraftingData.prototype.craftingItems = $util.emptyArray;

    /**
     * Creates a new CraftingData instance using the specified properties.
     * @function create
     * @memberof CraftingData
     * @static
     * @param {ICraftingData=} [properties] Properties to set
     * @returns {CraftingData} CraftingData instance
     */
    CraftingData.create = function create(properties) {
        return new CraftingData(properties);
    };

    /**
     * Encodes the specified CraftingData message. Does not implicitly {@link CraftingData.verify|verify} messages.
     * @function encode
     * @memberof CraftingData
     * @static
     * @param {ICraftingData} message CraftingData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CraftingData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.craftingItems != null && message.craftingItems.length)
            for (let i = 0; i < message.craftingItems.length; ++i)
                $root.CraftingEntity.encode(message.craftingItems[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CraftingData message, length delimited. Does not implicitly {@link CraftingData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CraftingData
     * @static
     * @param {ICraftingData} message CraftingData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CraftingData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CraftingData message from the specified reader or buffer.
     * @function decode
     * @memberof CraftingData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CraftingData} CraftingData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CraftingData.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CraftingData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.craftingItems && message.craftingItems.length))
                        message.craftingItems = [];
                    message.craftingItems.push($root.CraftingEntity.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CraftingData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CraftingData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CraftingData} CraftingData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CraftingData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CraftingData message.
     * @function verify
     * @memberof CraftingData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CraftingData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.craftingItems != null && message.hasOwnProperty("craftingItems")) {
            if (!Array.isArray(message.craftingItems))
                return "craftingItems: array expected";
            for (let i = 0; i < message.craftingItems.length; ++i) {
                let error = $root.CraftingEntity.verify(message.craftingItems[i]);
                if (error)
                    return "craftingItems." + error;
            }
        }
        return null;
    };

    /**
     * Creates a CraftingData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CraftingData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CraftingData} CraftingData
     */
    CraftingData.fromObject = function fromObject(object) {
        if (object instanceof $root.CraftingData)
            return object;
        let message = new $root.CraftingData();
        if (object.craftingItems) {
            if (!Array.isArray(object.craftingItems))
                throw TypeError(".CraftingData.craftingItems: array expected");
            message.craftingItems = [];
            for (let i = 0; i < object.craftingItems.length; ++i) {
                if (typeof object.craftingItems[i] !== "object")
                    throw TypeError(".CraftingData.craftingItems: object expected");
                message.craftingItems[i] = $root.CraftingEntity.fromObject(object.craftingItems[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a CraftingData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CraftingData
     * @static
     * @param {CraftingData} message CraftingData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CraftingData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.craftingItems = [];
        if (message.craftingItems && message.craftingItems.length) {
            object.craftingItems = [];
            for (let j = 0; j < message.craftingItems.length; ++j)
                object.craftingItems[j] = $root.CraftingEntity.toObject(message.craftingItems[j], options);
        }
        return object;
    };

    /**
     * Converts this CraftingData to JSON.
     * @function toJSON
     * @memberof CraftingData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CraftingData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CraftingData
     * @function getTypeUrl
     * @memberof CraftingData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CraftingData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CraftingData";
    };

    return CraftingData;
})();

export const EquipData = $root.EquipData = (() => {

    /**
     * Properties of an EquipData.
     * @exports IEquipData
     * @interface IEquipData
     * @property {Array.<IItemEntity>|null} [equips] EquipData equips
     */

    /**
     * Constructs a new EquipData.
     * @exports EquipData
     * @classdesc Represents an EquipData.
     * @implements IEquipData
     * @constructor
     * @param {IEquipData=} [properties] Properties to set
     */
    function EquipData(properties) {
        this.equips = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EquipData equips.
     * @member {Array.<IItemEntity>} equips
     * @memberof EquipData
     * @instance
     */
    EquipData.prototype.equips = $util.emptyArray;

    /**
     * Creates a new EquipData instance using the specified properties.
     * @function create
     * @memberof EquipData
     * @static
     * @param {IEquipData=} [properties] Properties to set
     * @returns {EquipData} EquipData instance
     */
    EquipData.create = function create(properties) {
        return new EquipData(properties);
    };

    /**
     * Encodes the specified EquipData message. Does not implicitly {@link EquipData.verify|verify} messages.
     * @function encode
     * @memberof EquipData
     * @static
     * @param {IEquipData} message EquipData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EquipData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.equips != null && message.equips.length)
            for (let i = 0; i < message.equips.length; ++i)
                $root.ItemEntity.encode(message.equips[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified EquipData message, length delimited. Does not implicitly {@link EquipData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EquipData
     * @static
     * @param {IEquipData} message EquipData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EquipData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EquipData message from the specified reader or buffer.
     * @function decode
     * @memberof EquipData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EquipData} EquipData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EquipData.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EquipData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.equips && message.equips.length))
                        message.equips = [];
                    message.equips.push($root.ItemEntity.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EquipData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EquipData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EquipData} EquipData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EquipData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EquipData message.
     * @function verify
     * @memberof EquipData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EquipData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.equips != null && message.hasOwnProperty("equips")) {
            if (!Array.isArray(message.equips))
                return "equips: array expected";
            for (let i = 0; i < message.equips.length; ++i) {
                let error = $root.ItemEntity.verify(message.equips[i]);
                if (error)
                    return "equips." + error;
            }
        }
        return null;
    };

    /**
     * Creates an EquipData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EquipData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EquipData} EquipData
     */
    EquipData.fromObject = function fromObject(object) {
        if (object instanceof $root.EquipData)
            return object;
        let message = new $root.EquipData();
        if (object.equips) {
            if (!Array.isArray(object.equips))
                throw TypeError(".EquipData.equips: array expected");
            message.equips = [];
            for (let i = 0; i < object.equips.length; ++i) {
                if (typeof object.equips[i] !== "object")
                    throw TypeError(".EquipData.equips: object expected");
                message.equips[i] = $root.ItemEntity.fromObject(object.equips[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an EquipData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EquipData
     * @static
     * @param {EquipData} message EquipData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EquipData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.equips = [];
        if (message.equips && message.equips.length) {
            object.equips = [];
            for (let j = 0; j < message.equips.length; ++j)
                object.equips[j] = $root.ItemEntity.toObject(message.equips[j], options);
        }
        return object;
    };

    /**
     * Converts this EquipData to JSON.
     * @function toJSON
     * @memberof EquipData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EquipData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for EquipData
     * @function getTypeUrl
     * @memberof EquipData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    EquipData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/EquipData";
    };

    return EquipData;
})();

export { $root as default };
