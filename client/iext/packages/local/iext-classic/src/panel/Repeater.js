/**
 * @class iExt.panel.Repeater
 * @extends {Ext.panel.Panel} 
 * @classdesc 组件重复器。
 * 可以根据 store 的数据重复指定的组件
 * 可以处理该组件的下列事件控制组件的添加
 * beforeadd：添加前，如果返回false则阻止该组件的添加
 * add：
 * added：
 */
Ext.define('iExt.panel.Repeater', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixrepeater',

    cls: 'ix-repeater-panel',
    bodyCls: 'ix-repeater-body',

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15
    },

    config: {
        /**
         * 数据源 {Object}
         * 数据源对象{type: ''}
         */
        ixStore: null
    },

    /**
     * 分页大小
     * 0 表示不分页
     */
    ixPageSize: null,

    /**
     * 要重复的组件
     * 缺省使用 Ext.Component
     */
    ixComponent: null,

    scrollable: 'y',

    defaults: {
        xtype: 'box',
        minHeight: 80
    },

    constructor: function (config) {
        var me = this;
        if (Ext.isEmpty(me.ixPageSize)) {
            me.ixPageSize = me.ixTheme.pageSize;
        }
        me.callParent();
    },

    initComponent: function () {
        var me = this,
            store = me.getIxStore();

        if (store && me.ixPageSize > 0) {
            if (me.bbar) {
                Ext.apply(me.bbar, {
                    ixStore: store
                });
            } else {
                me.bbar = {
                    xtype: 'ixpagetbr',
                    ixStore: store
                };
            }
        }
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this,
            store = me.getIxStore();
        var records = store.getRange(0);
        me.callParent(arguments);
        me._ixRenderItems(records);
    },

    applyIxStore: function (store) {
        var me = this;
        if (Ext.isObject(store)) {
            // 指定的数据源
            store = Ext.apply(store, {
                pageSize: me.ixPageSize
            });
            store = Ext.data.StoreManager.lookup(store || 'ext-empty-store');
        }
        store.on('load', me._ixOnDataLoad, me);
        return store;
    },

    privates: {

        _ixOnDataLoad: function (store, records, successful, operation, eOpts) {
            if (successful) {
                this._ixRenderItems(records);
            }
        },

        _ixRenderItems: function (records) {
            var me = this,
                record,
                cmp = me.ixComponent;

            Ext.suspendLayouts();
            me.removeAll(true);
            Ext.each(records, function (record) {
                Ext.apply(cmp, {
                    viewModel: {
                        data: record.data
                    }
                });
                me.add(cmp);
            });
            Ext.resumeLayouts(true);
        }
    }

});