Ext.define('app.view.odoo.Kanban', {
    extend: 'iExt.panel.Kanban',
    xtype: 'app-odoo-kanban',

    requires: [
        'app.enums.UserStatus'
    ],

    title: '用户看板',
    controller: {
        type: 'ixlist'
    },

    ixQuickView: 'ixqvform',
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
        ixitemclick: function (kanban, item, record) {
            iExt.Toast.ixInfo(record.get('id') + '-' + record.get('name'));
        }
    }

});