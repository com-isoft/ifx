/**
 * @class Ext.overrides.ux.TabCloseMenu
 * @override {Ext.ux.TabCloseMenu} 
 * @classdesc 设置Tab关闭菜单的最小宽度。
 */
Ext.define('Ext.overrides.ux.TabCloseMenu', {
    override: 'Ext.ux.TabCloseMenu',

    createMenu: function () {
        var menu = this.callParent();
        if (menu) {
            menu.setWidth(150);
        }
        return menu;
    }

});