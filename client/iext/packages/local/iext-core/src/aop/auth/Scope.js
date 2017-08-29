/**
 * @class iExt.aop.auth.Scope
 * @extends {iExt.enums.Base} 
 * @classdesc 授权范围枚举。
 */
Ext.define('iExt.aop.auth.Scope', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: true,
    ixItems: [{
        name: 'NONE',
        text: '无',
        value: 1
    }, {
        name: 'PERSONAL',
        text: '个人',
        value: 2
    }, {
        name: 'DEPARTMENT',
        text: '部门',
        value: 4
    }, {
        name: 'COMPANY',
        text: '公司',
        value: 8
    }, {
        name: 'GROUP',
        text: '集团',
        value: 16
    }, {
        name: 'UDF',
        text: '自定义',
        value: 32
    }]
});