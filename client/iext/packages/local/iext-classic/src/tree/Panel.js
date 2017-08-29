/**
 * @class iExt.tree.Panel
 * @extends {Ext.tree.Panel} 
 * @mixes iExt.app.View
 * @classdesc 树型列表视图的基础类。
 */
Ext.define('iExt.tree.Panel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.ixtree',

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
         * 缺省不使用单元格焦点样式。
         * 但是对于有些情况，例如：可以选择单元格时则需要使用。
         */
        ixFocus: false,
        /**
         * 是否显示节点图标
         */
        ixNodeIcon: false,
        /**
         * 是否只允许选择叶子节点
         */
        ixLeafOnly: false,
        /**
         * 是否级联选择
         */
        ixCascadeSelect: true,
        /**
         * 预览字段
         */
        ixPreviewField: null
    },

    header: false,
    useArrows: true,
    rootVisible: false,
    singleExpand: false,
    columnLines: false,
    rowLines: true,
    animate: true,

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
                store = Ext.data.StoreManager.lookup(ixstore || 'ext-empty-store');
                me.store = store;
            }
            if (store && me.ixPageSize > 0) {
                if (me.bbar) {
                    Ext.apply(me.bbar, {
                        ixTree: me
                    });
                } else {
                    me.bbar = {
                        xtype: 'ixtreetbr',
                        ixTree: me
                    };
                }
            }
        }
        me.callParent();
        var treeStore = me.getStore();
        treeStore.on('load', me._ixOnLoad, me);
    },

    applyIxFocus: function (focus) {
        var me = this;
        if (focus === false) {
            me.cls = 'ix-tree ix-tree-no-focus';
        } else {
            me.cls = 'ix-tree';
        }
        return focus;
    },

    applyIxNodeIcon: function (show) {
        var me = this;
        if (show === false) {
            me.userCls = 'ix-tree-noicon';
        }
        return show;
    },

    applyIxMulti: function (multi) {
        var me = this;
        if (multi === true) {
            me.on('checkchange', me.ixOnCheckChange, me);
        } else {
            me.on('beforeselect', me.ixOnBeforeSelect, me);
            me.on('selectionchange', me.ixOnSelectionChange, me);
        }
        return multi;
    },

    /**
     * 节点复选事件处理。
     * @memberOf iExt.tree.Panel#
     * @param {Ext.data.TreeModel} node 触发事件的节点。
     * @param {Boolean} checked 是否选中。
     * @param {Object} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixOnCheckChange: function (node, checked, e, eOpts) {
        var me = this,
            selected = [];
        var multi = me.getIxMulti() === true;
        var cascadeSelect = me.getIxCascadeSelect() === true && multi === true;

        if (cascadeSelect) {
            // 处理所有子节点
            node.cascadeBy(function (denscendant) {
                denscendant.set('checked', checked);
            });
            // 处理所有父节点
            var parent = node.parentNode;
            while (parent) {
                if (checked) {
                    parent.set('checked', true);
                } else {
                    var haveCheckedChildren = false;
                    if (parent.hasChildNodes()) {
                        /*ignore jslint start*/
                        Ext.each(parent.childNodes, function (child) {
                            haveCheckedChildren = child.get('checked');
                            if (haveCheckedChildren === true) {
                                // 中止迭代
                                return false;
                            }
                        });
                        /*ignore jslint end*/
                    }
                    parent.set('checked', haveCheckedChildren);
                }
                parent = parent.parentNode;
            }
        }
        // 获取选择的节点
        var store = me.getStore(),
            root = store.getRoot();
        root.cascadeBy(function (rootDenscendant) {
            var checked = rootDenscendant.get('checked') === true;
            if (checked) {
                selected.push(rootDenscendant);
            }
        });
        if (this.hasListeners.ixselection) {
            this.fireEvent('ixselection', this, selected);
        }
    },

    /**
     * 单选选择前事件处理，用于确定是否只能选择叶子节点。
     * @memberOf iExt.tree.Panel#
     * @param {Ext.selection.RowModel} rm 行选择模型。
     * @param {Object} record 要选择的数据。
     * @param {Number} index 要选择的数据索引。
     * @param {Object} eOpts 事件参数。
     * @return {Boolean} 是否允许选择。
     */
    ixOnBeforeSelect: function (rm, record, index, eOpts) {
        var me = this;
        var leafOnly = me.getIxLeafOnly() === true;
        var isLeaf = !record.hasChildNodes() || record.isLeaf();
        if (leafOnly && !isLeaf) {
            // 返回false，阻止数据选择。
            return false;
        }
        return true;
    },

    /**
     * 单选数据事件处理。
     * @memberOf iExt.tree.Panel#
     * @param {Ext.selection.Model} selected SelectionModel。
     * @param {Object} selected 选择的数据。
     * @param {Object} eOpts 事件参数。
     */
    ixOnSelectionChange: function (sm, selected, eOpts) {
        if (this.hasListeners.ixselection) {
            this.fireEvent('ixselection', this, selected);
        }
    },

    /**
     * 获取选择的数据
     */
    ixGetSelectedData: function () {
        var me = this,
            data = [],
            multi = me.getIxMulti();
        if (multi === true) {
            data = me.getChecked();
        } else {
            data = me.getSelection();
        }
        return data;
    },

    /**
     * 根据指定的条件搜索数据。
     * @memberOf iExt.tree.Panel#
     * @param {Object[]} filters 搜索条件集合。
     */
    ixSearch: function (filters) {
        var me = this;
        var store = me.getStore();
        if (store) {
            store.clearFilter(true);
            if (filters && filters.length > 0) {
                store.filter(filters);
            } else {
                store.load();
            }
        }
    },

    privates: {

        /**
         * 数据加载后事件处理。
         * @memberOf iExt.tree.Panel#
         * @private
         * @param {Ext.data.TreeStore} store 数据源。
         * @param {Object[]} records 加载的数据。
         * @param {Boolean} successful 是否成功。
         * @param {Object} operation 操作对象。
         * @param {Object} node 节点对象。
         * @param {Object} eOpts 事件参数。
         */
        _ixOnLoad: function (store, records, successful, operation, node, eOpts) {
            var me = this;
            if (successful === true) {
                me._ixSetLoadedNode(node);
            }
        },

        /**
         * 设置加载的节点对象。
         * @memberOf iExt.tree.Panel#
         * @private
         * @param {Object} node 节点对象。
         */
        _ixSetLoadedNode: function (node) {
            var me = this;
            var multi = me.getIxMulti() === true;
            var leafOnly = me.getIxLeafOnly() === true;
            if (multi === true) {
                node.cascadeBy(function (denscendant) {
                    var isLeaf = !denscendant.hasChildNodes() || denscendant.isLeaf();
                    var checked = leafOnly && !isLeaf ? null : false;
                    denscendant.set('checked', checked);
                });
            }
            node.expand();
        }

    }
});