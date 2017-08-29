/**
 * @class iExt.meta.field.Number
 * @extends {iExt.meta.field.Field} 
 * @classdesc 数值字段类。
 */
Ext.define('iExt.meta.field.Number', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.field.number',
        'ixmeta.field.num'
    ],

    config: {
        /**
         * 数据类型
         */
        ixDataType: iExt.meta.Types.NUMBER,
        /**
         * 数据子类型
         */
        ixSubType: 'qty'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.Types.NUMBER;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Number.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    /**
     * 根据字段属性信息格式化数据。
     * @param {Object} 值。
     * @return {String} 格式化后的字符串。
     */
    ixFormat: function (value) {
        var subtype = this.getIxSubType();

        if (subtype === iExt.meta.ixtype.Number.QTY) {
            value = Ext.util.Format.number(value, '0,0.00');
        } else if (subtype === iExt.meta.ixtype.Number.AMT) {
            value = Ext.util.Format.number(value, '0,0.00');
        } else if (subtype === iExt.meta.ixtype.Number.PCT) {
            value = Ext.util.Format.percent(value);
        }

        return value;
    }

});