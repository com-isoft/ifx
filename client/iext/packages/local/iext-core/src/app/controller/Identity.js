/**
 * @class iExt.app.controller.Identity
 * @extends {Ext.app.Controller} 
 * @classdesc iExt 身份认证控制器。
 */
Ext.define('iExt.app.controller.Identity', {
    extend: 'Ext.app.Controller',

    /**
     * 初始化处理。
     * @memberOf iExt.app.controller.Identity#
     * @param {Exp.app.Application} app 应用程序
     */
    init: function (app) {
        //<debug>
        iExt.log('身份认证初始化', app.getName());
        //</debug>

        var me = this;

        // 配置Ajax事件处理程序
        Ext.Ajax.on('beforerequest', me.ixOnAjaxBeforeRequest, me);
        Ext.Ajax.on('requestexception', me.ixOnAjaxRequestException, me);
        Ext.Ajax.on('requestcomplete', me.ixOnAjaxRequestComplete, me);

        this.listen({
            component: {
                "*": {
                    ixlogon: me.ixOnLogon,
                    ixlogoff: me.ixOnLogoff
                }
            }
        });

    },

    /**
     * 登录系统。
     * @memberOf iExt.app.controller.Identity#
     * @param {String} code 用户代码
     * @param {String} password 用户口令
     */
    ixOnLogon: function (code, password) {
        //<debug>
        iExt.log('调用登录系统', code);
        //</debug>

        var me = this;

        var app = me.getApplication();
        var viewName = app.getIxMainView();
        if (viewName) {
            app.ixChangeView(viewName, {
                ixUser: {
                    code: code,
                    name: code + '\'s name'
                }
            });
        } else {
            Ext.raise('未配置应用的主视图！');
        }

        /*
        if (iExt.aop.auth.Identity.ixApiEnabled('ixLogon') === false) {
            Ext.raise('未提供身份认证服务！');
            return false;
        }
        var fnThen = function (user) {
            iExt.app.Runtime.setIxUser(user);
            me._ixLoadView(me.getIxMainView());
        };

        iExt.aop.auth.Identity.ixApiCall('ixLogon', code, password).then(
           fnThen).done();
        */
    },

    /**
     * 退出系统。
     * @memberOf iExt.app.controller.Identity#
     */
    ixOnLogoff: function () {
        //<debug>
        iExt.log('应用程序退出');
        //</debug>

        var me = this;
        iExt.Msg.ixConfirm('是否退出系统？', function (btn) {
            if (btn === 'yes') {
                var app = me.getApplication();
                var viewName = app.getIxLogonView();
                if (viewName) {
                    /*
                    if (iExt.aop.auth.Identity.ixApiEnabled('ixLogoff') === true) {
                        iExt.aop.auth.Identity.ixApiCall('ixLogoff');
                    }
                    */
                    app.ixChangeView(viewName);
                } else {
                    Ext.raise('未配置应用的登录视图！');
                }
            }
        });
    },

    /**
     * AjaxBeforeRequest
     * @memberOf iExt.app.controller.Identity#
     */
    ixOnAjaxBeforeRequest: function (conn, options, eOpts) {
        //<debug>
        iExt.log('AjaxBeforeRequest');
        //</debug>

        /*
        var token = '', user = iExt.app.Runtime.getIxUser(),
            uuid = Ext.data.identifier.Uuid.create().generate();

        if (user) {
            token = user.token;
        }
        options.headers = options.headers || {};
        Ext.apply(options.headers, {
            'Request-Id': uuid,
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': token
        });
        */
    },

    /**
     * AjaxRequest
     * @memberOf iExt.app.controller.Identity#
     */
    ixOnAjaxRequestComplete: function (conn, response, options, eOpts) {
        //<debug>
        iExt.log('AjaxRequest');
        //</debug>

    },

    /**
     * AjaxRequestException
     * @memberOf iExt.app.controller.Identity#
     */
    ixOnAjaxRequestException: function (conn, response, options, eOpts) {
        //<debug>
        iExt.log('AjaxRequestException');
        //</debug>

        /*
        // 当前用户的token不合法， 默认跳转到登录页面。
        if (response.status === 401) {
            this._ixSessionExpired();
            return false;
        }
        var uuid = options.headers['Request-Id'];

        var msg = [];
        if (iExt.Runtime.ixIsDevelop() === true) {
            msg.push('请求标识：' + uuid);
            msg.push('请求地址：' + options.url);
        }
        if (response.status) {
            if (response.status === 404) {
                msg.push('提示信息：请求的资源不存在！');
                //for (var p in options) {
                //    Ext.log(p + ':' + options[p]);
                //}
            } else {
                var responseObject = Ext.decode(response.responseText);
                msg.push('提示信息：' + responseObject.message);
                var len = responseObject.details.length;
                if (len > 0) {
                    msg.push('详细信息：' + responseObject.details[0]);
                }
            }
        } else {
            msg.push('提示信息：请求的服务发生错误！');
        }
        Ext.raise(msg);
        */
        return;
    }

});