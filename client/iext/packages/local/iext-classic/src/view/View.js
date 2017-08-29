/**
 * @class iExt.view.View
 * @extends {Ext.view.View} 
 * @classdesc 列表数据视图类。
 */
Ext.define('iExt.view.View', {
    extend: 'Ext.view.View',
    alias: 'widget.ixdataview',

    userCls: 'ix-data-view',

    requires: [],

    /**
     * 因为dataview不支持分页，所以不需要设置 ixStore 配置属性
     */
    config: {
        /**
         * 缺省使用复选，如果不想使用选择器，
         * 可以设置为 undefined
         */
        ixMulti: true,
        /**
         * 数据项是否使用边框
         */
        ixItemBorder: true,
        /**
         * 列数
         */
        ixCols: 4,
        /**
         * 最小宽度
         * TODO: 自动调整列数
         */
        ixMinWidth: null,
        /**
         * 快速查看视图名称
         */
        ixQuickView: null
    },

    /**
     * 目前在处理尺寸变更时，对于滚动条的处理还有些问题
     * 所以先采用固定滚动条，还可以处理最小宽度
     */
    scrollable: {
        y: 'scroll'
    },

    trackOver: true,
    padding: '5 5 5 5',
    itemSelector: 'div.ix-view-item',
    itemCls: 'ix-view-item',
    overItemCls: 'ix-view-item-over',
    selectedItemCls: 'ix-view-item-selected',

    loadMask: {
        cls: 'ix-view-mask'
    },

    applyIxItemBorder: function (border) {
        var me = this;
        if (border === true) {
            me.removeCls('ix-view-noborder');
        } else {
            me.addCls('ix-view-noborder');
        }
        return border;
    },

    constructor: function (config) {
        // dataview 在构造时设置 selectionModel
        var multi = true;
        if (config && config.ixMulti) {
            multi = config.ixMulti;
        }
        if (config && !config.selModel) {
            config.selModel = {
                type: 'dataviewmodel',
                mode: multi === true ? 'SIMPLE' : 'SINGLE'
            };
        }
        // 为何使用数组？
        this.callParent([config]);    
    },

    /**
     * 重载初始化控件。
     * @memberOf iExt.view.View#
     */
    initComponent: function () {
        var me = this;
        me.on('resize', me.ixOnResize, me);
        me.on('selectionchange', me.ixOnSelectionChange, me);
        var qv = me.getIxQuickView();
        if (qv) {
            me.on('itemclick', me._ixOnItemClick, me);
        }

        this.callParent();
    },

    /**
     * 重载处理，以便在数据项变更时重新计算宽度
     * 适用的场景是滚动条的问题
     */
    refreshSize: function (forceLayout) {
        // 视图第一次渲染时，还无法获取正常的尺寸
        // 所以视图没有 ready 前，不进行处理
        var bresize = this.viewReady;
        this.callParent(arguments);
        if (bresize) {
            this.ixResizeItems();
        }
    },

    /**
     * 获取选择的数据
     */
    ixGetSelectedData: function () {
        var me = this;
        var data = me.getSelection();
        return data;
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
        }
    },

    /**
     * 根据宽度调整每个数据项的宽度
     */
    ixResizeItems: function () {
        var me = this,
            el = me.getEl();

        // el.query(selector, [asDom]);
        var elItems = el.query('div.' + me.itemCls, false);
        if (elItems.length > 0) {
            var margin = 10,
                cols = me.getIxCols(),
                min = me.getIxMinWidth(),
                size = el.getViewSize();

            var width = size.width - (cols + 1) * margin;
            var itemWidth = Math.floor(width / cols);
            if (itemWidth < min) {
                // TODO: 自动减少列数
            }
            Ext.each(elItems, function (item) {
                item.setWidth(itemWidth);
            });
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

    /**
     * 尺寸变更事件处理
     */
    ixOnResize: function (dataview, width, height, oldWidth, oldHeight, eOpts) {
        //Ext.defer(this.ixResizeItems, 100, this);
        this.ixResizeItems();
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