/**
 * @class iExt.toolbar.Holder
 * @extends {Ext.button.Button} 
 * @classdesc 工具栏的占位控件，对于只有标题的工具栏，高度会有影响。
 */
Ext.define('iExt.toolbar.Holder', {
    extend: 'Ext.button.Button',
    alias: 'widget.ixtbrholder',

    requires: [],

    cls: 'ix-tbr-holder',
    scale: 'medium',

    initComponent: function () {
        var me = this;
        me.setDisabled(true);
        me.callParent(arguments);
    }

});