/**
 * @class iExt.toolbar.FormHeader
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 表单工具栏控件。
 */
Ext.define('iExt.toolbar.FormHeader', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixformheader',

    requires: [],

    cls: 'ix-form-header',
    
    defaults: {
        scale: 'small'
    }

});