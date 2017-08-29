/**
 * @class iExt.filter.Date
 * @extends {Ext.filter.Base} 
 * @classdesc 日期筛选条件类。
 */
Ext.define('iExt.filter.Date', {
    extend: 'iExt.filter.Base',
    alias: [
        'ixfilter.date'
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
        return iExt.meta.DataType.DATE;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Date.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    /**
     * 获取可以使用的操作符
     */
    ixOperators: function () {
        return iExt.filter.Operators.ixGetItems(
            iExt.filter.Operators.EQ +
            iExt.filter.Operators.NEQ +
            iExt.filter.Operators.LT +
            iExt.filter.Operators.LTE +
            iExt.filter.Operators.GT +
            iExt.filter.Operators.GTE);
    }

});