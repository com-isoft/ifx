/**
 * @class iExt.app.view.controller.FormContainer
 * @extends {iExt.app.view.controller.Form} 
 * @classdesc iExt 列表视图控制器类。
 */
Ext.define('iExt.app.view.controller.FormContainer', {
    extend: 'iExt.app.view.controller.Form',
    alias: 'controller.ixformcontainer',

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
     * @memberOf iExt.app.controller.FormContainer#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnViewInited: function (view, auths) {
        view.ixSetDefaultView();
    },

    privates: {

        /**
         * 视图变更事件处理。
         * @memberOf iExt.app.controller.FormContainer#
         * @param {Ext.Component} view 视图对象。
         * @param {iExt.mixin.FormView} formView 表单视图。
         */
        _ixOnViewChanged: function (view, formView) {
            var me = this,
                targetId = formView.getId();

            me._$ixActionTargetRefX = me._$ixActionTargetRefX || [];
            Ext.each(me._$ixActionTargetRefX, function (item) {
                var itemId = item.itemId;
                var actItem = Ext.getCmp(itemId);
                if (actItem) {
                    var align = actItem.getIxAlign();
                    align._$ixTargetId = targetId;
                    formView._$ixAlignTargetIds = formView._$ixAlignTargetIds || [];
                    formView._$ixAlignTargetIds.push(itemId);
                }
                item.targetId = targetId;
            });
            if (formView.ixIsFormView === true) {
                if (formView.hasListeners.ixvaliditychange) {
                    // 如果存在事件监听，在事件处理前插入处理
                    formView.onBefore('ixvaliditychange', me.ixOnValidityChange, me);
                } else {
                    // 添加选择事件处理
                    formView.addListener('ixvaliditychange', me.ixOnValidityChange, me);
                }
                var valid = formView.ixIsValid();
                me.ixOnValidityChange(formView, valid);
            }

            // 加载数据
            me.ixLoadRecord(formView);
        }
    }

});