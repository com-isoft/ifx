/**
 * @class iExt.form.field.Picker
 * @extends {iExt.form.field.Picker} 
 * @classdesc iExt 筛选条件控件。
 */
Ext.define("iExt.form.field.Picker", {
    extend: "Ext.form.field.Picker",
    alias: "widget.ixpicker",

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    matchFieldWidth: false,

    /**
     * 可配置主题
     */
    ixTheme: {
        /**
         * 对于分页的组件最小的宽度
         * 保证分页工具栏能够正常显示
         */
        pickerMinWidth: 400
    },

    config: {
        /**
         * 下拉组件。注意组件的样式，picker本身已经配置了边框。
         * {String|Object} 组件类型名称或者组件对象
         */
        ixWidget: null
    },

    /**
     * 下拉组件的配置
     * 参见 {Ext.form.field.Tag} listConfig 属性
     */
    ixPickerConfig: null,

    /**
     * 下拉组件缺省配置。
     * 用于配置创建下拉组件的样式。
     * 参见 {Ext.form.field.Tag} defaultListConfig 属性
     */
    ixDefaultPickerConfig: {
        cls: 'ix-picker',
        minWidth: 70,
        minHeight: 70,
        maxHeight: 300
    },

    matchFieldWidth:  true,

    initComponent: function () {
        var me = this;

        me.callParent();
    },

    applyIxWidget: function (widget) {
        var me = this;
        if (me.picker && widget) {
            if (me.picker.rendered) {
                me.picker.removeAll(true);
                me.picker.add(widget);
            }
        }
        return widget;
    },

    /**
     * 重载创建下拉组件
     */
    createPicker: function () {
        var me = this,
            picker, pickerCfg,
            pickerConfig = me.ixPickerConfig || {},
            cmp = me.getIxWidget();
        if (!cmp) {
            // 缺省使用 panel 组件
            pickerCfg = {
                xtype: 'panel'
            };
        } else {
            if (Ext.isString(cmp)) {
                pickerCfg = {
                    xtype: cmp
                };
            } else if (Ext.isObject(cmp)) {
                pickerCfg = cmp;
            }
        }
        pickerCfg = Ext.apply(pickerCfg, {
            renderTo: document.body,
            // 下拉组件可以通过该属性获取到本组件
            pickerField: me,
            hidden: true,
            floating: true,
            shadow: false
        });

        pickerCfg = Ext.apply(pickerCfg, pickerConfig, me.ixDefaultPickerConfig);
        picker = me.picker = Ext.widget(pickerCfg);

        return picker;
    }

});