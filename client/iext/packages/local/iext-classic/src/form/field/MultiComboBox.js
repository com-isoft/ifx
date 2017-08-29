/**
 * @class iExt.form.field.MultiComboBox
 * @extends {Ext.form.field.ComboBox}
 * @classdesc 下拉复选组件。
 */
Ext.define('iExt.form.field.MultiComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.ixmulticombo',

    cls: 'ix-multi-combo',
    ixBit: true,
    editable: false,
    valueField: 'value',
    displayField: 'text',
    multiSelect: true,
    defaultListConfig: {
        cls: 'ix-picker'
    },

    /**
     * 重载初始化控件。主要是根据HFX配置项的枚举类型，创建绑定的数据源。
     * @memberOf iExt.form.field.MultiComboBox#
     */
    initComponent: function () {
        var me = this;
        me.listConfig = me.listConfig || {};
        me.listConfig.itemTpl = '<span class="ix-multi-item"></span>' +
            '<span>{' + me.displayField + '}</span>';
        me.callParent(arguments);
    },

    /**
     * 重载{Ext.form.field.ComboBox}的setValue方法，
     * 以便根据bitFlag设置控件的选中值。
     * @memberOf iExt.form.field.MultiComboBox#
     * @param {String|String[]} value 值。
     * @param {Boolean} doSelect 是否触发select事件。
     */
    setValue: function (value, doSelect) {
        var me = this;
        if (!Ext.isEmpty(value) && me.ixBit) {
            var values = [];
            if (value > 0) {
                for (var i = 0; i < 32; i++) {
                    if (value <= 0) {
                        break;
                    }
                    var flag = value & Math.pow(2, i);
                    if (flag) {
                        values.push(flag);
                        value -= flag;
                    }
                }
                value = values;
            }
        }
        me.callParent(arguments);
        this.valueCollection.each(function (record) {
            me.selectRecord(record);
        }, me);
    },

    /**
     * 重载{Ext.form.field.ComboBox}的getValue方法，
     * 以便根据bitFlag获取控件的选中值。
     * @memberOf iExt.form.field.MultiComboBox#
     * @return {Number|Object[]} 当前选中的值。
     */
    getValue: function () {
        var me = this,
            value = this.callParent();
        if (Ext.isArray(value)) {
            if (value.length === 0) {
                value = null;
            } else if (me.ixBit) {
                value = Ext.Array.sum(value);
            }
        }
        return value;
    }

});