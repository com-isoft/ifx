/**
 * @class iExt.meta.ixtype.Number
 * @extends {iExt.enums.Base} 
 * @classdesc 数值元数据子类型枚举。
 */
Ext.define('iExt.meta.ixtype.Number', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: false,
    ixItems: [
        { name: 'QTY', text: '数量', value: 1 },
        { name: 'PRC', text: '数量', value: 2 },
        { name: 'AMT', text: '金额', value: 4 },
        { name: 'PCT', text: '百分比', value: 8 }
    ]
});