/**
 * @class iExt.meta.ixtype.Integer
 * @extends {iExt.enums.Base} 
 * @classdesc 整型元数据子类型枚举。
 */
Ext.define('iExt.meta.ixtype.Integer', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: false,
    ixItems: [
        { name: 'INT', text: '整型', value: 1 },
        { name: 'NO', text: '序号', value: 2 },
        { name: 'BIT', text: '位值', value: 4 },
        { name: 'LIST', text: '选项', value: 8 }
    ]
});