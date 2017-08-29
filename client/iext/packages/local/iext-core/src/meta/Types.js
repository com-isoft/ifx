/**
 * @class iExt.meta.Types
 * @extends {iExt.enums.Base} 
 * @classdesc 元数据数据类型枚举。
 */
Ext.define('iExt.meta.Types', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: true,
    
    ixItems: [
        { name: 'STRING', text: '文本', value: 1 },
        { name: 'BOOLEAN', text: '布尔', value: 2 },
        { name: 'INTEGER', text: '整型', value: 4 },
        { name: 'NUMBER', text: '数字', value: 8 },
        { name: 'DATE', text: '日期', value: 16 }
    ]
    
});