/**
 * @class Ext.overrides.window.Toast
 * @override {Ext.window.Toast} 
 * @classdesc 设置提示框的最小宽度和高度，以及样式。
 */
Ext.define('Ext.overrides.window.Toast', {
    override: 'Ext.window.Toast',

    minWidth: 400,
    minHeight: 30,
    paddingY: 4,
    shadow: false,

    bodyCls: 'ix-toast-body'

});