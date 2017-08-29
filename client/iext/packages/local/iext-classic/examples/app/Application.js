/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('app.Application', {
    extend: 'iExt.app.Application',

    requires: [
        'app.view.main.AppMain',
        'iExt.*'
    ],

    name: 'app',

    ixMainView: 'app.view.main.AppMain',
    ixLogonView: 'iExt.app.view.Logon',
    ixConsoleView: 'ixconsole',

    /* 可以重载基类的设置，取消其他的控制器
    controllers: [
        'iExt.app.controller.Main'
    ],
    */

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
        Ext.ariaWarn = Ext.emptyFn;
    }

});