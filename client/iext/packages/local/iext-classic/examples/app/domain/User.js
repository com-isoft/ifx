Ext.define('app.domain.User', {
    extend: 'iExt.domain.Domain',

    ixName: '用户',

    ixActions: {
        test: {
            type: 'view',
            ixName: '测试'
        },
        add: {
            ixName: '新增',
            ixView: 'app-odoo-add'
        },
        active: {
            type: 'api',
            ixName: '有效'
        },
        inactive: {
            type: 'api',
            ixName: '无效'
        },
        rest: {
            type: 'api',
            ixName: '重置口令'
        },
        changePwd: {
            type: 'view',
            ixName: '变更口令'
        }
    },

    ixListViews: [{
        ixListType: 'list',
        xtype: 'app-odoo-list'
    }, {
        ixListType: 'kanban',
        xtype: 'app-odoo-kanban'
    }, {
        ixListType: 'graph',
        xtype: 'app-odoo-view'
    }]

});