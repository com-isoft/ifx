Ext.define('app.view.odoo.Add', {
    extend: 'iExt.app.view.container.Form',
    xtype: 'app-odoo-add',

    requires: [],

    title: '用户维护',
    controller: {
        type: 'ixformcontainer'
    },

    ixActionItems: [{
        text: '保存',
        iconCls: 'x-fa fa-save',
        ixAlign: {
            type: 'form',
            ixMode: true
        },
        listeners: {
            click: function () {
                var win = Ext.create({
                    xtype: 'ixwin',
                    title: '常规',
                    modal: true,
                    maximizable: true,
                    width: 600,
                    height: 400,
                    viewModel: true,
                    buttons: [{
                        text: '确定',
                        listeners: {
                            click: function (item, e, eOpts) {
                                var vm = this.ownerCt.ownerCt.getViewModel();
                            }
                        }
                    }]
                });
                win.show();
            }
        }
    }, {
        text: '取消',
        iconCls: 'x-fa fa-close',
        listeners: {
            click: function (item, e, eOpts) {
                var panel = item.up('panel');
                panel.close();
            }
        }
    }, '->', {
        text: '操作',
        menuAlign: 'tc-bc',
        menu: {
            xtype: 'menu',
            shadow: false,
            items: [{
                text: '启用',
                listeners: {
                    click: function () {
                        iExt.Toast.ixInfo('hello ' + Ext.Number.randomInt(0, 100) + ' !');
                    }
                }
            }, {
                text: '停用'
            }, {
                text: '审批'
            }]
        }
    }, '->', ],

    ixView: {
        xtype: 'ixform',
        ixFormType: 'add',
        width: 750,

        tbar: {
            xtype: 'ixformheader',
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'ixstatbtn',
                iconCls: 'x-fa fa-plus',
                text: 'Activities',
                value: 1000,
                listeners: {
                    click: function (item, e, eOpts) {
                        item.setText('new text');
                        item.setValue(200);
                    }
                }
            }, {
                xtype: 'ixactbtn',
                text: 'Inactivated',
                ixBadgeText: '9000',
                iconCls: 'x-fa fa-plus',
                listeners: {
                    click: function (item, e, eOpts) {
                        item.setIxBadgeText('888');
                        item.setText('new text');
                    }
                }
            }, {
                text: 'Active'
            }, {
                text: '中文测试',
                iconCls: 'x-fa fa-search'
            }]
        },

        items: [{
            ixScale: 'large',
            fieldLabel: '代码',
            bind: '{user.code}',
            reference: 'code',
            vtype: 'code',
            allowBlank: false
        }, {
            ixScale: 'large',
            fieldLabel: '姓名',
            bind: '{user.name}',
            reference: 'name',
            allowBlank: false
        }, {
            fieldLabel: 'PickerString',
            xtype: 'ixpicker',
            ixWidget: 'panel'
        }, {
            fieldLabel: 'PickerCmp',
            xtype: 'ixpicker',
            ixWidget: {
                xtype: 'panel',
                title: 'hello',
                bbar: [{
                    text: 'try it',
                    listeners: {
                        click: function () {
                            iExt.Toast.ixInfo('picker component handler...');
                        }
                    }
                }]
            },
            ixPickerConfig: {
                minWidth: 300,
                minHeight: 400
            }
        }, {
            fieldLabel: 'Columns',
            xtype: 'ixcombo',
            store: {
                type: 'user'
            },
            pageSize: 5,
            valueField: 'email',
            displayField: 'name',
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            ixLines: 'all',
            ixColumns: [{
                dataIndex: 'name',
                width: 100
            }, {
                dataIndex: 'email'
            }]
        }, {
            fieldLabel: 'ItemTpl',
            xtype: 'ixcombo',
            store: {
                type: 'user'
            },
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            pageSize: 5,
            valueField: 'email',
            displayField: 'name',
            ixItemTpl: [
                '<div title="{name}: {email}">{name} ({phone})</div>'
            ]
        }, {
            fieldLabel: 'TagColumns',
            xtype: 'ixtagfield',
            store: {
                type: 'user'
            },
            pageSize: 5,
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            ixLines: 'all',
            ixColumns: [{
                dataIndex: 'name',
                width: 100
            }, {
                dataIndex: 'email'
            }]
        }, {
            fieldLabel: 'TagTpl',
            xtype: 'ixtagfield',
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            store: {
                type: 'user'
            },
            pageSize: 5,
            valueField: 'email',
            displayField: 'name',
            ixItemTpl: [
                '<div title="{name}: {email}">{name} ({phone})</div>'
            ]
        }, {
            fieldLabel: 'LookupMulti',
            xtype: 'ixtaglookup',
            valueField: 'email',
            displayField: 'name',
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            ixView: 'app-user-lookup'
        }, {
            fieldLabel: 'LookupSingle',
            xtype: 'ixlookuppicker',
            ixMulti: true,
            ixValueField: 'name',
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            ixView: 'app-user-lookup'
        }, {
            fieldLabel: '电话',
            bind: '{user.mobilePhone}',
            reference: 'mobilePhone'
        }, {
            fieldLabel: '密码',
            bind: '{user.password}',
            reference: 'password'
        }, {
            fieldLabel: '名称',
            bind: '{user.userName}',
            reference: 'userName'
        }, {
            fieldLabel: '确认',
            reference: 'repwd'
        }, {
            fieldLabel: 'Multi',
            xtype: 'ixmulticombo',
            ixBit: true,
            valueField: 'value',
            displayField: 'text',
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            },
            listeners: {
                change: function (item, newValue, oldValue, eOpts) {
                    //iExt.Toast.ixInfo(item.getValue());
                    Ext.defer(iExt.Toast.ixInfo, 100, null, [item.getValue()]);
                }
            }
        }, {
            fieldLabel: 'LookupField',
            xtype: 'ixlookupfield',
            ixMulti: true,
            ixValueField: 'name',
            ixLinkItems: [{
                dataIndex: 'name',
                ref: 'userName'
            }, {
                dataIndex: 'email',
                ref: 'mobilePhone'
            }],
            ixView: 'app-user-lookup'
        }]
    }

});