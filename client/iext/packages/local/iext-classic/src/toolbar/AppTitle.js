/**
 * @class iExt.toolbar.AppTitle
 * @extends {Ext.toolbar.TextItem} 
 * @classdesc 标题控件。对于只有标题的工具栏，高度会有影响，可以配合iExt.toolbar.Holder使用。
 */
Ext.define('iExt.toolbar.AppTitle', {
    extend: 'Ext.toolbar.TextItem',
    alias: 'widget.ixapptitle',

    requires: [],

    config: {
        ixScale: 'medium'
    },

    margin: '0 20 0 0',

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        me.addCls('ix-app-title-' + scale);
        me.callParent();
    }

});