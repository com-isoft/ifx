/**
 * @class iExt.filter.Filters
 * @extends {Ext.Base} 
 * @classdesc 筛选条件。
 */
Ext.define('iExt.filter.Filters', {
    alternateClassName: 'iExt.Filters',

    requires: [
        'iExt.filter.Connectors',
        'iExt.filter.Operators'
    ],

    ixIsFilters: true,

    config: {
        /**
         * 对齐控件的 reference
         */
        ixAlignTarget: null,
        /**
         * 缺省连接符
         */
        ixConnector: 'and',
        /**
         * 子条件集合
         */
        ixItems: []
    },

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    updateIxAlignTarget: function (target) {
        if (target) {
            Ext.each(this.getIxItems(), function (item) {
                if (!item.getIxAlignTarget()) {
                    item.setIxAlignTarget(target);
                }
            });
        }
    },

    applyIxConnector: function (cn) {
        if (Ext.isString(cn)) {
            cn = iExt.filter.Connectors.ixGetValue(cn.toUpperCase());
        }
        return cn;
    },

    applyIxItems: function (items) {
        if (items) {
            var tempItems = Ext.clone(items);
            var item;
            items = [];
            Ext.each(tempItems, function (item) {
                if (item.ixConnector) {
                    // 如果存在连接符表示的是一个条件集合
                    items.push(iExt.Filters.create(item));
                } else {
                    // 没有连接符表示一个筛选条件
                    items.push(iExt.Filter.create(item));
                }
            });
        }
        return items;
    },

    /**
     * 获取搜索条件
     * @param {Obect} references 组件引用对象
     */
    ixGetFilter: function (references) {
        var me = this, filters = [], filter;
        Ext.each(me.getIxItems(), function (item) {
            filter = item.ixGetFilter(references);
            if (filter) {
                if (Ext.isArray(filter)) {
                    filters = filters.concat(filter);
                } else {
                    filter.relation = iExt.filter.Connectors.ixGetName(me.getIxConnector());
                    filters.push(filter);
                }
            }
        });
        return filters;
    },

    /**
     * 设置搜索条件
     * @param {Obect} references 组件引用对象
     * @param {Obect[]} filters 搜索条件
     */
    ixSetFilter: function (references, filters) {
        var me = this;
        Ext.each(me.getIxItems(), function (item) {
            item.ixSetFilter(references, filters);
        });
    },

    statics: {

        /**
         * 根据搜索条件集合获取数据记录
         */
        ixGetFilterRecords: function (filters) {
            var records = [], record;
            Ext.each(filters, function (item) {
                var extra = item.extra || {};
                record = {
                    value: item,
                    text: extra.text,
                    removable: extra.removable
                };
                records.push(record);
            });
            return records;
        }
    }

});