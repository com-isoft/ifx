/**
 * @class iExt.app.view.container.Quick
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 快速查看视图容器。
 */
Ext.define('iExt.app.view.container.Quick', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixquickcontainer',

    requires: [],

    cls: 'ix-quick-container',
    bodyCls: 'ix-quick-container-body',
    title: '快速查看',

    /**
     * 视图类型
     */
    ixViewType: 'quick',

    /**
     * 快速查看视图容器直接设置视图
     */
    applyIxView: function (view) {
        var me = this;
        if (view) {
            view = iExt.View.ixGetView(view);
            if (me.rendered) {
                me.removeAll();
                me.add(view);
            } else {
                me.items = [];
                me.items.push(view);
            }
        }
        return view;
    },

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: function () {
        var me = this;
        me.tools = [{
            iconCls: 'x-fa fa-chevron-right',
            tooltip: '隐藏',
            callback: me._ixHideMe
        }];
        me.tbar = {
            xtype: 'toolbar',
            items: [{
                xtype: 'ixtbrtitle',
                ixScale: 'medium',
                flex: 1,
                bind: {
                    text: '{ixvc.subTitle}'
                }
            }, '->', {
                xtype: 'ixtbrholder',
                scale: 'small'
            }]
        };
    },

    privates: {

        _ixHideMe: function (owner, tool, e) {
            owner.hide();
        }
    }

});