/**
 * @class iExt.form.field.ComboBox
 * @extends {Ext.form.field.ComboBox} 
 * @classdesc 显示组件。
 */
Ext.define('iExt.form.field.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.ixcombo',

    cls: 'ix-combo',

    mixins: [
        'iExt.mixin.Linkable'
    ],

    config: {
        /**
         * 使用模板形式。模板模式优先。
         * {String[]}
         * ['<div title="{name}: {email}">{name} ({phone})</div>']
         */
        ixItemTpl: null,
        /**
         * 使用列模式。轻量级的表格形式。
         * {Object[]}
         * [{dataIndex:'name', width:80},{dataIndex:'email'}]
         */
        ixColumns: null,
        /**
         * 只适用于列模式。
         * {String} 'all/col/row/none'
         */
        ixLines: 'none',
        /**
         * 缺省搜索条件
         */
        ixFilters: undefined
    },

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15,
        listMinWidth: 400
    },

    /**
     * 缺省使用仓储标识做为值
     */
    valueField: 'value',
    /**
     * 缺省使用名称做为显示值
     */
    displayField: 'text',

    minChars: 2,
    defaultListConfig: {
        cls: 'ix-picker'
    },

    initComponent: function () {
        var me = this,
            listConfig = {};
        me.setIxMulti(false);

        if (Ext.isEmpty(me.pageSize)) {
            me.pageSize = me.ixTheme.pageSize;
        }

        // 需要同步页面大小的值
        if (me.pageSize > 0) {
            var store = me.getStore();
            Ext.apply(store, {
                pageSize: me.pageSize
            });
            // 设置最小宽度
            listConfig.minWidth = me.ixTheme.listMinWidth;
        }
        me.listConfig = Ext.applyIf(me.listConfig || {}, listConfig);

        // 设置数据项模板
        var tpl = me.getIxItemTpl();
        var cols = me.getIxColumns();
        var lines = me.getIxLines();
        var tplConfig = iExt.util.View.ixGetItemTplConfig(tpl, cols, lines);
        me.listConfig = Ext.applyIf(me.listConfig, tplConfig);
        me.callParent();
    },

    /**
     * 重载该方法。根据变更的数据设置参照的关联数据。
     */
    onValueCollectionEndUpdate: function () {
        var  me  = this,
            selectedRecords  =  me.valueCollection.getRange();

        me.callParent();
        me.ixSetLinkValues(selectedRecords , true);
    },

    /**
     * 为远程查询设置参数。
     */
    getParams: function (queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = Ext.encode([{
                "dataType": "STRING",
                "operator": "like",
                "relation": "AND",
                "property": "code",
                "value": queryString
            }]);
        }
        return params;
    },

    /**
     * 设置列集合
     */
    applyIxColumns: function (cols) {
        var me = this;
        if (cols) {
            if (!Ext.isArray(cols)) {
                Ext.raise('使用列模式需要定义有效的列数组！');
            }
        }
        return cols;
    },

    /**
     * 设置删选条件。
     */
    applyIxFilters: function (filters) {
        if (filters) {
            this.queryMode = 'remote';
            this.queryParam = 'filter';
        }
        return filters;
    }

});