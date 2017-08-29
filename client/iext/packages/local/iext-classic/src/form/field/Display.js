/**
 * @class iExt.form.field.Display
 * @extends {Ext.form.field.Display} 
 * @classdesc 显示组件。
 */
Ext.define('iExt.form.field.Display', {
    extend: 'Ext.form.field.Display',
    alias: 'widget.ixdisplay',

    config: {
        /**
         * 输入框规格
         * {String} 'larger/medium/small'
         */
        ixScale: undefined,
        /**
         * 是否用于快速查看
         */
        ixQuick: null
    },

    fieldCls: 'ix-display',

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        if (scale) {
            me.userCls = 'ix-' + scale;
        }
        // 去掉必须输入项的标签样式
        delete me.allowBlank;
        //var value=me.getValue
        me.callParent(arguments);
    },

    /**
     * 设置快速查看
     */
    applyIxQuick: function (quick) {
        if (quick === true) {
            this.labelCls = 'ix-quick-lbl';
        }
        return quick;
    },

    /**
     * 设置快速查看
     */
    setValue: function (value) {
        value = value || '&nbsp;';
        this.callParent(arguments);
    }

});