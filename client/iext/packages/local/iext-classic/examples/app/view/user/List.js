/**
 * This view is an example list of people.
 */
Ext.define('app.view.user.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'app-user-list',

    requires: [
        'app.store.User',
        'iExt.app.view.ListTypes'
    ],

    title: 'Personnel',
    controller: {
        type: 'ixlist'
    },

    ixStore: {
        type: 'user'
    },
    //ixPageSize: 5,

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
            }
        }, {
            text: '编辑',
            iconCls: 'x-fa fa-edit',
            ixAuth: {
                ixService: 'menu',
                ixOperation: 'edit'
            },
            ixAlign: {
                type: 'list',
                ixMode: false
            },
            listeners: {
                click: function (item, e, eOpts) {
                    item.fireEvent('ixshowtip', item.getIxAuth().ixService);
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
                    iExt.View.ixOpenView(item, {
                        xtype: 'ixqvform',
                        ixRecord: data[0]
                    }, 'quick');
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
            text: '搜索',
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
            text: '操作',
            menu: {
                xtype: 'ixactmenu',
                items: [{
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
            flex: 1,
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            }
        }]
    },

    dockedItems: [{
        xtype: 'ixsearchtbr',
        items: [{
            xtype: 'ixsearchct',
            fieldLabel: 'SearchContainer',
            labelWidth: 120,
            items: [{
                xtype: 'ixtext',
                flex: 1,
                reference: 'txtNewName'
            }],
            ixFilters: {
                ixConnector: iExt.filter.Connectors.AND,
                ixItems: [{
                    ixProperty: 'name',
                    ixOperator: iExt.filter.Operators.CT,
                    ixAlignTarget: 'txtNewName',
                    type: 'string'
                }]
            }
        }, {
            xtype: 'ixsearchfield',
            fieldLabel: 'SearchField',
            labelWidth: 100,
            ixFilters: {
                ixConnector: iExt.filter.Connectors.AND,
                ixItems: [{
                    ixProperty: 'name',
                    ixOperator: iExt.filter.Operators.CT,
                    type: 'string'
                }]
            }
        }, {
            labelWidth: 100,
            fieldLabel: 'SearchBar',
            reference: 'txtName'
        }],
        ixFilters: {
            ixConnector: iExt.filter.Connectors.AND,
            ixItems: [{
                ixProperty: 'name',
                ixOperator: iExt.filter.Operators.CT,
                ixAlignTarget: 'txtName',
                type: 'string'
            }]
        }
    }],

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
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

    listeners: {
        ixselection: function (item, selection) {
            if (selection.length > 0) {
                //iExt.Toast.ixInfo(selection[0].get('email'));
            }
        }
    }
});