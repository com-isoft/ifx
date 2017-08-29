/**
 * @class iExt.app.controller.Help
 * @extends {Ext.app.Controller} 
 * @classdesc iExt 在线帮助控制器。
 */
Ext.define('iExt.app.controller.Help', {
    extend: 'Ext.app.Controller',

    /**
     * 初始化处理。
     * @memberOf iExt.app.controller.Help#
     * @param {Exp.app.Application} app 应用程序
     */
    init: function (app) {
        //<debug>
        iExt.log('在线帮助初始化', app.getName());
        //</debug>

        var me = this;

        if (app.ixIsApp === true) {
            // 设置查看帮助快捷键 ctrl + shift + h
            var keyMap = new Ext.util.KeyMap({
                target: Ext.getBody(),
                key: "h",
                ctrl: true,
                shift: true,
                fn: me.ixOnHelp.bind(me)
            });

            me.listen({
                component: {
                    "*": {
                        ixhelp: me.ixOnHelp,
                        ixnohelp: me.ixOnQueryHelp
                    }
                }
            });
        }
        me.callParent(arguments);
    },

    /**
     * 显示帮助信息
     */
    ixOnHelp: function () {
        var me = this;
        iExt.Msg.ixInfo('显示帮助信息...');
    },

    /**
     * 查询帮助是否可用
     */
    ixOnQueryHelp: function () {
        return false;
    }

});