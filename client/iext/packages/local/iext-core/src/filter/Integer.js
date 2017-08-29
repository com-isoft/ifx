/**
 * @class iExt.filter.Integer
 * @extends {Ext.filter.Base} 
 * @classdesc 整型筛选条件类。
 */
Ext.define('iExt.filter.Integer', {
    extend: 'iExt.filter.Base',
    alias: [
        'ixfilter.integer',
        'ixfilter.int'
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
     * 获取可以使用的操作符
     */
    ixOperators: function () {
        var subtype = this.getIxSubType();

        if (subtype === iExt.meta.ixtype.Integer.BIT) {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.CT +
                iExt.filter.Operators.IN);
        } else if (subtype === iExt.meta.ixtype.String.LIST) {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.CT +
                iExt.filter.Operators.IN);
        } else {
            return iExt.filter.Operators.ixGetItems(
                iExt.filter.Operators.EQ +
                iExt.filter.Operators.NEQ +
                iExt.filter.Operators.LT +
                iExt.filter.Operators.LTE +
                iExt.filter.Operators.GT +
                iExt.filter.Operators.GTE);
        }
    },

    privates: {

        // 获取搜索值的方法，不同的搜索类型可以重载此方法
        _ixGetValue: function (value) {
            return value;
        },

        // 获取搜索数据类型的方法，不同的搜索类型可以重载此方法
        _ixGetDataType: function () {
            var me = this,
                type = me.getIxDataType(),
                subtype = me.getIxSubType(),
                name = iExt.meta.DataType.ixGetName(type);
            if (subtype === iExt.meta.ixtype.Integer.BIT) {
                name = 'FLAG';
            }
            return name;
        }

    }

});