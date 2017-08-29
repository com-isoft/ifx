/**
 * @class iExt.app.view.ListTypes
 * @extends {iExt.enums.Base} 
 * @classdesc 列表视图类型枚举。
 */
Ext.define('iExt.app.view.ListTypes', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [{
        name: 'LIST',
        text: '列表',
        value: 1
    }, {
        name: 'CALENDAR',
        text: '日历',
        value: 2
    }, {
        name: 'GRAPH',
        text: '图表',
        value: 4
    }, {
        name: 'KANBAN',
        text: '看板',
        value: 8
    }, {
        name: 'REPORT',
        text: '报表',
        value: 16
    }]

});