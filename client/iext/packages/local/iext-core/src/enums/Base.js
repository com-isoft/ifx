/**
 * @class iExt.enums.Base
 * @classdesc 枚举基础类。
 */
Ext.define('iExt.enums.Base', {

    /**
     * 是否是位值枚举
     * 缺省都是位值枚举
     */
    ixBit: true,

    /**
     * 枚举值
     */
    ixItems: [],

    /**
     * 分隔符
     */
    ixDelimiter: ',',

    /**
     * 名称属性名
     */
    ixNameProperty: 'name',

    /**
     * 值属性名
     */
    ixValueProperty: 'value',

    /**
     * 文本属性名
     */
    ixTextProperty: 'text',

    /**
     * 重载构造方法。根据配置信息项自动添加枚举值。
     * @memberOf iExt.enums.Base#
     */
    constructor: function () {
        var me = this;
        if (Ext.isArray(me.ixItems)) {
            Ext.each(me.ixItems, function (item) {
                var value = item[me.ixValueProperty];
                if (!Number.isInteger(value)) {
                    Ext.raise('指定枚举值的 value [' + value + '] 不是有效整数!');
                }
                // 强制枚举值从 1 开始
                if (value <= 0) {
                    Ext.raise('枚举值的 value 必须是大于零的正整数!');
                }
                me[item[me.ixNameProperty]] = item[me.ixValueProperty];
            });
        }
    },

    /**
     * 根据枚举值或枚举名称获取枚举项。
     * @memberOf iExt.enums.Base#
     * @param {Number|String} value 枚举值或枚举名称。
     * @return {Object} 枚举项。
     */
    ixGetItem: function (value) {
        var me = this,
            enumItem = null;
        if (Ext.isString(value)) {
            value = value.toUpperCase();
            Ext.Array.findBy(me.ixItems, function (item) {
                if (item[me.ixNameProperty] === value) {
                    enumItem = Ext.clone(item);
                    return true;
                }
            });
        } else if (Ext.isNumber(value)) {
            Ext.Array.findBy(me.ixItems, function (item) {
                if (item[me.ixValueProperty] === value) {
                    enumItem = Ext.clone(item);
                    return true;
                }
            });
        }
        return enumItem;
    },

    /**
     * 根据枚举的位值合计获取枚举项集合。
     * @memberOf iExt.enums.Base#
     * @param {Number} values 枚举值。
     * @return {Object[]} 枚举项集合。
     */
    ixGetItems: function (values) {
        var me = this,
            items = [],
            value;
        Ext.Array.findBy(me.ixItems, function (item) {
            value = item[me.ixValueProperty];
            if ((values & value) === value) {
                items.push(Ext.clone(item));
            }
        });
        return items;
    },

    /**
     * 根据名称获取值。
     * @memberOf iExt.enums.Base#
     * @param {String} name 枚举的名称。
     * @param {String} delimiter 分隔符。
     * @return {String} 枚举的值。
     */
    ixGetValue: function (name, delimiter) {
        var me = this,
            value = 0;
        delimiter = delimiter || me.ixDelimiter;
        var names = name.split(delimiter);
        if (names.length > 1 && me.ixBit === true) {
            for (var i = 0; i < names.length; i++) {
                value += me._ixValue(names[i]);
            }
        } else {
            value = me._ixValue(name);
        }
        return value;
    },

    /**
     * 根据值获取名称。
     * @memberOf iExt.enums.Base#
     * @param {String} value 枚举的值。
     * @param {String} delimiter 分隔符。
     * @return {String} 枚举的名称。
     */
    ixGetName: function (value, delimiter) {
        var me = this,
            x = 1,
            name = '';
        delimiter = delimiter || me.ixDelimiter;
        if (me.ixBit === true) {
            while (x <= value) {
                if ((value & x) === x) {
                    name += me._ixName(x) + delimiter;
                }
                x = x * 2;
            }
            // 去掉最后一个分隔符
            if (name !== '') {
                name = name.substring(0, name.length - delimiter.length);
            }
        } else {
            name = me._ixName(value);
        }
        return name;
    },

    /**
     * 根据值或者名称获取显示的文本。
     * @memberOf iExt.enums.Base#
     * @param {String|Number} item 枚举的值或者名称。
     * @param {String} delimiter 分隔符。
     * @return {String} 枚举的显示的文本。
     */
    ixGetText: function (item, delimiter) {
        var me = this,
            name = item;
        delimiter = delimiter || me.ixDelimiter;
        if (!Ext.isString(item)) {
            name = me.ixGetName(item);
        }
        var texts = '',
            names = name.split(delimiter);
        if (names.length > 1 && me.ixBit === true) {
            for (var i = 0; i < names.length; i++) {
                name = names[i];
                if (name !== '') {
                    texts += me._ixText(names[i]) + delimiter;
                }
            }
            // 去掉最后一个分隔符
            if (texts !== '') {
                texts = texts.substring(0, texts.length - delimiter.length);
            }
        } else {
            texts = me._ixText(name);
        }
        return texts;
    },

    /**
     * 获取枚举列表，包含value、name和text属性。
     * @memberOf iExt.enums.Base#
     * @param {String|Number} item 枚举的值或者名称。
     * @param {String} del 分隔符。
     * @return {Object[]} 枚举列表。
     */
    ixList: function () {
        return this.ixItems;
    },

    privates: {

        /**
         * 根据名称获取值。
         * @memberOf iExt.enums.Base#
         * @private
         * @param {String} name 枚举的名称。
         * @return {String} 枚举的值。
         */
        _ixValue: function (name) {
            var me = this,
                result = null;
            if (name === '') {
                return result;
            }

            result = me[name];
            if (!result) {
                Ext.raise('enums.Base: 无法获取 ' + name + ' 的枚举值！');
            }
            return result;
        },

        /**
         * 根据值获取名称。
         * @memberOf iExt.enums.Base#
         * @private
         * @param {String} value 枚举的值。
         * @return {String} 枚举的名称。
         */
        _ixName: function (value) {
            var me = this,
                result = null;

            for (var prop in me) {
                if (value === me[prop]) {
                    result = prop;
                    break;
                }
            }
            if (!result) {
                Ext.raise('enums.Base: 无法解析 ' + value + ' 的枚举值！');
            }
            return result;
        },

        /**
         * 根据名称获取显示的文本。
         * @memberOf iExt.enums.Base#
         * @private
         * @param {String} name 枚举的名称。
         * @return {String} 枚举的显示的文本。
         */
        _ixText: function (name) {
            var me = this,
                result = null;
            Ext.Array.findBy(me.ixItems, function (item) {
                if (item[me.ixNameProperty] === name) {
                    result = item[me.ixTextProperty];
                    return true;
                }
            });

            if (!result) {
                Ext.raise('enums.Base: 无法获取枚举值 ' + name + ' 的文本！');
            }
            return result;
        }
    }
});