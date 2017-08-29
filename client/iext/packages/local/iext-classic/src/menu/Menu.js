/**
 * @class iExt.menu.Menu
 * @extends {Ext.menu.Menu} 
 * @classdesc 用户操作菜单。
 */
Ext.define('iExt.menu.Menu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.ixactmenu',

    defaults: {
        xtype: 'ixactitem'
    },
    shadow: false

});