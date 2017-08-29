/**
 * @class iExt.form.field.TagField
 * @extends {Ext.form.field.Tag}
 * @classdesc iExt Tag组件。
 */
Ext.define('iExt.form.field.TagField', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.ixtagfield',

    cls: 'ix-tag-field',

    mixins: [
        'iExt.mixin.Linkable'
    ],

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15,
        listMinWidth: 400
    },

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
        ixLines: 'all',
        /**
         * 缺省搜索条件
         */
        ixFilters: undefined
    },

    defaultListConfig: {
        cls: 'ix-picker'
    },

    /**
     * 缺省使用仓储标识做为值
     */
    valueField: 'id',
    /**
     * 缺省使用名称做为显示值
     */
    displayField: 'name',

    initComponent: function () {
        var me = this,
            listConfig = {};
        me.setIxMulti(true);
        me.ixDelimiter = me.getDelimiter() || me.ixDelimiter;

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
        var tpl = me.getIxItemTpl(),
            cols = me.getIxColumns(),
            lines = me.getIxLines();
        var tplConfig = iExt.util.View.ixGetItemTplConfig(tpl, cols, lines);
        me.listConfig = Ext.applyIf(me.listConfig, tplConfig);
        me.callParent();
    },

    /**
     * 重载该方法。根据变更的数据设置参照的关联数据。
     */
    onValueCollectionEndUpdate: function ()  {
        var  me  =  this,
            pickedRecords  =  me.valueCollection.items;
        if  (me.isSelectionUpdating())  {
            return;
        } 
        me.callParent();
        me.ixSetLinkValues(pickedRecords , true);
    },

    applyIxFilters: function (filters) {
        if (filters) {
            this.queryMode = 'remote';
            this.queryParam = 'filter';
        }
        return filters;
    }
});