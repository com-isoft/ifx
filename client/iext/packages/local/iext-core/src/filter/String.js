/**
 * @class iExt.filter.String
 * @extends {Ext.filter.Base} 
 * @classdesc 数字筛选条件类。
 */
Ext.define('iExt.filter.String', {
    extend: 'iExt.filter.Base',
    alias: [
        'ixfilter.string',
        'ixfilter.str'
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

    /**
     * 获取可以使用的操作符
     */
    ixOperators: function () {
        var subtype = this.getIxSubType();

        if (subtype === iExt.meta.ixtype.String.GUID) {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.EQ);
        } else if (subtype === iExt.meta.ixtype.String.TEXT) {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.CT +
                iExt.filter.Operators.SW +
                iExt.filter.Operators.EW);
        } else if (subtype === iExt.meta.ixtype.String.LIST) {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.CT +
                iExt.filter.Operators.EQ +
                iExt.filter.Operators.NEQ);
        } else {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.CT +
                iExt.filter.Operators.SW +
                iExt.filter.Operators.EW +
                iExt.filter.Operators.EQ +
                iExt.filter.Operators.NEQ);
        }

    }

});