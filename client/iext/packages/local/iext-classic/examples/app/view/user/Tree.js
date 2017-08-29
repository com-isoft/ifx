Ext.define('app.view.user.Tree', {
    extend: 'iExt.tree.Panel',
    xtype: 'app-user-tree',

    requires: [
        'app.store.Navigation'
    ],

    title: '用户树',
    controller: {
        type: 'ixlist'
    },

    //autoLoad: true,

    ixMulti: false,
    ixLeafOnly: false,
    ixService: 'menu',
    //ixNodeIcon: true,
    ixStore: {
        type: 'navigation'
    },

    /*
    store: {
        type: 'navigation'
    },
    */

    tbar: {
        xtype: 'ixacttbr',
        ixAuthService: 'user',
        items: [{
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
            xtype: 'tbspacer',
            flex: 1
        }, {
            text: '操作',
            menu: {
                xtype: 'ixactmenu',
                items: [{
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
                            iExt.Toast.ixInfo(data[0].get('address'));
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
                        ixEnabledWhen: '"{code}"==="system"'
                    },
                    listeners: {
                        click: function (item, e, eOpts) {
                            var data = item.getIxAlign().ixGetAlignData();
                            iExt.Toast.ixInfo(data.length);
                        }
                    }
                }, '-', {
                    text: '启用',
                    ixAuth: {
                        ixOperation: 'active'
                    },
                    ixAlign: {
                        type: 'list',
                        ixMode: null
                    }
                }, {
                    text: '停用',
                    ixAuth: {
                        ixOperation: 'inactive'
                    },
                    ixAlign: {
                        type: 'list',
                        ixMode: true
                    }
                }, {
                    text: '审批',
                    ixAuth: {
                        ixOperation: 'approve'
                    },
                    ixAlign: {
                        type: 'list',
                        ixMode: false
                    }
                }]
            }
        }, {
            xtype: 'ixtagsearch',
            ixView: 'app-user-search',
            flex: 2,
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            }
        }]
    },

    columns: [{
        xtype: 'ixtreecol',
        text: '名称',
        flex: 1,
        dataIndex: 'text'
    }, {
        xtype: 'ixcol',
        text: '代码',
        dataIndex: 'code',
        width: 150
    }, {
        text: '图标',
        dataIndex: 'iconCls',
        width: 150
    }, {
        text: '地址',
        dataIndex: 'address',
        flex: 1,
        sortable: false
    }]

});