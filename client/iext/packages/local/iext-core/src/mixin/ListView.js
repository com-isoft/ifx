/**
 * @mixin iExt.mixin.ListView
 * @extends {iExt.mixin.View} 
 * @classdesc iExt 列表视图 MIXIN。
 */
Ext.define('iExt.mixin.ListView', {
    extend: 'iExt.mixin.View',

    mixinConfig: {
        id: 'iext-view-list'
    },

    ixIsListView: true,

    config: {
        /**
         * 缺省使用复选，如果不想使用选择器，
         * 可以设置为 undefined 。
         */
        ixMulti: true,
        /**
         * 数据源 {String|Object}。
         * String：绑定的数据源。
         * Object：数据源对象{type: ''}。
         */
        ixStore: null,
        /**
         * 列表类型。
         * {iExt.app.view.ListTypes}
         */
        ixListType: 'list',
        /**
         * 缺省搜索条件。
         */
        ixFilters: null,
        /**
         * 快速查看视图名称。
         */
        ixQuickView: null
    },

    /**
     * 分页大小，0 表示不分页。
     */
    ixPageSize: null,

    /**
     * 根据字符串解析枚举值。
     */
    applyIxListType: function (listType) {
        if (Ext.isString(listType)) {
            listType = iExt.app.view.ListTypes.ixGetValue(
                listType.toUpperCase());
        }
        return listType;
    },

    /**
     * 数据选择事件。
     * @memberOf iExt.mixin.ListView#
     * @event ixselection
     * @param {iExt.mixin.ListView} this iExt.mixin.ListView 列表组件。
     * @param {Ext.data.Model[]} records 当前选择的数据。
     */

    /**
     * 获取选择的数据。
     * @return {Ext.data.Model[]} 当前选择的数据。
     */
    ixGetSelectedData: iExt.unimplFn,

    /**
     * 搜索数据。
     * @param {Object[]} filters 筛选条件。
     */
    ixSearch: iExt.unimplFn,

    /**
     * 刷新数据。
     */
    ixRefresh: iExt.unimplFn

});