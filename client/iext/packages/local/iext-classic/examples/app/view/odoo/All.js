Ext.define('app.view.odoo.All', {
    extend: 'iExt.app.view.container.List',
    xtype: 'app-odoo-all',

    requires: [

    ],

    title: '用户All In One',
    controller: {
        type: 'ixlistcontainer'
    },

    ixDomain: 'app.domain.User',

    /*
    ixActionItems: [{
        text: '新建',
        iconCls: 'x-fa fa-plus',
        ixAuth: 'add',
        ixAlign: {
            type: 'list',
            ixMode: null
        },
        listeners: {
            click: function (item, e, eOpts) {
                //var data = item.getIxAlign().ixGetAlignData();
                item.fireEvent('ixopenview', item, 'app-odoo-add', {
                    target: iExt.action.ViewTarget.MAIN
                });
            }
        },
        ixViewName: 'app-user-add'
    }, {
        text: '新建WIN',
        iconCls: 'x-fa fa-plus',
        ixAuth: 'add',
        ixAlign: {
            type: 'list',
            ixMode: null
        },
        listeners: {
            click: function (item, e, eOpts) {
                //var data = item.getIxAlign().ixGetAlignData();
                item.fireEvent('ixopenview', item, 'app-odoo-add2', {
                    target: iExt.action.ViewTarget.IXWIN,
                    formType: 'add'
                });
            }
        }
    }, {
        text: '详细',
        iconCls: 'x-fa fa-file-o',
        ixAuth: {
            ixOperation: 'detail'
        },
        ixAlign: {
            type: 'list',
            ixMode: false
        },
        listeners: {
            click: function (item, e, eOpts) {
                var data = item.getIxAlign().ixGetAlignData();
                item.fireEvent('ixopenview', item, 'app-odoo-detail', {
                    formType: 'detail',
                    viewConfig: {
                        ixParams: {
                            ixRecord: data[0]
                        }
                    }
                });
            }
        }
    }, {
        text: '删除',
        iconCls: 'x-fa fa-trash',
        ixAuth: {
            ixOperation: 'remove'
        },
        ixAlign: {
            type: 'list',
            ixMode: true,
            ixEnabledWhen: '"{name}"==="Worf"'
        },
        listeners: {
            click: function (item, e, eOpts) {
                var data = item.getIxAlign().ixGetAlignData();
                iExt.Toast.ixInfo(data.length);
            }
        }
    }, {
        text: '操作',
        menuAlign: 'tc-bc',
        menu: {
            xtype: 'ixactmenu',
            shadow: false,
            items: [{
                ixAlign: {
                    type: 'list',
                    ixMode: false
                },
                text: '启用'
            }, {
                ixAlign: {
                    type: 'list',
                    ixMode: false
                },
                text: '停用'
            }, {
                ixAlign: {
                    type: 'list',
                    ixMode: false
                },
                text: '审批'
            }]
        }
    }],
    */

    ixSearchItem: {
        xtype: 'ixtagsearch',
        ixView: 'app-user-search',
        flex: 1,
        store: {
            type: 'ixenumsstore',
            ixEnumType: 'iExt.meta.Types'
        }
    },

    /*
    ixView: [{
        ixListType: 'list',
        xtype: 'app-odoo-list'
    }, {
        ixListType: 'kanban',
        xtype: 'app-odoo-kanban'
    }, {
        ixListType: 'graph',
        xtype: 'app-odoo-view'
    }],
    */

    initComponent: function () {
        var me = this;
        me.callParent();
    }

});