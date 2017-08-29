/**
 * @class iExt.menu.Item
 * @extends {Ext.menu.Item} 
 * @classdesc 用户操作菜单项。
 */
Ext.define('iExt.menu.Item', {
    extend: 'Ext.menu.Item',
    alias: 'widget.ixactitem',

    mixins: [
        'iExt.mixin.Action'
    ],

    autoRender: true,

    initComponent: function () {
        var me = this;
        me._ixText = me.config.text;
        me.callParent();
    },

    /**
     * 扩展获取菜单项文本
     * Ext 框架未提供获取文本的方法
     */
    ixGetText: function () {
        return this._ixText;
    }

});