/**
 * @class Ext.overrides.form.field.Picker
 * @override {Ext.form.field.Picker} 
 * @classdesc 设置必须输入项的标签样式。
 */
Ext.define('Ext.overrides.form.field.Picker', {
    override: 'Ext.form.field.Picker',

    pickerOffset: [0, 1],
    pickerAlign: 'tl-bl'

});