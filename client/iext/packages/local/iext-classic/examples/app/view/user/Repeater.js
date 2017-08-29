Ext.define('app.view.user.Repeater', {
    extend: 'iExt.panel.Repeater',
    xtype: 'app-user-repeater',

    requires: [
        'app.enums.UserStatus'
    ],

    title: '用户管理',
    bodyPadding: '5 5 5 5',
    controller: {
        type: 'ixlist'
    },

    tbar: {
        xtype: 'toolbar',
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
                    item.fireEvent('ixopenview', item, 'app-user-view', {
                        target: iExt.action.ViewTarget.MAIN
                    });
                }
            },
            ixViewName: 'app-user-add'
        }, {
            text: '修改'
        }]
    },

    layout: 'column',
    ixStore: {
        type: 'user'
    },
    ixPageSize: 4,
    ixComponent: {
        xtype: 'panel',
        columnWidth: 0.5,
        titleAlign: 'center',
        border: true,
        minHeight: 200,
        margin: '5 5 5 5',
        bind: {
            title: '{name}'
        },
        tbar: {
            xtype: 'toolbar',
            items: [{
                iconCls: 'x-fa fa-user',
                listeners: {
                    click: function (item) {
                        var tbr = item.ownerCt;
                        var text = tbr.items.getAt(3);
                        iExt.Toast.ixInfo(text.getBind().text.getValue());
                    }
                }
            }, {
                iconCls: 'x-fa fa-plus'
            }, '->', {
                xtype: 'tbtext',
                bind: {
                    text: '{email}'
                }
            }]
        }
    }

});