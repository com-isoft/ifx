/**
 * @class iExt.toolbar.List
 * @extends {iExt.toolbar.Action} 
 * @classdesc 列表工具栏控件。
 */
Ext.define('iExt.toolbar.List', {
    extend: 'iExt.toolbar.Action',
    alias: 'widget.ixlisttbr',

    requires: [],

    cls: 'ix-list-tbr',

    initComponent: function () {
        var me = this;
        me.callParent();
    }

});