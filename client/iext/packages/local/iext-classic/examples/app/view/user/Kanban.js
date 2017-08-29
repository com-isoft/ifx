Ext.define('app.view.user.Kanban', {
    extend: 'iExt.panel.Kanban',
    xtype: 'app-user-kanban',

    requires: [
        'app.enums.UserStatus'
    ],

    title: '用户看板',
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
                    item.fireEvent('ixopenview', item, 'app-user-list', {
                        target: iExt.action.ViewTarget.MAIN
                    });
                }
            },
            ixViewName: 'app-user-add'
        }, {
            text: '修改'
        }]
    },

    ixStages: 'app.enums.UserStatus',
    /*
    ixStages: {
        1: 'inactive',
        2: 'active'
    },
    */
    ixStageField: 'status',
    //ixStageMinWidth: 350,
    ixCollapsible: true,
    ixStore: {
        type: 'user'
    },

    ixItemConfig: {
        minHeight: 80,
        style: {
            borderRadius: '2px'
        }
    },
    ixItemTpl: '<span style="float:left;"><img style="width:68px;height:68px;" /></span>' +
        '<span style="float:left;margin-left:10px;">' +
        '<div style="font-size:16px;font-weight:bold;margin-bottom:15px;' +
        '<tpl if="status==1">color:#7a3737;' +
        '<tpl elseif="status==2">color:#756832;' +
        '<tpl elseif="status==4">color:#5d6937;' +
        '<tpl elseif="status==8">color:#1a5d83;' +
        '</tpl>">{name}</div><div>{phone}</div><div>{email}</div></span>',

    listeners: {
        ixitemclick: function (kanban, item, data) {
            iExt.Toast.ixInfo(data.name);
        }
    }

});