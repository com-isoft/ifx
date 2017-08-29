/**
 * @class iExt.app.view.window.Search
 * @extends {iExt.app.view.window.Base} 
 * @classdesc iExt 详细搜索视图窗口类。
 */
Ext.define('iExt.app.view.window.Search', {
    extend: 'iExt.app.view.window.Base',
    alias: 'widget.ixsearchwin',

    maximizable: false,
    minimizable: false,
    closeAction: 'hide',

    /**
     * 缺省标题
     */
    title: '详细搜索',

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

    /**
     * 当前视图变更模板方法
     * @param {Ext.Component} view 变更的视图
     */
    ixOnViewChanged: function (view) {
        var me = this;
        if (view) {
            if (view.ixIsFilterView !== true) {
                Ext.raise('指定的视图不是搜索视图！');
            }
            view.on('ixvaliditychange', me._ixOnIxValidityChange, me);
        }
    },

    privates: {

        /**
         * 获取搜索的处理按钮
         */
        _ixGetButtons: function () {
            var me = this;
            return [{
                text: '清空',
                iconCls: 'x-fa fa-clipboard',
                listeners: {
                    click: {
                        fn: me._ixOnClear,
                        scope: me
                    }
                }
            }, '->', {
                xtype: 'button',
                text: '确定',
                iconCls: 'x-fa fa-filter',
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
                        fn: me.ixOnCancel,
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
         * 清除窗口内容的事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnClear: function (item, e, eOpts) {
            var me = this,
                view = me.ixGetCurrentView();
            if (view) {
                me.ixClear();
            }
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
            if (view) {
                var eventName = view.ixEventName || 'ixsearch';
                var filters = view.ixGetFilters();
                var itemId = me.getIxEventItemId();
                // 获取搜索操作组件，触发 ixsearch 事件
                var cmp = Ext.getCmp(itemId);
                if (cmp) {
                    cmp.fireEvent(eventName, cmp, filters);
                }
            }
            me.close();
        }

    }

});