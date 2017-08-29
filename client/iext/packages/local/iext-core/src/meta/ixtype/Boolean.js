/**
 * @class iExt.meta.ixtype.Boolean
 * @extends {iExt.enums.Base} 
 * @classdesc 布尔元数据子类型枚举。
 */
Ext.define('iExt.meta.ixtype.Boolean', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: false,
    ixItems: [
        { name: 'DUAL', text: '双态', value: 1 },
        { name: 'TRIPLET', text: '三态', value: 2 }
    ]
});