/**
 * @class iExt.app.controller.Main
 * @extends {Ext.app.Controller} 
 * @classdesc iExt 应用程序主控制器。
 */
Ext.define('iExt.app.controller.Main', {
    extend: 'Ext.app.Controller',

    /**
     * 初始化处理。
     * @memberOf iExt.app.controller.Main#
     * @param {Exp.app.Application} app 应用程序
     */
    init: function (app) {
        //<debug>
        iExt.log('应用程序初始化', app.getName());
        //</debug>

        // 关闭 aria 警告信息
        Ext.ariaWarn = Ext.emptyFn;

        Ext.Error.handle = this.ixOnError;
        Ext.tip.QuickTipManager.init();

        Ext.JSON.encodeDate = function (d) {
            return Ext.Date.format(d, '"C"');
        };

        this.listen({
            global: {
                idle: this.ixOnIdle
            }
        });

    },

    ixOnIdle: function () {
        //<debug>
        //iExt.log('应用程序处于空闲');
        //</debug>
    },

    /**
     * 自定义全局例外处理。
     * @memberOf iExt.app.controller.Main#
     * @param {Object} err 异常信息对象。
     * @returns {Boolean} 是否处理了异常。
     */
    ixOnError: function (err) {
        var msg = [];
        if (Ext.isArray(err)) {
            msg = err;
        } else if (Ext.isObject(err)) {
            // <debug>
            if (err.sourceClass) {
                msg.push('对象：' + err.sourceClass);
            }
            if (err.sourceMethod) {
                msg.push('方法：' + err.sourceMethod);
            }
            // </debug>
            msg.push('信息：' + err.msg);
        } else {
            msg.push('信息：' + err);
        }
        msg = msg.join('<br/>');
        Ext.MessageBox.alert({
            title: '异常信息',
            message: msg,
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.OK
        });
        // 返回true表示异常已经捕获并且进行了处理。
        return true;
    }

});