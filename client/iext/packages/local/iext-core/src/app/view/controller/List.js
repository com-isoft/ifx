/**
 * @class iExt.app.view.controller.List
 * @extends {iExt.app.view.controller.Base} 
 * @classdesc iExt 列表视图控制器类。
 */
Ext.define('iExt.app.view.controller.List', {
    extend: 'iExt.app.view.controller.Base',
    alias: 'controller.ixlist',

    listen: {
        component: {
            '*': {
                /**
                 * 搜索事件。
                 */
                ixsearch: 'ixOnSearch',
                /**
                 * 快速搜索事件。
                 */
                ixquicksearch: 'ixOnSearch'
            }
        }
    },

    /**
     * 视图初始化后处理。
     * @memberOf iExt.app.controller.List#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnViewInited: function (view, auths) {
        // <debug>
        iExt.log('列表控制器完成视图初始化', view.$className, view.getId());
        // </debug>

        var me = this,
            refs = view.getReferences();

        // 处理引用的组件
        for (var ref in refs) {
            if (refs.hasOwnProperty(ref)) {
                if (ref.ixIsListView === true) {
                    // 列表控件的对齐操作组件已经由
                    // Base._ixInitActionItems() 方法设置
                    if (ref.hasListeners.ixselection) {
                        // 如果存在事件监听，在事件处理前插入处理
                        ref.onBefore('ixselection', me.ixOnSelection, me);
                    } else {
                        // 添加选择事件处理
                        ref.addListener('ixselection', me.ixOnSelection, me);
                    }
                    // 初始设置对齐组件
                    me.ixOnSelection(ref, []);
                }
            }
        }

        // 处理当前视图
        if (view.ixIsListView === true) {
            if (view.hasListeners.ixselection) {
                // 如果存在事件监听，在事件处理前插入处理
                view.onBefore('ixselection', me.ixOnSelection, me);
            } else {
                // 添加选择事件处理
                view.addListener('ixselection', me.ixOnSelection, me);
            }
            // 初始设置对齐组件
            me.ixOnSelection(view, []);
        }
    },

    /**
     * 选择数据事件处理
     * @param {Ext.Component} item 列表组件。
     * @param {Ext.data.Model} data 选择的数据集合。
     */
    ixOnSelection: function (item, data) {
        var multi = data.length > 1;
        // 列表控件的对齐操作组件已经在
        // Base._ixInitActionItems() 方法中设置
        var ids = item._$ixAlignTargetIds || [];
        Ext.each(ids, function (id, index) {
            var cmp = Ext.getCmp(id);
            if (cmp && cmp.ixIsAction === true) {
                var align = cmp.getIxAlign();
                if (align) {
                    var b = align.ixIsEnabled(multi, data);
                    cmp.setDisabled(!b);
                }
            }
        });
    },

    /**
     * 搜索事件处理
     * @param {Ext.Component} item 搜索组件。
     * @param {Object} filters 筛选条件。
     */
    ixOnSearch: function (item, filters) {
        var me = this,
            id = item.getId();

        me._ixLastFilter = filters;
        // 获取搜索组件对齐的列表组件
        var actItems = me._$ixActionTargetRefX.filter(function (element, index) {
            return element.itemId === id;
        });
        if (actItems.length > 0) {
            Ext.each(actItems, function (actitem, index) {
                var targetCmp = Ext.getCmp(actitem.targetId);
                if (targetCmp && targetCmp.ixIsListView === true) {
                    targetCmp.ixSearch(filters);
                }
            });
        }
    }

});