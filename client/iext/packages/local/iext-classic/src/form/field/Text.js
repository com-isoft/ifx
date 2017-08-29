/**
 * @class iExt.form.field.Text
 * @extends {Ext.form.field.Text} 
 * @classdesc iExt 输入控件。
 */
Ext.define('iExt.form.field.Text', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixtext',

    config: {
        /**
         * 输入框规格
         * {String} 'larger/medium/small'
         */
        ixScale: undefined
    },

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        if (scale) {
            me.userCls = 'ix-' + scale;
        }
        if (me.allowBlank === false && !me.emptyText && me.fieldLabel) {
            me.emptyText = '请输入' + me.fieldLabel;
        }
        me.callParent(arguments);
    },

    applyIxScale: function (scale) {
        return scale;
    }

});