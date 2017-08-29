/**
 * @class iExt.grid.Panel
 * @extends {Ext.grid.Panel} 
 * @classdesc GridPanel基础类。
 */
Ext.define('iExt.tool.Console', {
    extend: 'iExt.window.Window',
    alias: 'widget.ixconsole',

    requires: [
        'iExt.tool.Widget',
        'iExt.tool.Runtime'
    ],

    title: '应用控制台',
    layout: 'fit',
    modal: true,
    width: 800,
    height: 600,
    closeAction: 'hide',
    maximizable: true,

    items: [{
        xtype: 'ixtabpanel',
        items: [{
            xtype: 'ixwidget'
        }, {
            xtype: 'ixruntimegrid'
        }]
    }],
    
    buttons: [{
        text: '取消',
        minWidth: 120,
        listeners: {
            click: function (item, e, eOpts) {
                item.up('window').hide();
            }
        }
    }],

    initComponent: function () {
        var me = this;
        me.addCls('x-selectable');
        me.callParent();
    }

});