/**
 * @mixin iExt.mixin.QuickSearch
 * @extends {Ext.Mixin} 
 * @classdesc iExt 快速搜索 MIXIN。
 * 该视图定义筛选条件，并执行实际的搜索。
 */
Ext.define('iExt.mixin.QuickSearch', {
    extend: 'Ext.Mixin',

    requires: [
        'iExt.app.view.Util'
    ],

    mixinConfig: {
        id: 'iext-quick-search',
        on: {
            destroy: '_ixOnDestroy'
        }
    },

    ixIsQuickSearch: true,

    config: {
        /**
         * 筛选条件配置。
         */
        ixFilters: null,

        /**
         * 对齐的目标控件引用标识。
         * 表示对齐的控件reference。
         */
        ixAlignTargetRef: null
    },

    /**
     * 设置自动搜索，例如text的回车事件处理。
     */
    ixAutoSearch: true,

    /**
     * 对于文本框等回车触发搜索的情况，
     * 需要传递实际的搜索按钮组件，
     * 通过该属性来设置需要触发的实际组件。
     */
    ixEventItem: null,

    applyIxFilters: function (filters) {
        if (filters) {
            filters = Ext.clone(filters);
            filters = iExt.Filters.create(filters);
        }
        return filters;
    },

    /**
     * 触发快速搜索事件。
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixOnQuickSearch: function (item, e, eOpts) {
        var me = this,
            ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            filters = ixFilters.ixGetFilter(me.getReferences());
        }
        // 触发搜索事件
        // 列表的视图控制器会监听该事件，并进行相应的处理
        this.fireEvent('ixquicksearch', me.ixEventItem || item, filters);
    },

    /**
     * 清除搜索条件事件处理。
     * 由于存在多个mixin，为了避免方法冲突，尽量采用完整命名。
     * @memberOf iExt.mixin.QuickSearch#
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixOnQuickClear: function (item, e, eOpts) {
        var me = this;
        iExt.View.ixClearValues(me);
        if (me.ixAutoSearch === true) {
            me.ixOnQuickSearch(item, e, eOpts);
        }
    },

    /**
     * 开放此方法是为了可以由组件决定设置哪些子组件。
     */
    ixSetAutoSearch: function (items) {
        var me = this;
        me._ixSetAutoSearch(items);
    },

    privates: {

        /**
         * 设置自动快速搜索。
         */
        _ixSetAutoSearch: function (items) {
            var me = this;
            Ext.each(items, function (item) {
                if (!item.xtype || item.xtype === 'textfield' ||
                    item.xtype === 'ixtext') {
                    Ext.applyIf(item, {
                        enableKeyEvents: true,
                        listeners: {
                            keypress: {
                                fn: me._ixOnKeyPress,
                                scope: me
                            }
                        }
                    });
                } else if (item.xtype === 'ixsearchbtn') {
                    Ext.applyIf(item, {
                        listeners: {
                            change: {
                                fn: me._ixOnChange,
                                scope: me
                            }
                        }
                    });
                }
            });
        },

        /**
         * 回车自动搜索。
         * @param {Ext.Component} item 触发事件的组件。
         * 对于文本框等输入控件需要进行转换为搜索的动作按钮，
         * 因为在列表控制器的搜索事件监听处理中，
         * 需要根据item去搜索与之对齐的列表组件。
         */
        _ixOnKeyPress: function (item, e, eOpts) {
            if (e.getCharCode() === Ext.EventObject.ENTER) {
                this.ixOnQuickSearch(item, null, e);
            }
        },

        /**
         * 搜索条件变更处理
         */
        _ixOnChange: function (item) {
            Ext.defer(this.ixOnQuickSearch, 100, this, [item, null, null]);
        },

        /**
         * 析构视图处理。
         */
        _ixOnDestroy: function () {
            Ext.destroyMembers(this, 'ixEventItem');
        }

    }

});