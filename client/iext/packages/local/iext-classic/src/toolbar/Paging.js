/**
 * @class iExt.toolbar.Paging
 * @extends {Ext.toolbar.Paging} 
 * @classdesc HFX前端框架工具栏控件。
 */
Ext.define('iExt.toolbar.Paging', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.ixpagetbr',

    requires: [
        'Ext.form.Label'
    ],

    cls: 'ix-page-tbr',
    dock: 'bottom',
    displayInfo: true,

    defaults: {
        tooltipType: 'title'
    },

    config: {
        /**
         * 数据源
         */
        ixStore: null
    },
    
    /**
     * 上次更新时间
     */
    ixLastInfo: true,

    applyIxStore: function (ixstore) {
        if (ixstore) {
            var me = this,
                store;
            if (Ext.isString(ixstore)) {
                // 绑定的数据源
                me.setBind({
                    store: ixstore
                });
            } else if (Ext.isObject(ixstore)) {
                // 指定的数据源
                me.store = ixstore;
            }
            if (me.ixLastInfo === true) {
                me.on('change', iExt.toolbar.Paging.ixOnChange);
            }
        }
        return ixstore;
    },

    /**
     * 添加自定义的组件
     */
    beforeRender: function () {
        var me = this;
        me._ixAddItems();
        me.callParent(arguments);
    },

    privates: {

        /**
         * 添加自定义的组件
         */
        _ixAddItems: function () {
            var me = this,
                idx = me.items.length;
            if (me.ixLastInfo === true) {
                // 显示提示信息时才添加更新时间
                // 有一个toolbarFill控件
                idx = idx - 2;
                me.__ixSeperator = me.insert(idx, '-');
                idx++;
                me.__ixLabel = me.insert(idx, {
                    xtype: 'label',
                    text: ''
                });
                iExt.toolbar.Paging.ixOnChange(me, null, null);
            }
        }

    },

    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '__ixSeperator', '__ixLabel');
    },

    statics: {

        /**
         * 更新最后获取数据的时间
         */
        ixOnChange: function (item, pageData, eOpts) {
            if (item.__ixLabel) {
                var d = new Date();
                var text = '最后更新 ' + Ext.util.Format.date(d, 'Y-m-d H:i:s');
                item.__ixLabel.setText(text);
            }
        }
    }

});