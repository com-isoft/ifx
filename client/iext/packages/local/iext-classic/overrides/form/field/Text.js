/**
 * @class Ext.overrides.form.field.Text
 * @override {Ext.form.field.Text} 
 * @classdesc 设置必须输入框的Trigger样式。
 */
Ext.define('Ext.overrides.form.field.Text', {
    override: 'Ext.form.field.Text',

    initComponent: function () {
        var me = this;
        if (me.allowBlank === false) {
            for (var p in me.triggers) {
                if (me.triggers.hasOwnProperty(p)) {
                    var trigger = me.triggers[p];
                    trigger.extraCls = me.requiredCls;
                }
            }
        }
        me.callParent(arguments);
    }

});