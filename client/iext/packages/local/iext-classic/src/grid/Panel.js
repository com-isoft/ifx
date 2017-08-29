/**
 * @class iExt.grid.Panel
 * @extends {Ext.grid.Panel} 
 * @classdesc GridPanel基础类。
 */
Ext.define('iExt.grid.Panel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ixgrid',

    cls: 'ix-grid',

    requires: [
        'Ext.ux.PreviewPlugin',
        'iExt.grid.column.Column',
        'iExt.toolbar.Paging'
    ],

    mixins: [
        'iExt.mixin.ListView'
    ],

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15
    },

    config: {
        /**
         * 如果用户未设置 ixPageSize，将不调用 applyIxPageSize 方法
         * 正常情况下，可以通过 config 设置缺省值，但是为了支持主题设置
         * 通过 ixTheme 来设置缺省值，导致该问题的出现。
         * 所以在构造函数 constructor 中设置缺省值。
         * ixPageSize:15, 
         */

        /**
         * 缺省不使用单元格焦点样式。
         * 但是对于有些情况，例如：可以选择单元格时则需要使用。
         */
        ixFocus: false,

        /**
         * 需要预览的字段，对于大文本内容可以采用此方式显示数据
         */
        ixPreviewField: null
    },

    columnLines: false,
    headerBorders: true,
    viewConfig: {
        // 允许选择文本
        //enableTextSelection: true
    },

    defaults: {
        xtype: 'ixcol'
    },

    /**
     * 分页栏缺省配置
     */
    ixPagingConfig: {
        displayInfo: true,
        ixLastInfo: true
    },

    ixListType: 'list',

    initComponent: function () {
        var me = this,
            ixstore = me.getIxStore();

        if (Ext.isEmpty(me.ixPageSize)) {
            me.ixPageSize = me.ixTheme.pageSize;
        }

        if (ixstore) {
            var store;
            if (Ext.isString(ixstore)) {
                // 绑定的数据源
                me.setBind({
                    store: ixstore
                });
                store = ixstore;
            } else if (Ext.isObject(ixstore)) {
                // 指定的数据源
                ixstore = Ext.apply(ixstore, {
                    pageSize: me.ixPageSize
                });
                var filters = me.getIxFilters();
                if (filters) {
                    ixstore.filters = filters;
                }
                store = Ext.data.StoreManager.lookup(ixstore || 'ext-empty-store');
                me.store = store;
            }

            // 设置分页栏
            if (store && me.ixPageSize > 0) {
                if (me.bbar) {
                    Ext.apply(me.bbar, {
                        ixStore: store
                    }, me.ixPagingConfig);
                } else {
                    me.bbar = Ext.apply({
                        xtype: 'ixpagetbr',
                        ixStore: store
                    }, me.ixPagingConfig);
                }
            }
        }

        var qv = me.getIxQuickView();
        if (qv) {
            me.on('itemclick', me._ixOnItemClick, me);
        }
        me.callParent(arguments);
    },

    /**
     * 重载Ext.grid.Panel的bindStore方法，
     * 以便根据ixPageSize设置store的pageSize。
     * @memberOf iExt.grid.Panel#
     * @param {Ext.data.Store} store 数据源对象。
     * @param {boolean} initial 是否初始化。
     */
    bindStore: function (store, initial) {
        var me = this;
        if (store) {
            store.setPageSize(me.ixPageSize);
        }
        me.callParent(arguments);
    },

    applyIxMulti: function (multi) {
        var me = this;
        if (multi !== undefined) {
            me.selModel = {
                type: 'checkboxmodel',
                mode: multi === true ? 'MULTI' : 'SINGLE',
                // 只允许使用 checkbox 选择
                // checkOnly: true,
                listeners: {
                    selectionchange: {
                        fn: me.ixOnSelectionChange,
                        scope: me
                    }
                }
            };
        }
        return multi;
    },

    applyIxFocus: function (focus) {
        var me = this;
        if (focus === false) {
            me.userCls = 'ix-grid-no-focus';
        }
        return focus;
    },

    /**
     * 设置预览字段
     */
    applyIxPreviewField: function (field) {
        if (field) {
            var me = this,
                plugin = me.getPlugin('preview');
            if (!plugin) {
                me.plugins = me.plugins || [];
                me.plugins.push({
                    ptype: 'preview',
                    bodyField: field,
                    pluginId: 'preview'

                });
            }
        }
        return field;
    },

    /**
     * 获取选择的数据
     */
    ixGetSelectedData: function () {
        var data = this.view.getSelection();
        return data;
    },

    /**
     * 刷新视图数据。
     * @memberOf iExt.grid.Panel#
     */
    ixRefresh: function () {
        var me = this,
            store = me.getStore();
        if (store) {
            store.reload({
                callback: function (records, operation, success) {
                    if (success === true) {
                        var selModel = me.getSelectionModel();
                        //var selections = me.getView().getSelection();
                        //me.ixOnSelectionChange(selModel, selections);
                        selModel.clearSelections();
                        me.ixOnSelectionChange(selModel, []);
                    }
                }
            });
        }
    },

    /**
     * 执行搜索
     * @param {Object}  filters 搜索条件
     */
    ixSearch: function (filters) {
        var me = this,
            store = me.getStore(),
            _filters = null;

        if (store) {
            store.clearFilter(true);
            // 需要处理缺省的搜索条件
            _filters = filters;

            if (Ext.isObject(_filters)) {
                store.filter(_filters);
            } else if (Ext.isArray(_filters) && _filters.length > 0) {
                store.filter(_filters);
            } else {
                store.load();
            }
            var selModel = me.getSelectionModel();
            selModel.clearSelections();
            me.ixOnSelectionChange(selModel, []);
        }
    },

    /**
     * 数据选择变更事件处理
     * 为了统一列表组件，触发自定义的事件
     */
    ixOnSelectionChange: function (sm, selections) {
        if (this.hasListeners.ixselection) {
            this.fireEvent('ixselection', this, selections);
        }
    },

    privates: {

        /**
         * 快速查看
         */
        _ixOnItemClick: function (view, record, item, index, e, eOpts) {
            var me = this,
                qv = me.getIxQuickView();
            if (qv) {
                me.fireEvent('ixopenview', me, qv, {
                    target: iExt.action.ViewTarget.QUICK,
                    viewConfig: {
                        ixRecord: record
                    }
                });
            }
        }
    }

});