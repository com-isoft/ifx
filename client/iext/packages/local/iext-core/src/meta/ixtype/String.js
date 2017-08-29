/**
 * @class iExt.meta.ixtype.String
 * @extends {iExt.enums.Base} 
 * @classdesc 文本元数据子类型枚举。
 */
Ext.define('iExt.meta.ixtype.String', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: false,
    ixItems: [
        { name: 'STRING', text: '字符', value: 1 },
        { name: 'TEXT', text: '文本', value: 2 },
        { name: 'GUID', text: '标识', value: 4 },
        { name: 'LIST', text: '选项', value: 8 }
    ]

});