/**
 * @mixin iExt.mixin.FilterView
 * @extends {iExt.mixin.View} 
 * @classdesc iExt 筛选条件 MIXIN。
 * 该视图只用于定义筛选条件，并不执行实际的搜索。
 */
Ext.define('iExt.mixin.FilterView', {
    extend: 'iExt.mixin.View',

    requires: [
        'iExt.app.view.Util'
    ],

    mixinConfig: {
        id: 'iext-view-filter'
    },

    ixIsFilterView: true,

    config: {
        /**
         * 缺省的筛选条件配置。
         */
        ixFilters: null
    },

    applyIxFilters: function (filters) {
        if (filters) {
            filters = Ext.clone(filters);
            filters = iExt.Filters.create(filters);
        }
        return filters;
    },

    /**
     * 获取是筛选条件否合法信息。
     */
    ixIsValid: iExt.unimplFn,

    /**
     * 清除搜索条件事件处理。
     * @memberOf iExt.mixin.FilterView#
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixClearFilters: function (item, e, eOpts) {
        var me = this;
        iExt.View.ixClearValues(me);
    },

    /**
     * 获取搜索条件
     */
    ixGetFilters: function () {
        var me = this,
            ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            filters = ixFilters.ixGetFilter(me.getReferences());
        }
        return filters;
    },

    /**
     * 设置搜索条件
     * @param {Object[]} filters 搜索条件
     */
    ixSetFilters: function (filters) {
        var me = this,
            ixFilters = me.getIxFilters();
        if (ixFilters) {
            ixFilters.ixSetFilter(me.getReferences(), filters);
        }
    },

    /**
     * 删除搜索条件
     * @param {Object} filters 搜索条件
     */
    ixRemoveFilter: function (filter) {
        var me = this,
            refs = me.getReferences(),
            extra = filter.extra || {},
            cmp = refs[extra.ref];
        if (cmp) {
            if (cmp.allowBlank === false) {
                return false;
            }
            if (cmp.ixClearable === false) {
                return false;
            }
            cmp.setValue(null);
        }
        return true;
    }

});