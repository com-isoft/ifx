/**
 * @class iExt.form.field.Date
 * @extends {Ext.form.field.Date}
 * @classdesc 日期输入项控件的基础类。主要用于自动设置日期格式。
 */
Ext.define('iExt.form.field.Date', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.ix-datefield',

    config: {
        /**
         * 日期类型
         * {iExt.meta.ixtype.Date}
         */
        ixType: 'date'
    },

    applyIxType: function (type) {
        if (Ext.isString(type)) {
            type = iExt.meta.ixtype.Date.ixGetValue(type.toUpperCase());
        }
        return type;
    },

    initComponent: function () {
        var me = this, type = me.getIxType();
        switch (type) {
            case iExt.meta.ixtype.Date.DATETIME:
                me.format = 'Y-m-d H:i:s';
                break;
            case iExt.meta.ixtype.Date.TIME:
                me.format = 'H:i';
                break;
            default:
                me.format = 'Y-m-d';
                break;
        }
        if (me.readOnly === true) {
            me.hideTrigger = true;
        }
        me.callParent(arguments);
    }

});