/**
 * @class iExt.button.Segmented
 * @extends {Ext.button.Segmented} 
 * @classdesc 分组控件。
 */
Ext.define('iExt.button.Segmented', {
    extend: 'Ext.button.Segmented',
    alias: 'widget.ixactsbtn',

    mixins: [
        'iExt.mixin.Action'
    ],

    defaults: {
        xtype: 'ixactbtn'
    },

    config: {
        /**
         * 枚举类型名称
         */
        ixEnumType: null,
        /**
         * 值
         */
        ixValue: null
    },

    /**
     * 更新枚举类型
     */
    updateIxEnumType: function (type, oldType) {
        var me = this;

        if (type) {
            var enums = Ext.ClassManager.get(type);
            if (enums) {
                var list = enums.ixList();
                if (me.rendered) {
                    me.removeAll();
                    Ext.each(list, function (item, index) {
                        me.add({
                            text: item.text,
                            value: item.value
                        });
                    });
                } else {
                    me.items = [];
                    Ext.each(list, function (item, index) {
                        me.items.push({
                            text: item.text,
                            value: item.value
                        });
                    });
                }
            } else {
                Ext.raise('指定的枚举类型 [' + type + '] 不存在!');
            }
        }
        return type;
    },

    /**
     * 更新值
     */
    updateIxValue: function (value, oldValue) {
        var me = this, btn = null;
        if (me.rendered && value) {
            me._ixSetValue(value);
        }
    },

    initComponent: function () {
        var me = this;

        me.callParent();
    },

    afterRender: function () {
        var me = this, value = me.getIxValue();
        me.callParent();
        me._ixSetValue(value);
    },

    privates: {

        /**
         * 根据值查找指定的按钮，设置按钮的pressed为true
         */
        _ixSetValue: function (value) {
            var me = this;
            if (value) {
                me.items.each(function (item, index) {
                    if (item.getValue() === value) {
                        btn = item;
                        return false;
                    }
                });
                if (btn) {
                    // 设置按钮的pressed属性会触发 toggle 事件
                    btn.setPressed(true);
                }
            }
        }
    }

});