/**
 * @class iExt.app.controller.Console
 * @extends {Ext.app.Controller} 
 * @classdesc iExt 控制台控制器。
 */
Ext.define('iExt.app.controller.Console', {
    extend: 'Ext.app.Controller',

    /**
     * 初始化处理。
     * @memberOf iExt.app.controller.Console#
     * @param {Exp.app.Application} app 应用程序
     */
    init: function (app) {
        //<debug>
        iExt.log('控制台初始化', app.getName());
        //</debug>

        var me = this;

        if (app.ixIsApp === true) {
            var view = app.getIxConsoleView();

            if (view) {

                // 设置查看控制台快捷键 ctrl + shift + l
                var keyMap = new Ext.util.KeyMap({
                    target: Ext.getBody(),
                    key: "l",
                    ctrl: true,
                    shift: true,
                    fn: me.ixOnDebug.bind(me)
                });

                me.listen({
                    component: {
                        "*": {
                            ixdebug: me.ixOnDebug
                        }
                    }
                });

                me._ixConsole = { xtype: view };
            } else {
                //<debug>
                iExt.log('未设置控制台视图', app.getName());
                //</debug>
            }
        }
        me.callParent(arguments);
    },

    /**
     * 打开控制台
     */
    ixOnDebug: function () {
        var me = this;
        if (!me._ixConsole.isComponent) {
            me._ixConsole = Ext.create(me._ixConsole);
        }
        if (me._ixConsole && me._ixConsole.isWindow === true) {
            me._ixConsole.center();
            me._ixConsole.show();
        }
    },

    destroy: function () {
        var me = this;
        Ext.destroyMembers(me, '_ixConsole');
        me.callParent(arguments);
    },

    privates: {

        /**
         * 控制台组件
         */
        _ixConsole: null

    }

});