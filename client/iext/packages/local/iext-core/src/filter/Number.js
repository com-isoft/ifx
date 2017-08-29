/**
 * @class iExt.filter.Number
 * @extends {Ext.filter.Base} 
 * @classdesc 数字筛选条件类。
 */
Ext.define('iExt.filter.Number', {
    extend: 'iExt.filter.Base',
    alias: [
        'ixfilter.number',
        'ixfilter.num'
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