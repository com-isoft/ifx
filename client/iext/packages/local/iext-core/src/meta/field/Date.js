/**
 * @class iExt.meta.field.Date
 * @extends {iExt.meta.field.Field} 
 * @classdesc 日期时间字段类。
 */
Ext.define('iExt.meta.field.Date', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.field.date'
    ],

    config: {
        /**
         * 数据类型
         */
        ixDataType: iExt.meta.Types.DATE,
        /**
         * 数据子类型
         */
        ixSubType: 'date'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.Types.DATE;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Date.ixGetValue(subtype.toUpperCase());
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

        if (subtype === iExt.meta.ixtype.Date.DATE) {
            value = Ext.util.Format.date(value, 'Y-m-d');
        } else if (subtype === iExt.meta.ixtype.Date.DATETIME) {
            value = Ext.util.Format.date(value, 'Y-m-d H:i:s');
        } else if (subtype === iExt.meta.ixtype.Date.TIME) {
            value = Ext.util.Format.date(value, 'H:i');
        }

        return value;
    }

});