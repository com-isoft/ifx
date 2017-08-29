/**
 * @class iExt.meta.field.String
 * @extends {iExt.meta.field.Field} 
 * @classdesc 文本字段类。
 */
Ext.define('iExt.meta.field.String', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.field.string',
        'ixmeta.field.str'
    ],

    config: {
        /**
         * 数据类型
         */
        ixDataType: iExt.meta.Types.STRING,
        /**
         * 数据子类型
         */
        ixSubType: 'string'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.Types.STRING;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.String.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    updateIxSubType: function (subtype, oldSubType) {
        // GUID 型数据是无意义的
        if (subtype == iExt.meta.ixtype.String.GUID) {
            if (this.ixMeaningful === null) {
                this.ixMeaningful = false;
            }
        }
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