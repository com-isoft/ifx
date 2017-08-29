/**
 * @class iExt.aop.auth.Identity
 * @classdesc 用户身份验证接口
 */
Ext.define('iExt.aop.auth.Identity', {
    singleton: true,

    requires: [],

    mixins: [
        'iExt.aop.Aop'
    ],

    /**
     * 用户登录
     */
    ixLogon: function (code, password) {
        password = Ext.util.Base64.encode(password);
        var d = new Ext.Deferred();

        this._ixAjaxCall('ixLogon', {
            code: code,
            password: password
        }).then(
            function (response, options) {
                var user = response.responseText;
                if (user) {
                    user = Ext.decode(user);
                }
                d.resolve(user);
            },
            function (error, options) {
                d.reject(error);
            });
        return d.promise;
    },

    /**
     * 注销
     */
    ixLogoff: function () {

    },

    /**
     * 变更口令
     */
    ixChangePassword: function (oldPwd, newPwd) {
        oldPwd = Ext.util.Base64.encode(oldPwd);
        newPwd = Ext.util.Base64.encode(newPwd);
        var d = new Ext.Deferred();
        d.resolve({});
        return d.promise;
    }

});