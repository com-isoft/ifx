/**
 * @class iExt.app.view.window.Lookup
 * @extends {iExt.app.view.window.Base} 
 * @classdesc iExt 参照视图窗口类。
 */
Ext.define('iExt.app.view.window.Lookup', {
    extend: 'iExt.app.view.window.Base',
    alias: 'widget.ixlookupwin',

    maximizable: true,
    minimizable: false,
    closeAction: 'hide',
    bodyPadding: 0,

    /**
     * 缺省标题。
     */
    title: '详细搜索',

    /**
     * 设置容器的工具栏。
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
            if (view.ixIsListView !== true) {
                Ext.raise('指定的视图不是列表视图！');
            }
            view.on('ixselection', me._ixOnIxSelection, me);
            me._ixMulti = view.getIxMulti();
        }
    },

    /**
     * 渲染后处理。
     */
    ixOnAfterRender: function (win, eOpts) {
        var me = this;
        me._ixOnIxSelection(null, []);
    },

    privates: {

        _ixMulti: false,

        /**
         * 获取搜索的处理按钮。
         */
        _ixGetButtons: function () {
            var me = this;
            return ['->', {
                xtype: 'button',
                text: '确定',
                iconCls: 'x-fa fa-check',
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

        _ixOnIxSelection: function (sm, records) {
            var me = this,
                enable,
                refs = me.getReferences(),
                btnOk = refs._btnOk;
            if (records && records.length > 0) {
                if (records.length > 1 && me._ixMulti === false) {
                    enable = false;
                } else {
                    enable = true;
                }
            }
            btnOk.setDisabled(!enable);
        },

        /**
         * 选择数据事件处理。
         * @param {Ext.Compomnent} item 触发事件的组件。
         * @param {Event} e 事件。
         * @param {Object} eOpts 事件选项。
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this,
                view = me.ixGetCurrentView();
            if (view) {
                me.setIxReturn(view.ixGetSelectedData());
            }
            me.close();
        }

    }

});