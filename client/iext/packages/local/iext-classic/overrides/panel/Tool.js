/**
 * @class Ext.overrides.panel.Tool
 * @override {Ext.panel.Tool} 
 * @classdesc 设置Panel标题栏工具的提示方式，使用 title 方式。
 */
Ext.define('Ext.overrides.panel.Tool', {
    override: 'Ext.panel.Tool',

    tooltipType: 'title'

});