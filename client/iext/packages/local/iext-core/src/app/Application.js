/**
 * @class iExt.app.Application
 * @extends {Ext.app.Application}
 * @classdesc 应用程序的基础类。
 * logon / logoff 是应用程序级别的处理，应该放在Application中。
 */
Ext.define('iExt.app.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.app.*',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',

        'iExt.app.Runtime'
    ],

    controllers: [
        'iExt.app.controller.Main',
        'iExt.app.controller.Identity',
        'iExt.app.controller.Help',
        'iExt.app.controller.Console'
    ],

    ixIsApp: true,

    config: {
        /**
         * 配置文件地址
         */
        ixConfigFile: 'resources/config.json',

        /**
         * 启用的Aop
         */
        ixAops: null,

        /**
         * 登录视图，例如：'app.view.Logon'
         * 如果使用框架视图组件，要指定完全限定名，不能使用别名
         * 例如：iExt.app.view.Logon
         */
        ixLogonView: null,

        /**
         * 主视图，例如：'app.view.Home'
         */
        ixMainView: null,

        /**
         * 控制台视图
         */
        ixConsoleView: null
    },

    /**
     * 重载启动前（onBeforeLaunch）事件处理。加载配置文件；
     * 设置全局http request filter；初始化应用系统配置ixOnAppStartUp。
     * @memberOf iExt.app.Application#
     */
    onBeforeLaunch: function () {
        //<debug>
        iExt.log('应用程序准备加载', this.getName());
        //</debug>

        var me = this;

        //TODO: 根据用户保存的登录信息，自动选择不同的视图？
        var viewName = me.getIxLogonView();
        if (!viewName) {
            viewName = me.getIxMainView();
        }
        me.ixChangeView(viewName);

        me.callParent(arguments);
    },

    /**
     * 应用程序更新（onAppUpdate）事件处理。
     * @memberOf iExt.app.Application#
     */
    onAppUpdate: function () {
        Ext.Msg.confirm('系统更新', '系统存在新的版本，是否重新加载？',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    ixChangeView: function (viewName, viewConfig) {
        Ext.WindowManager.each(function (win) {
            win.destroy();
        });

        var view = this.getView(viewName);
        if (view) {
            if (this._ixCurrentView) {
                this._ixCurrentView.destroy();
            }
            this._ixCurrentView = view.create(viewConfig);
        }
    }

});