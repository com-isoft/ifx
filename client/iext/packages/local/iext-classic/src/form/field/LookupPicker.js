/**
 * @class iExt.form.field.LookupPicker
 * @extends {Ext.form.field.Picker}
 * @classdesc iExt 下拉列表单选参照组件。
 */
Ext.define('iExt.form.field.LookupPicker', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.ixlookuppicker',

    cls: 'ix-lookup-picker',

    mixins: [
        'iExt.mixin.Linkable'
    ],

    config: {
        /**
         * 参照视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal'
    },

    defaultListConfig: {
        cls: 'ix-picker'
    },

    initComponent: function () {
        var me = this;
        me.setIxMulti(false);
        me.callParent(arguments);
    },

    createPicker: function () {
        var me = this,
            picker, pickerCfg ,
            view = me.getIxView(),
            scale = me.getIxScale();

        if (Ext.isString(view)) {
            view =   {
                xtype: view,
                ixMulti: false,
                listeners: {
                    ixselection: {
                        fn: me._ixOnSelection,
                        scope: me
                    }
                }
            };
        } else {
            view = Ext.apply(view, {
                ixMulti: false
            });
        }

        var listConfig = me.listConfig || {},
            size = iExt.View.ixGetScaleSize('lookup', scale);

        if (size) {
            listConfig = Ext.applyIf(listConfig, {
                minWidth: size.width,
                maxHeight: size.maxHeight
            });
        }
        view = Ext.apply(view, {
            floating: true,
            header: false,
            shadow: false
        });

        pickerCfg  = Ext.apply(view, listConfig, me.defaultListConfig);
        picker  =  me.picker  =  Ext.widget(pickerCfg);

        return picker;
    },

    privates: {

        /**
         * 数据选择事件处理
         */
        _ixOnSelection: function (sm, records) {
            var me = this;
            me.ixSetLinkValues(records, false);
        }
    }

});