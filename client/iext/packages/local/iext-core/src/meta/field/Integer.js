/**
 * @class iExt.meta.field.Integer
 * @extends {iExt.meta.field.Field} 
 * @classdesc 整型字段类。
 */
Ext.define('iExt.meta.field.Integer', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.field.integer',
        'ixmeta.field.int'
    ],

    config: {
        /**
         * 数据类型
         */
        ixDataType: iExt.meta.Types.INTEGER,
        /**
         * 数据子类型
         */
        ixSubType: 'int'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.Types.INTEGER;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Integer.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    /**
     * 根据字段属性信息格式化数据。
     * @param {Object} 值。
     * @return {String} 格式化后的字符串。
     */
    ixFormat: function (value) {
        return value;
    }

});