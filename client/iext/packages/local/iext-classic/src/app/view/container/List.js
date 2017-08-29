/**
 * @class iExt.app.view.container.List
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 列表视图容器。
 */
Ext.define('iExt.app.view.container.List', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixlistcontainer',

    requires: [],

    cls: 'ix-list-container',
    bodyCls: 'ix-list-container-body',
    title: '列表',

    /**
     * 主题配置
     */
    ixTheme: {
        /**
         * 缺省配置
         */
        defaults: {
            'list': {
                iconCls: 'x-fa fa-list'
            },
            'calendar': {
                iconCls: 'x-fa fa-calendar'
            },
            'graph': {
                iconCls: 'x-fa fa-line-chart'
            },
            'kanban': {
                iconCls: 'x-fa fa-th-large'
            },
            'report': {
                iconCls: 'x-fa fa-table'
            }
        }
    },

    config: {
        /**
         * 视图或视图集合。
         * 对于列表容器可以包含多个视图，共享工具栏和搜索。
         */
        ixView: null,
        /**
         *  缺省视图索引。
         */
        ixDefaultIndex: 0,
        /**
         * 操作组件集合。
         */
        ixActionItems: null,
        /**
         * 搜索组件。
         */
        ixSearchItem: null
    },

    /**
     * 视图变更事件。
     * @memberOf iExt.app.view.container.List#
     * @event ixviewchanged
     * @param {iExt.app.view.container.List} this 列表容器组件
     * @param {Ext.Component} view 当前的视图。
     */

    applyIxDomain: function (domain) {
        var me = this;
        if (Ext.isString(domain)) {
            domain = Ext.create(domain);
        }
        if (domain) {
            if (me.getIxView() === null) {
                me.setIxView(domain.ixListViews);
            }
            if (me.getIxActionItems() === null) {
                me.setIxActionItems(iExt.util.Domain.ixGetListActionItems(domain));
            }
        }
        return domain;
    },

    initComponent: function () {
        var me = this,
            title = me.getTitle();
        if (title) {
            me.setBind({
                title: '{title}'
            });
            vm = me.getViewModel();
            vm.set('ixvc.title', title);
        }
        me.callParent();
    },

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: function () {
        var me = this,
            items = [];

        var actItems = me.getIxActionItems() || [];
        if (actItems.length > 0) {
            items = items.concat(actItems);
        }

        var viewItem = me.ixGetViewsButton();
        if (viewItem) {
            items.push(viewItem);
        }

        var searchItem = me.getIxSearchItem();
        if (searchItem) {
            Ext.apply(searchItem, {
                listeners: {
                    ixsearch: {
                        fn: me._ixOnSearch,
                        scope: me,
                        options: {
                            order: 'before'
                        }
                    }
                }
            });
            items.push(searchItem);
        }

        me.tbar = {
            xtype: 'ixacttbr',
            items: items
        };
    },

    /**
     * 获取列表视图的控制按钮。
     * @return {iExt.button.Segmented} 控制按钮
     */
    ixGetViewsButton: function () {
        var me = this,
            listType, iconCls, name,
            views = me.getIxView(),
            idx = me.getIxDefaultIndex() || 0;

        var btnTypes = {
            xtype: 'ixactsbtn',
            allowToggle: true,
            listeners: {
                toggle: {
                    fn: me.ixChangeView,
                    scope: me
                }
            },
            items: []
        };

        if (Ext.isArray(views)) {
            Ext.each(views, function (item, index) {
                listType = item.ixListType || 'list';
                var enumItem = iExt.app.view.ListTypes.ixGetItem(listType);
                var btnCfg = {
                    value: index,
                    pressed: index === idx
                };
                if (enumItem) {
                    btnCfg.tooltip = enumItem[iExt.app.view.ListTypes.ixTextProperty];
                    name = enumItem[iExt.app.view.ListTypes.ixNameProperty];
                    defalutCfg = me.ixTheme.defaults[name.toLowerCase()];
                    if (defalutCfg) {
                        Ext.apply(btnCfg, defalutCfg);
                    }
                }
                btnTypes.items.push(btnCfg);
                Ext.apply(item, {
                    header: false
                });
            });
        }

        return btnTypes;
    },

    ixChangeView: function (item, button, isPressed, eOpts) {
        var me = this,
            idx = button.getValue();
        var views = me.getIxView();
        Ext.suspendLayouts();
        me.removeAll();
        var view = views[idx];
        if (me._ixLastFilters) {
            Ext.apply(view, {
                ixFilters: me._ixLastFilters
            });
        }
        me.add(view);
        Ext.resumeLayouts(true);
    },

    /**
     * 设置缺省视图
     */
    ixSetDefaultView: function () {
        var me = this,
            views = me.getIxView(),
            idx = me.getIxDefaultIndex() || 0;
        if (Ext.isArray(views) && views.length > idx) {
            Ext.suspendLayouts();
            me.removeAll();
            me.add(views[idx]);
            Ext.resumeLayouts(true);
        }
    },

    /**
     * 当前视图变更模板方法
     */
    ixOnViewChanged: function (view) {
        var me = this;
        if (view) {
            if (view.ixIsListView !== true) {
                Ext.raise('指定的视图不是列表视图！');
            }
        }
        me.callParent(arguments);
    },

    /**
     * 获取上次的搜索条件
     */
    ixGetLastFilters: function () {
        return _ixLastFilters;
    },

    privates: {

        _ixLastFilters: null,

        _ixOnSearch: function (item, filters) {
            var me = this;
            me._ixLastFilters = filters;
        }

    }

});