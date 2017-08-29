/**
 * @class iExt.form.field.TagBase
 * @extends {Ext.form.field.Tag} 
 * @classdesc 只读标签输入项基础类。
 */
Ext.define('iExt.form.field.TagBase', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.ixtagbase',

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        /**
         * 下拉组件的规格定义与窗口组件的定义应该不一致
         * 所以对于下拉参照、下拉搜索提供单独的规格定义
         * 宽度定义基本一致，主要区别应该在高度上。
         */
        scales: {}
    },

    cls: 'ix-tag-base',
    hideTrigger: false,
    editable: false,
    autoSelect: false,
    selectOnFocus: false,
    triggerOnClick: false,
    forceSelection: false,

    defaultListConfig: {
        cls: 'ix-picker'
    },

    /**
     * 重载初始化控件。创建标签的数据源。
     * @memberOf iExt.form.field.TagLabel#
     */
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'memory',
                reader: 'json'
            }
        });
        me.store = store;
        me.callParent(arguments);
    },

    /**
     * 重载关闭Tag时触发的处理过程，删除Store中的记录。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Element} itemEl 关闭的标签对象。
     */
    removeByListItemNode: function (itemEl) {
        var me = this,
            rec = me.getRecordByListItemNode(itemEl);

        if (rec) {
            me.store.remove(rec);
        }
        me.callParent(arguments);
    },

    /**
     * 添加标签的方法。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Object} tag 要添加的标签对象。
     */
    ixAddTag: function (tag) {
        var me = this;
        var record = me.getStore().findRecord(me.valueField, tag.value);
        if (!record) {
            me.store.add(tag);
            me.setValue(me.store.getRange());
        }
    },

    /**
     * 删除标签的方法。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Object} tag 要删除的标签对象。
     */
    ixRemoveTag: function (tag) {
        var me = this,
            value;
        if (Ext.isString(tag)) {
            value = tag;
        } else {
            value = tag.value;
        }
        var record = me.getStore().findRecord(me.valueField, value);
        if (record) {
            me.store.remove(record);
            me.setValue(me.store.getRange());
        }
    },

    /**
     * 清除标签的方法。
     * @memberOf iExt.form.field.TagLabel#
     */
    ixClearTag: function () {
        var me = this,
            value;
        me.store.removeAll(true);
        me.setValue(me.store.getRange());
    },

    /**
     * hack picker 的缺省配置
     */
    ixGetPickerConfig: function (view, viewType, scale) {
        var me = this,
            listConfig = me.listConfig || {},
            size = me.ixTheme.scales[scale];

        if (size) {
            listConfig = Ext.applyIf(listConfig, {
                minWidth: size.width,
                maxHeight: size.maxHeight
            });
        }
        view = Ext.apply(view, {
            floating: true,
            header: false,
            shadow: false,
            // 传统意义上的 Tag，picker展示的是列表数据
            // 但是用于下拉参照视图或搜索视图的情况下，
            // 并不需要列表数据，而是由视图提供处理。
            // Tag 在销毁时需要取消绑定 piker 的数据源，
            // 因此需要提供piker的bindStore等虚方法hack原处理。
            refresh: Ext.emptyFn,
            getNavigationModel: Ext.emptyFn,
            getSelectionModel: Ext.emptyFn,
            bindStore: Ext.emptyFn
        });
        return Ext.apply(view, listConfig, me.defaultListConfig);
    }

});