Ext.define('app.view.user.View', {
    extend: 'iExt.panel.View',
    xtype: 'app-user-view',

    requires: [
        'app.enums.UserStatus'
    ],

    title: '用户视图',
    controller: {
        type: 'ixlist'
    },

    tbar: {
        xtype: 'ixacttbr',
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
                    item.fireEvent('ixopenview', item, 'app-user-kanban', {
                        target: iExt.action.ViewTarget.MAIN
                    });
                }
            },
            ixViewName: 'app-user-add'
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
        }]
    },

    ixStore: {
        type: 'user'
    },

    ixViewConfig: {
        ixCols: 3,
        itemTpl: '<span style="float:left;"><img style="width:68px;height:68px;" /></span>' +
            '<span style="float:left;margin-left:10px;">' +
            '<div style="font-size:16px;font-weight:bold;margin-bottom:15px;' +
            '<tpl if="status==1">color:#7a3737;' +
            '<tpl elseif="status==2">color:#756832;' +
            '<tpl elseif="status==4">color:#5d6937;' +
            '<tpl elseif="status==8">color:#1a5d83;' +
            '</tpl>">{name}</div><div>{phone}</div><div>{email}</div></span>'
    },

    listeners: {
        ixselection: function (sm, selections) {
            //iExt.Toast.ixInfo(selections.length);
        }
    }

});