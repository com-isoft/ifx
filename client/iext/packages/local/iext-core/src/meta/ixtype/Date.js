/**
 * @class iExt.meta.ixtype.Date
 * @extends {iExt.enums.Base} 
 * @classdesc 日期元数据子类型枚举。
 */
Ext.define('iExt.meta.ixtype.Date', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: false,
    ixItems: [
        { name: 'YM', text: '年月', value: 1 },
        { name: 'DATE', text: '日期', value: 2 },
        { name: 'TIME', text: '时间', value: 4 },
        { name: 'DATETIME', text: '日期时间', value: 8 }
    ]
});