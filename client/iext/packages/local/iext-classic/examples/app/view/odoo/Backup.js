Ext.define('app.view.odoo.Back', {
    extend: 'iExt.app.view.container.List',
    xtype: 'app-odoo-back',

    requires: [
        'iExt.toolbar.Indexer',
        'iExt.form.field.TagLabel',
        'iExt.form.field.TagSearch',
        'iExt.meta.Types'
    ],
    controller: 'odoo',
    viewModel: 'odoo',
    title: '用户',

    tbar: {
        xtype: 'container',
        layout: 'column',
        items: [{
            xtype: 'toolbar',
            columnWidth: 0.5,
            items: [{
                text: '新建',
                iconCls: 'x-fa fa-plus',
                listeners: {
                    click: 'onAdd'
                }
            }, {
                text: '编辑',
                iconCls: 'x-fa fa-edit',
                listeners: {
                    click: function () {
                        var win = Ext.create({
                            xtype: 'ixwin',
                            title: {
                                xtype: 'toolbar',
                                items: [{
                                    xtype: 'tbtext',
                                    text: '文本'
                                }, '->', {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    text: '按钮'
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
                        Ext.Msg.confirm('系统更新', '系统存在新的版本，是否重新加载？',
                            function (choice) {
                                if (choice === 'yes') {

                                }
                            }
                        );
                    }
                }
            }, '->', {
                text: '操作',
                menuAlign: 'tc-bc',
                menu: {
                    xtype: 'menu',
                    shadow: false,
                    items: [{
                        text: '启用'
                    }, {
                        text: '停用'
                    }, {
                        text: '审批'
                    }]
                }
            }, '->', {
                xtype: 'segmentedbutton',
                items: [{
                    iconCls: 'x-fa fa-line-chart'
                }, {
                    iconCls: 'x-fa fa-calendar'
                }, {
                    iconCls: 'x-fa fa-th-large'
                }, {
                    iconCls: 'x-fa fa-list'
                }]
            }]
        }, {
            xtype: 'toolbar',
            columnWidth: 0.5,
            items: [{
                xtype: 'ixtagsearch',
                flex: 1,
                store: {
                    type: 'ixenumsstore',
                    ixEnumType: 'iExt.meta.Types'
                }
            }]
        }]
    },

    items: [{
        xtype: 'app-user-list',
        ixMulti: false,
        listeners: {
            selectionchange: 'onSelectionChange',
            itemdblclick: 'onItemClick'
        }

    }]

});