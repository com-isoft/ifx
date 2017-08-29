/**
 * @class iExt.filter.Operators
 * @extends {iExt.enums.Base} 
 * @classdesc 筛选条件操作符枚举。
 */
Ext.define('iExt.filter.Operators', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: true,
    ixItems: [
        { name: 'EQ', text: '等于', value: 1 },
        { name: 'NEQ', text: '不等于', value: 2 },
        { name: 'GT', text: '大于', value: 4 },
        { name: 'GTE', text: '大于等于', value: 8 },
        { name: 'LT', text: '小于', value: 16 },
        { name: 'LTE', text: '小于等于', value: 32 },
        { name: 'CT', text: '包含', value: 64 },
        { name: 'SW', text: '以...开头', value: 128 },
        { name: 'EW', text: '以...结尾', value: 256 },
        { name: 'IN', text: '属于', value: 512 }
    ],

    /**
     * 操作符
     */
    ixOperators: {
        EQ: '=',
        NEQ: '!=',
        GT: '>',
        GTE: '>=',
        LT: '<',
        LTE: '<=',
        CT: 'like',
        SW: '*%',
        EW: '%*',
        IN: 'in'
    }

});