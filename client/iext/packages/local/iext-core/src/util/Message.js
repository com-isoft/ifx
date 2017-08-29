/**
 * @class iExt.util.Message
 * @classdesc 提示信息帮助类。
 */
Ext.define('iExt.util.Message', {
    alternateClassName: 'iExt.Msg',
    singleton: true,

    requires: [
        'Ext.window.MessageBox'
    ],

    /**
     * 显示API调用错误信息。
     * @memberOf iExt.util.Message#
     * @param {Object} operation 操作信息。
     * @param {Function} fn 回调函数。
     * @param {Object} scope 作用域。
     * @param {Object} config MessageBox的配置信息。
     */
    ixApiFailed: function (operation, fn, scope, config) {
        var message = '数据处理失败！';
        if (operation && operation.exception === true) {
            var response = operation.getError().response;
            if (response && response.responseText) {
                var data = Ext.decode(response.responseText, true);
                message = data.details;
            }
        }
        var cfg = {
            message: message,
            fn: fn,
            scope: scope,
            title: iExt.title + '-警告信息',
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        };
        this.ixShow(cfg, config);
    },

    /**
     * 显示提示信息。
     * @memberOf iExt.util.Message#
     * @param {String|String[]} message 操作信息或数组。
     * @param {Function} fn 回调函数。
     * @param {Object} scope 作用域。
     * @param {Object} config MessageBox的配置信息。
     */
    ixInfo: function (message, fn, scope, config) {
        var cfg = {
            message: message,
            fn: fn,
            scope: scope,
            title: iExt.title + '-提示信息',
            icon: Ext.MessageBox.INFO,
            buttons: Ext.Msg.OK
        };
        this.ixShow(cfg, config);
    },

    /**
     * 显示警告信息。
     * @memberOf iExt.util.Message#
     * @param {String|String[]} message 操作信息或数组。
     * @param {Function} fn 回调函数。
     * @param {Object} scope 作用域。
     * @param {Object} config MessageBox的配置信息。
     */
    ixAlert: function (message, fn, scope, config) {
        var cfg = {
            message: message,
            fn: fn,
            scope: scope,
            title: iExt.title + '-警告信息',
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        };
        this.ixShow(cfg, config);
    },

    /**
     * 显示确认信息。
     * @memberOf iExt.util.Message#
     * @param {String|String[]} message 操作信息或数组。
     * @param {Function} fn 回调函数。
     * @param {Object} scope 作用域。
     * @param {Object} config MessageBox的配置信息。
     */
    ixConfirm: function (message, fn, scope, config) {
        var cfg = {
            message: message,
            callback: fn,
            scope: scope,
            title: iExt.title + '-确认信息',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO
        };

        this.ixShow(cfg, config);
    },

    /**
     * 显示进度信息。
     * @memberOf iExt.util.Message#
     * @param {String|String[]} message 操作信息或数组。
     * @param {String} progressText 进度信息。
     * @param {Object} config MessageBox的配置信息。
     */
    ixProgress: function (message, progressText, config) {
        var cfg = {
            title: iExt.title + '-执行中...',
            message: message,
            progressText: progressText,
            progress: true,
            closable: false,
            draggable: false,
            resizable: false,
            width: 300
        };

        this.ixShow(cfg, config);
    },

    /**
     * 显示信息。
     * @memberOf iExt.util.Message#
     * @param {Object} config MessageBox的配置信息。
     * @param {Object} userConfig MessageBox的配置信息。
     */
    ixShow: function (config, userConfig) {
        if (Ext.isArray(config.message)) {
            config.message = config.message.join('<br/>');
        }
        var cfg = {
            title: iExt.title + '-提示信息'
        };
        Ext.apply(cfg, config);
        if (userConfig) {
            Ext.apply(cfg, userConfig);
        }
        Ext.Msg.show(cfg);
    }

});