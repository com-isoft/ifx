Ext.define('app.view.odoo.View', {
    extend: 'iExt.panel.View',
    xtype: 'app-odoo-view',

    requires: [
        'app.enums.UserStatus'
    ],

    title: '用户视图',
    controller: {
        type: 'ixlist'
    },

    ixQuickView: 'ixqvform',
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