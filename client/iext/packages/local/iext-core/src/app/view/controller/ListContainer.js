/**
 * @class iExt.app.view.controller.ListContainer
 * @extends {iExt.app.view.controller.List} 
 * @classdesc iExt 列表视图控制器类。
 */
Ext.define('iExt.app.view.controller.ListContainer', {
    extend: 'iExt.app.view.controller.List',
    alias: 'controller.ixlistcontainer',

    listen: {
        component: {
            '*': {
                /**
                 * 视图变更事件。
                 */
                ixviewchanged: '_ixOnViewChanged'
            }
        }
    },
    /**
     * 重载视图视图初始化后处理。
     * 对于视图信息处理转移至视图变更事件中处理。
     * @memberOf iExt.app.controller.ListContainer#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnViewInited: function (view, auths) {
        view.ixSetDefaultView();
    },

    privates: {

        /**
         * 视图变更事件处理。
         * @memberOf iExt.app.controller.ListContainer#
         * @param {Ext.Component} view 视图对象。
         * @param {iExt.mixin.ListView} listView 列表视图。
         */
        _ixOnViewChanged: function (view, listView) {
            var me = this,
                targetId = listView.getId();

            me._$ixActionTargetRefX = me._$ixActionTargetRefX || [];
            Ext.each(me._$ixActionTargetRefX, function (item) {
                var itemId = item.itemId;
                var actItem = Ext.getCmp(itemId);
                if (actItem) {
                    var align = actItem.getIxAlign();
                    align._$ixTargetId = targetId;
                    listView._$ixAlignTargetIds = listView._$ixAlignTargetIds || [];
                    listView._$ixAlignTargetIds.push(itemId);
                }
                item.targetId = targetId;
            });
            if (listView.ixIsListView === true) {
                if (listView.hasListeners.ixselection) {
                    // 如果存在事件监听，在事件处理前插入处理
                    listView.onBefore('ixselection', me.ixOnSelection, me);
                } else {
                    // 添加选择事件处理
                    listView.addListener('ixselection', me.ixOnSelection, me);
                }
                me.ixOnSelection(listView, []);
            }
        }
    }

});