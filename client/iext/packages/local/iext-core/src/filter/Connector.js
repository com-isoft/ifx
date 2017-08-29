/**
 * @class iExt.filter.Operators
 * @extends {iExt.enums.Base} 
 * @classdesc 筛选条件连接符枚举。
 */
Ext.define('iExt.filter.Connectors', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [
        { name: 'AND', text: '且', value: 1 },
        { name: 'OR', text: '货', value: 2 }
    ]

});