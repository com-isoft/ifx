/**
 * @class Ext.overrides.button.Button
 * @override {Ext.button.Button} 
 * @classdesc 设置按钮的提示方式，使用 title 方式。
 */
Ext.define('Ext.overrides.button.Button', {
    override: 'Ext.button.Button',

    tooltipType: 'title'

});