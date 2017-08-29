Ext.define('app.view.odoo.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'app-odoo-list',

    requires: [
        'iExt.grid.column.Column'
    ],
    layout: 'fit',

    title: 'Users',
    controller: {
        type: 'ixlist'
    },

    ixStore: {
        type: 'user'
        /*,
        filters: [{
            "dataType": "STRING",
            "operator": "like",
            "property": "name",
            "value": "w"
        }]*/
    },
    //ixPreviewField: 'email',
    ixQuickView: 'ixqvform',

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
        ixType: 'text',
        flex: 1
    }, {
        text: 'dual',
        dataIndex: 'dual',
        xtype: 'ixboolcol',
        ixType: 'dual'
    }, {
        text: 'triplet',
        dataIndex: 'triplet',
        xtype: 'ixboolcol',
        ixType: 'triplet'
    }, {
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }],

    initComponent: function () {
        var me = this;
        // itemclick 与数据选择有冲突
        me.on('itemdblclick', me.ixOnItemClick, me);
        me.callParent();
    },

    ixOnItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        /*
        iExt.View.ixOpenView(me, {
            xtype: 'ixqvform',
            ixRecord: record
        }, 'quick');
        */
        me.fireEvent('ixopenview', item, 'app-user-detail', {
            target: iExt.action.ViewTarget.MAIN
        });
    }

});