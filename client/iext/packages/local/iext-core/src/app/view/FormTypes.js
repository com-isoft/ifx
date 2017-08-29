/**
 * @class iExt.app.view.FormTypes
 * @extends {iExt.enums.Base} 
 * @classdesc 表单视图类型枚举。
 */
Ext.define('iExt.app.view.FormTypes', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [{
        name: 'ADD',
        text: '新建',
        value: 1
    }, {
        name: 'EDIT',
        text: '编辑',
        value: 2
    }, {
        name: 'DETAIL',
        text: '详细',
        value: 4
    }, {
        name: 'SEARCH',
        text: '搜索',
        value: 8
    }, {
        name: 'LOOKUP',
        text: '参照',
        value: 16
    }]

});