/**
 * @class iExt.toolbar.Tree
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 树型组件的状态栏。
 */
Ext.define('iExt.toolbar.Tree', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixtreetbr',

    cls: 'ix-tree-tbr',
    referenceHolder: true,

    config: {
        ixTree: null
    },

    /**
     * 重载初始化控件。用于监听Tree的事件。
     * @memberOf iExt.toolbar.Tree#
     */
    initComponent: function () {
        var me = this,
            tree = me.getIxTree();

        if (tree) {
            me.items = [{
                xtype: 'tbtext',
                reference: '__ixLoaded',
                text: ''
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'tbtext',
                reference: '__ixChild',
                text: ''
            }, {
                xtype: 'tbseparator'
            }, {
                tooltip: '刷新',
                iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                userCls: 'x-btn-plain-toolbar-small',
                handler: me._ixRefreshTree,
                scope: me
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'label',
                reference: '__ixLabel',
                text: ''
            }, {
                xtype: 'tbfill'
            }, {
                xtype: 'tbtext',
                reference: '__ixTotal',
                text: ''
            }];

            var store = tree.getStore();
            if (store) {
                store.on('load', me._ixOnDataLoad, me);
                store.on('ixafterlocalfilter', me._ixOnAfterLocalFilter, me);
            }
            tree.onBefore('beforeselect', me._ixOnBeforeSelect, me);
            tree.onBefore('afteritemcollapse', me._ixOnAfterItem, me);
            tree.onBefore('afteritemexpand', me._ixOnAfterItem, me);
        }
        me.callParent();
    },

    privates: {

        /**
         * 重新加载选中节点的子节点。
         * @memberOf iExt.toolbar.Tree#
         * @private
         */
        _ixRefreshTree: function () {
            var me = this,
                tree = me.getIxTree();
            if (tree) {
                var store = tree.getStore();
                var root = tree.getRootNode();
                store.load({
                    node: root
                });
            }
        },

        /**
         * 数据加载事件处理。
         * @memberOf iExt.toolbar.Tree#
         * @private
         * @param {Ext.data.TreeStore} store 数据源。
         * @param {Object[]} records 加载的数据。
         * @param {Boolean} successful 是否成功。
         * @param {Object} operation 操作对象。
         * @param {Object} node 节点对象。
         * @param {Object} eOpts 事件参数。
         */
        _ixOnDataLoad: function (store, records, successful, operation, node, eOpts) {
            var me = this;
            me._ixSetTotalTextItem(store, records);
        },

        /**
         * 本地筛选后事件处理。
         * @memberOf iExt.toolbar.Tree#
         * @private
         * @param {iExt.data.TreeStore} store 数据源对象。
         * @param {Object} root 根节点。
         * @param {Object[]} childNodes 符合条件的节点集合。
         */
        _ixOnAfterLocalFilter: function (store, root, childNodes) {
            var me = this;
            me._ixSetTotalTextItem(store, childNodes);
        },

        /**
         * 单选选择前事件处理，用于确定是否只能选择叶子节点。
         * @memberOf iExt.toolbar.Tree#
         * @private
         * @param {Ext.selection.RowModel } rm 行选择模型。
         * @param {Object} record 要选择的数据。
         * @param {Number} index 要选择的数据索引。
         * @param {Object} eOpts 事件参数。
         */
        _ixOnBeforeSelect: function (rm, record, index, eOpts) {
            var me = this;
            me._ixSetChildTextItem(record);
        },

        /**
         * 单选选择前事件处理，用于确定是否只能选择叶子节点。
         * @memberOf iExt.toolbar.Tree#
         * @private
         * @param {Object} node 选择的节点。
         * @param {Number} index 要选择的数据索引。
         * @param {HTMLElement} item 节点的HTML对象。
         * @param {Object} eOpts 事件参数。
         */
        _ixOnAfterItem: function (node, index, item, eOpts) {
            var me = this;
            me._ixSetChildTextItem(node);
        },

        /**
         * 设置加载节点的信息。
         * @memberOf iExt.toolbar.Tree#
         * @private
         * @param {Object} store 数据源对象。
         * @param {Object[]} records 节点集合。
         */
        _ixSetTotalTextItem: function (store, records) {
            var me = this,
                refs = me.getReferences();

            if (records) {
                if (refs.__ixLoaded) {
                    refs.__ixLoaded.setText(records.length > 0 ?
                        '当前加载 ' + records.length + ' 条数据' : '');
                }

                if (refs.__ixTotal) {
                    var root = store.getRoot(),
                        total = 0;
                    root.cascadeBy(function (child) {
                        total++;
                    });
                    refs.__ixTotal.setText(total > 0 ?
                        '共加载 ' + (total - 1) + ' 条数据' : '没有数据');
                }
                me._ixOnChange();
            }
        },

        /**
         * 设置选择节点的信息。
         * @memberOf iExt.toolbar.Tree#
         * @private
         * @param {Object} node 节点。
         */
        _ixSetChildTextItem: function (node) {
            var me = this,
                children = 0,
                descendants = 0,
                refs = me.getReferences();

            if (refs.__ixChild && node.hasChildNodes()) {
                children = node.childNodes.length;
                node.cascadeBy(function (denscendant) {
                    descendants++;
                });
                // 不包含节点本身
                descendants--;
                refs.__ixChild.setText(children === 0 && descendants === 0 ?
                    '' : '选择的节点有 ' + children + '/' + descendants + ' 条数据');
            }
        },

        _ixOnChange: function (item, pageData, eOpts) {
            var me = this,
                refs = me.getReferences();
            if (refs.__ixLabel) {
                var d = new Date();
                var text = '最后更新 ' + Ext.util.Format.date(d, 'Y-m-d H:i:s');
                refs.__ixLabel.setText(text);
            }
        }
    }

});