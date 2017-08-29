Ext.define('app.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.toolbar.Fill',
        'app.view.main.Apps',
        'app.view.main.MainController',
        'app.view.user.User'
    ],
    controller: 'main',

    layout: 'border',
    tbar: {
        xtype: 'ixappheader',
        reference: 'tbrMain',
        items: [{
            iconCls: 'x-fa fa-th',
            scale: 'large',
            hidden: true,
            listeners: {
                click: 'onSelectApp'
            }
        }, '->', {
            xtype: 'ixportrait'
        }, {
            text: 'administrator',
            menuAlign: 'tr-br',
            menu: {
                ui: 'ix-app-menu-ui',
                shadow: false,
                items: [{
                    text: '修改口令'
                }, {
                    text: '安全退出'
                }]
            }
        }]
    },

    items: [{
        xtype: 'ixquickcontainer',
        region: 'east',
        hidden: false,
        width: 240
    }, {
        xtype: 'container',
        region: 'center',
        reference: 'wsMain',
        layout: 'auto',
        items: [{
            xtype: 'app-apps',
            listeners: {
                ixappchange: 'onAppChange'
            },
            hidden: true
        }, {
            xtype: 'app-user'
        }]
    }]
});
