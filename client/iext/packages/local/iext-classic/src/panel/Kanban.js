/**
 * @class iExt.panel.Kanban
 * @extends {Ext.panel.Panel} 
 * @classdesc 看板列表。
 * 看板项使用 Ext.Component 实现
 */
Ext.define('iExt.panel.Kanban', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixkanbanpanel',

    cls: 'ix-kanban-panel',
    bodyCls: 'ix-kanban-body',
    referenceHolder: true,

    mixins: [
        'iExt.mixin.ListView'
    ],

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15,
        /**
         * 看板项缺省配置
         */
        itemConfig: {
            cls: 'ix-kanban-item',
            minHeight: 80
        }
    },

    config: {
        /**
         * 目前不支持复选
         */
        ixMulti: false,
        /**
         * 阶段集合 {String|Object}
         * String：表示枚举类型
         * Object：表示阶段配置对象{1:'有效',2:'无效'}
         */
        ixStages: null,
        /**
         * 阶段字段名称，用于处理所属阶段
         */
        ixStageField: '',
        /**
         * 阶段面板最小宽度
         */
        ixStageMinWidth: null,
        /**
         * 是否允许收缩和展开
         */
        ixCollapsible: false,
        /**
         * 看板项模板
         * 使用 Ext.Component 做为组件显示
         */
        ixItemTpl: null
    },

    /**
     * 数据项选择样式
     */
    itemSelectedCls: 'ix-kanban-item-selected',

    /**
     * 分页大小
     * 0 表示不分页
     */
    ixPageSize: null,

    /**
     * 看板项配置信息
     * 参见 Ext.Component 的配置项
     */
    ixItemConfig: null,

    /**
     * 看板项点击事件。
     * @memberOf iExt.panel.Kanban#
     * @event ixitemclick
     * @param {iExt.panel.Kanban} this 看板组件
     * @param {Ext.Component} item Ext.Component 组件
     * @param {Object} data 看板项数据。
     */

    scrollable: 'x',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    defaults: {
        xtype: 'ixstagepanel'
    },

    constructor: function (config) {
        var me = this;
        if (Ext.isEmpty(me.ixItemConfig)) {
            me.ixItemConfig = me.ixTheme.itemConfig;
        } else {
            me.ixItemConfig = me.ixItemConfig || {};
            Ext.applyIf(me.ixItemConfig, me.ixTheme.itemConfig);
        }
        me.callParent([config]);
    },

    initComponent: function () {
        var me = this,
            ixstore = me.getIxStore();

        if (Ext.isEmpty(me.ixPageSize)) {
            me.ixPageSize = me.ixTheme.pageSize;
        }
        ixstore = Ext.apply(ixstore, {
            pageSize: me.ixPageSize
        });

        var filters = me.getIxFilters();
        if (filters) {
            ixstore.filters = filters;
        }

        var store = me.store = Ext.data.StoreManager.lookup(ixstore || 'ext-empty-store');
        store.on('refresh', me._ixOnDataRefresh, me);

        if (store && me.ixPageSize > 0) {
            if (me.bbar) {
                Ext.apply(me.bbar, {
                    ixStore: store
                });
            } else {
                me.bbar = {
                    xtype: 'ixpagetbr',
                    ixStore: store
                };
            }
        }

        var balt = false,
            stages = me.getIxStages(),
            collapsible = me.getIxCollapsible(),
            minWidth = me.getIxStageMinWidth();

        me.items = [];
        Ext.each(stages, function (stage) {
            var panel = {
                title: stage.text,
                ixAlt: balt,
                ixCollapsible: collapsible,
                reference: '__ixStage_' + stage.value
            };
            if (!Ext.isEmpty(minWidth)) {
                Ext.apply(panel, {
                    minWidth: minWidth
                });
            }
            me.items.push(panel);
            balt = !balt;
        });

        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        if (me.store) {
            me.store.load();
        }
    },

    applyIxMulti: function (multi) {
        return false;
    },

    applyIxStages: function (stages) {
        if (Ext.isString(stages)) {
            var enums = Ext.ClassManager.get(stages);
            if (enums) {
                stages = enums.ixList();
            } else {
                Ext.raise('指定的枚举类型 [' + stages + '] 不存在!');
            }
        } else if (Ext.isObject(stages)) {
            var obj = Ext.clone(stages);
            stages = [];
            Object.getOwnPropertyNames(obj).forEach(
                function (val, idx, array) {
                    stages.push({
                        value: val,
                        text: obj[val]
                    });
                });
        } else {
            Ext.raise('无效的阶段配置信息!');
        }
        return stages;
    },

    /**
     * 获取选择的数据
     */
    ixGetSelectedData: function () {
        var me = this,
            data = [];
        if (me._ixSelectedItem) {
            data.push(me._ixSelectedItem.record);
        }
        return data;
    },

    /**
     * 执行搜索
     * @param {Object}  filters 搜索条件
     */
    ixSearch: function (filters) {
        var me = this,
            store = me.store,
            _filters = null;

        // 不支持本地搜索？
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
            me._ixSelectedItem = null;
            me.ixOnSelectionChange();
        }
    },

    /**
     * 数据选择变更事件处理
     * 为了统一列表组件，触发自定义的事件
     */
    ixOnSelectionChange: function () {
        var me = this;
        if (me.hasListeners.ixselection) {
            var selections = [];
            if (me._ixSelectedItem) {
                selection.push(me._ixSelectedItem);
            }
            me.fireEvent('ixselection', me, selections);
        }
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        Ext.destroyMembers(this, '_ixSelectedItem');
        this.callParent();
    },

    privates: {

        _ixSelectedItem: null,

        _ixOnDataRefresh: function (store, eOpts) {
            var records = store.getRange(0);
            this._ixRenderItems(records);
        },

        _ixRenderItems: function (records) {
            var me = this;
            if (!me.rendered || me.destroyed) {
                return;
            }

            var record, ref, stagePanel,
                stageField = me.getIxStageField(),
                refs = me.getReferences(),
                itemConfig = me.ixItemConfig,
                itemTpl = me.getIxItemTpl();

            Ext.suspendLayouts();
            me.items.each(function (item) {
                item.removeAll(true);
            });

            Ext.each(records, function (record) {
                ref = record.get(stageField);
                ref = '__ixStage_' + ref;
                stagePanel = refs[ref];
                if (stagePanel) {
                    var cmp = {
                        xtype: 'box',
                        renderTpl: itemTpl,
                        renderData: record.data,
                        listeners: {
                            click: {
                                element: 'el',
                                fn: function (e, t, eOpts) {
                                    me._ixItemClick(e, t, eOpts, record);
                                },
                                scope: me
                            }
                        }
                    };
                    Ext.applyIf(cmp, itemConfig);
                    stagePanel.add(cmp);
                }
            });

            // 清除已选择的数据
            me._ixSelectedItem = null;
            me.ixOnSelectionChange();
            Ext.resumeLayouts(true);
        },

        _ixItemClick: function (e, t, eOpts, record) {
            var me = this;
            var id = e.currentTarget.id;
            var item = Ext.getCmp(id);
            if (me._ixSelectedItem) {
                me._ixSelectedItem.item.removeCls(me.itemSelectedCls);
            }
            item.addCls(me.itemSelectedCls);
            me._ixSelectedItem = {
                item: item,
                record: record
            };

            // 快速查看
            var qv = me.getIxQuickView();
            if (qv) {
                me.fireEvent('ixopenview', me, qv, {
                    target: iExt.action.ViewTarget.QUICK,
                    viewConfig: {
                        ixRecord: record
                    }
                });
            }

            if (me.hasListeners.ixitemclick) {
                me.fireEvent('ixitemclick', me, item, record);
            }
            me.ixOnSelectionChange();
        }
    }

});