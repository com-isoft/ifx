/**
 * @class iExt.util.Toast
 * @classdesc HFX前端框架提示信息帮助类。
 */
Ext.define('iExt.util.Toast', {
    alternateClassName: 'iExt.Toast',
    singleton: true,

    requires: [
        'Ext.window.Toast'
    ],

    /**
     * 显示提示信息。
     * @memberOf iExt.util.Toast#
     * @param {String} msg 提示的信息。
     */
    ixInfo: function (msg) {
        var me = this;

        Ext.toast({
            html: msg || '&#160;',
            closable: false,
            align: 't',
            slideInDuration: 100,
            renderTo: Ext.getBody()
        });
    }

});