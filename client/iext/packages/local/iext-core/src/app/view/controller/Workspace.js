/**
 * @class iExt.app.view.controller.Workspace
 * @extends {Ext.app.ViewController} 
 * @classdesc iExt 工作区控制器。
 */
Ext.define('iExt.app.view.controller.Workspace', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ixws',

    /**
     * 重载初始化（init）事件处理。绑定事件处理。
     * @memberOf iExt.app.view.controller.Workspace#
     * @param {Ext.Component} view 视图对象。
     */
    init: function (view) {
        //<debug>
        iExt.log('工作区初始化', view.$className);

        if (view.ixIsWorkspace !== true) {
            Ext.raise("关联的视图不是工作区视图！");
        }
        //</debug>

        var me = this;

        me.listen({
            component: {
                "*": {
                    // 打开视图的事件监听
                    ixopenview: me.ixOnOpenView,
                    // 打开页面的事件监听
                    ixopenpage: me.ixOnOpenPage,
                    // 显示提示信息事件监听
                    // 组件使用 ixshowtip 事件名称
                    ixshowtip: me.ixOnShowTip
                }
            },
            controller: {
                "*": {
                    // 显示提示信息事件监听
                    // 控制器使用 ixtip 事件名称
                    ixtip: me.ixOnShowTip
                }
            }
        });

        me.callParent(arguments);
    },

    /**
     * 打开视图。
     * 每种布局方案可以有不同的打开方式。
     */
    ixOnOpenView: function () {
        var ws = this.getView();
        return ws.ixOpenView.apply(ws, arguments);
    },

    /**
     * 打开页面。
     * 每种布局方案可以有不同的打开方式。
     */
    ixOpenPage: function () {
        var ws = this.getView();
        return ws.ixOpenPage.apply(ws, arguments);
    },

    /**
     * 显示提示信息
     */
    ixOnShowTip: function (msg) {
        var ws = this.getView();
        return ws.ixShowTip.apply(ws, arguments);
    }

});