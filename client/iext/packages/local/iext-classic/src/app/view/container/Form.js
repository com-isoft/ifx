/**
 * @class iExt.app.view.container.Form
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 表单视图容器。
 */
Ext.define('iExt.app.view.container.Form', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixformcontainer',

    requires: [],

    cls: 'ix-form-container',
    bodyCls: 'ix-form-container-body',

    layout: 'auto',
    scrollable: 'y',
    title: '表单',

    config: {
        /**
         * 表单视图。
         */
        ixView: null,

        /**
         * 操作组件集合。
         */
        ixActionItems: [],

        /**
         * 返回的数据。
         */
        ixReturn: null,

        /**
         * 是否检查脏数据。
         */
        ixDirtyCheck: true
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
        me.on('beforeclose', me._ixOnBeforeClose, me);
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

        me.tbar = {
            xtype: 'ixacttbr',
            items: items
        };
    },

    /**
     * 设置缺省视图
     */
    ixSetDefaultView: function () {
        var me = this,
            view = me.getIxView();
        if (view) {
            Ext.suspendLayouts();
            me.removeAll();
            me.add(view);
            Ext.resumeLayouts(true);
        }
    },

    /**
     * 当前视图变更模板方法
     */
    ixOnViewChanged: function (view) {
        var me = this;
        if (view) {
            if (view.ixIsFormView !== true) {
                Ext.raise('指定的视图不是表单视图！');
            }
        }
        me.callParent(arguments);
    },

    ixOnBeforeAdd: function (panel, component, index, eOpts) {
        var me = this;
        var params = me.getIxParams();
        component.setIxParams(params);
    },

    privates: {

        _ixOnClose: function () {
            var me = this;
            if (me.hasListeners.ixclose) {
                me.fireEvent('ixclose', me, Ext.clone(me.getIxReturn()));
            }
        },

        _ixOnBeforeClose: function () {
            var me = this;
            var view = me.ixGetCurrentView();
            if (!view) {
                return true;
            }

            // 确认后或者忽略检测时直接关闭
            if (me.getIxDirtyCheck() === false || me._ixConfirmed === true) {
                me._ixOnClose();
                return true;
            }

            if (me._ixConfirmed !== true && view.ixIsDirty() === true) {
                iExt.Msg.ixConfirm('存在未保存的信息，是否退出？', me._ixConfirm, me);
                return false;
            } else {
                // 未存在脏数据时也需要触发关闭事件
                me._ixOnClose();
                return true;
            }
        },

        /**
         * 确认关闭处理。
         * @memberOf iExt.app.view.container.Form#
         * @private
         * @param {String} btn 按钮标识。
         */
        _ixConfirm: function (btn) {
            var me = this;
            if (btn === 'yes') {
                me._ixConfirmed = true;
                me._ixOnClose();
                me[me.closeAction]();
            }
        }

    }

});