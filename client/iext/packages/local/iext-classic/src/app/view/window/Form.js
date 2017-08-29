/**
 * @class iExt.app.view.window.Form
 * @extends {iExt.app.view.window.Base} 
 * @classdesc iExt 表单视图窗口类。
 */
Ext.define('iExt.app.view.window.Form', {
    extend: 'iExt.app.view.window.Base',
    alias: 'widget.ixformwin',

    maximizable: false,
    minimizable: false,
    closeAction: 'destroy',
    viewModel: true,

    /**
     * 缺省标题
     */
    title: '表单',

    /**
     * 是否检查脏数据。
     */
    ixDirtyCheck: true,

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: function () {
        var me = this;
        me.fbar = {
            xtype: 'toolbar',
            items: me._ixGetButtons()
        };
    },

    ixOnBeforeClose: function () {
        var me = this;
        var view = me.ixGetCurrentView();
        if (!view) {
            return true;
        }

        // 确认后或者忽略检测时直接关闭
        if (me.getIxDirtyCheck() === false || me._ixConfirmed === true) {
            me.ixOnClose();
            return true;
        }

        if (me._ixConfirmed !== true && view.ixIsDirty() === true) {
            iExt.Msg.ixConfirm('存在未保存的信息，是否退出？', me._ixConfirm, me);
            return false;
        } else {
            // 未存在脏数据时也需要触发关闭事件
            me.ixOnClose();
            return true;
        }
    },

    /**
     * 当前视图变更模板方法
     * @param {Ext.Component} view 变更的视图
     */
    ixOnViewChanged: function (view) {
        var me = this;
        if (view) {
            if (view.ixIsFormView !== true) {
                Ext.raise('指定的视图不是表单视图！');
            }
            view.on('ixvaliditychange', me._ixOnIxValidityChange, me);
        }
        delete me._ixConfirmed;
    },

    privates: {

        /**
         * 获取搜索的处理按钮
         */
        _ixGetButtons: function () {
            var me = this;
            return ['->', {
                xtype: 'button',
                text: '保存',
                iconCls: 'x-fa fa-save',
                reference: '_btnOk',
                listeners: {
                    click: {
                        fn: me._ixOnOk,
                        scope: me
                    }
                }
            }, {
                xtype: 'button',
                text: '取消',
                iconCls: 'x-fa fa-close',
                listeners: {
                    click: {
                        fn: me._ixOnCancel,
                        scope: me
                    }
                }
            }];
        },

        _ixOnIxValidityChange: function (item, valid) {
            var me = this,
                enable = valid,
                refs = me.getReferences();
            var btnOk = refs._btnOk;
            btnOk.setDisabled(!enable);
        },

        /**
         * 搜索事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this,
                view = me.ixGetCurrentView();

            me.close();
        },

        /**
         * 关闭事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnCancel: function (item, e, eOpts) {
            var me = this;
            me.close();
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
                me.ixOnClose();
                me[me.closeAction]();
            }
        }

    }

});