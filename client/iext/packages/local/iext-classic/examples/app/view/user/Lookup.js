/**
 * This view is an example list of people.
 */
Ext.define('app.view.user.Lookup', {
    extend: 'iExt.grid.Lookup',
    xtype: 'app-user-lookup',

    requires: [
        'app.store.User',
        'iExt.app.view.ListTypes'
    ],

    title: '用户参照',
    //header: false,
    controller: {
        type: 'ixlist'
    },

    tbar: [{
        text: '搜索',
        xtype: 'ixactbtn',
        iconCls: 'x-fa fa-search',
        ixAuth: {
            ixService: 'menu',
            ixOperation: 'edit'
        },
        ixAlign: {
            type: 'list',
            ixMode: null
        },
        listeners: {
            click: function (item, e, eOpts) {
                iExt.View.ixOpenView(item, 'app-user-search', 'ixwin');
            }
        }
    }, {
        text: '搜索',
        xtype: 'ixsearchbtn',
        ixView: 'app-user-search'
    }, {
        xtype: 'ixtagsearch',
        ixView: 'app-user-search',
        flex: 1
    }],

    ixStore: {
        type: 'user'
    },
    ixPageSize: 5,

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    }]
});