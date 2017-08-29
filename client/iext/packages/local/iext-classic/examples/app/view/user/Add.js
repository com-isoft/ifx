Ext.define('app.view.user.Add', {
    extend: 'iExt.app.view.container.Form',
    xtype: 'app-user-add',

    requires: [],

    title: '新建用户',

    tbar: {
        xtype: 'toolbar',
        items: [{
            text: '编辑',
            iconCls: 'x-fa fa-edit',
            listeners: {
                click: function () {
                    var win = Ext.create({
                        xtype: 'ixwin',
                        title: '工具栏按钮',
                        header: {
                            items: [{
                                xtype: 'toolbar',
                                items: [{
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    text: '按钮'
                                }, {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    text: 'other'
                                }]
                            }]
                        },
                        width: 600,
                        height: 450
                    });
                    win.show();
                }
            }
        }, {
            text: '保存',
            iconCls: 'x-fa fa-save',
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
                click: function () {
                    var win = Ext.create({
                        xtype: 'ixwin',
                        title: '组合按钮',
                        header: {
                            items: [{
                                xtype: 'segmentedbutton',
                                items: [{
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    text: '按钮'
                                }, {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    text: 'other'
                                }]
                            }]
                        },
                        width: 600,
                        height: 450
                    });
                    win.show();
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
        }, '->']
    },

    items: [{
        xtype: 'ixform',
        layout: 'column',
        header: false,
        width: 750,
        bodyPadding: '5 10 0 10',
        defaultType: 'textfield',
        defaults: {
            columnWidth: 0.5,
            margin: 10
        },

        tbar: {
            xtype: 'ixformheader',
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'segmentedbutton',
                allowToggle: false,
                defaults: {
                    scale: 'large',
                    width: 150
                },
                items: [{
                    xtype: 'ixstatbtn',
                    iconCls: 'x-fa fa-plus',
                    text: 'Activities',
                    value: 100,
                    listeners: {
                        click: function (item, e, eOpts) {
                            item.setText('new text');
                            item.setValue(200);
                        }
                    }
                }, {
                    xtype: 'ixactbtn',
                    text: 'status',
                    ixBadgeText: '900',
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
                    iconCls: 'x-fa fa-search',
                    listeners: {
                        click: function (item, e, eOpts) {
                            //var data = item.getIxAlign().ixGetAlignData();
                            item.fireEvent('ixopenview', item, 'app-user-edit', {
                                target: iExt.action.ViewTarget.MAIN
                            });
                        }
                    }
                }]
            }]
        },

        items: [{
                xtype: 'ixtext',
                ixScale: 'large',
                fieldLabel: '代码',
                bind: '{user.code}',
                reference: 'code',
                allowBlank: false
            },
            {
                xtype: 'ixtext',
                ixScale: 'medium',
                fieldLabel: '姓名',
                bind: '{user.name}',
                reference: 'name',
                allowBlank: false
            },
            {
                fieldLabel: '电话',
                bind: '{user.mobilePhone}',
                reference: 'mobilePhone',
                allowBlank: false
            },
            {
                fieldLabel: '名称',
                labelAlign: 'right',
                bind: '{user.userName}',
                reference: 'userName'
            },
            {
                fieldLabel: '密码',
                bind: '{user.password}',
                reference: 'password'
            },
            {
                fieldLabel: '确认',
                reference: 'repwd'
            }
        ]
    }]

});