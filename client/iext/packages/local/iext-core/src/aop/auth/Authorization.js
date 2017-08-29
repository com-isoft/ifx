/**
 * @class iExt.aop.auth.Authorization
 * @classdesc 用户授权接口。
 */
Ext.define('iExt.aop.auth.Authorization', {
    singleton: true,

    mixins: [
        'iExt.aop.Aop'
    ],

    requires: [
        'iExt.app.Runtime'
    ],

    /**
     * 授权初始化
     */
    ixInited: function () {
        var ixActionIsAuthedApi = this.ixApis.ixActionIsAuthed;
        var ixGetUserAuthApi = this.ixApis.ixGetUserAuth;

        if (ixActionIsAuthedApi && ixActionIsAuthedApi) {
            ixActionIsAuthedApi.enabled =
                ixActionIsAuthedApi.enabled && ixActionIsAuthedApi.enabled;
        }
    },

    /**
     * 授权的应用。
     */
    ixGetUserApps: function () {
        var d = new Ext.Deferred();
        d.resolve([{
            code: 'huc',
            name: '权限管理'
        }, {
            code: 'htc',
            name: '培训管理'
        }, {
            code: 'hcrm',
            name: 'CRM管理'
        }]);
        return d.promise;
    },

    /**
     * 获取用户菜单。
     */
    ixGetUserMenu: function (menuId) {
        // todo
    },

    /**
     * 服务是否授权
     */
    ixServiceIsAuthed: function (service) {
        var me = this,
            d = new Ext.Deferred();

        if (me._ixCache[service]) {
            d.resolve(me._ixCache[service]._authed);
        } else {
            me._ixGetUserAuth(service).then(
                function (authService) {
                    d.resolve(authService[service]._authed);
                },
                function (reason) {
                    d.reject(reason);
                }
            );
        }
        return d.promise;
    },

    /**
     * 操作是否授权
     */
    ixActionIsAuthed: function (service, action) {
        var me = this,
            d = new Ext.Deferred();
        if (me._ixCache[service]) {
            d.resolve(me._ixIsAuthed(me._ixCache[service], action));
        } else {
            me._ixGetUserAuth(service).then(
                function (authService) {
                    d.resolve(me._ixIsAuthed(authService[service], action));
                },
                function (response, opts) {
                    d.reject(response);
                });
        }
        return d.promise;
    },

    /**
     * 获取服务操作的授权范围
     */
    ixGetActionScope: function (service, action) {
        var me = this,
            d = new Ext.Deferred();
        if (me._ixCache[service]) {
            d.resolve(me._ixGetScope(me._ixCache[service], action));
        } else {
            me._ixGetUserAuth(service).then(
                function (authService) {
                    d.resolve(me._ixGetScope(authService[service], action));
                },
                function (response, opts) {
                    d.reject(response);
                });
        }
        return d.promise;
    },

    /**
     * 获取服务授权信息
     */
    ixGetUserAuth: function (services) {
        if (Ext.isArray(services)) {
            return this._ixGetUserAuths(services);
        } else {
            return this._ixGetUserAuth(services);
        }
    },

    privates: {

        /**
         * 内部缓存权限对象。
         * @memberOf iExt.aop.auth.Authorization#
         * @private
         */
        _ixCache: {},

        /**
         * 
         */
        _ixIsAuthed: function (authService, action) {
            if (!authService) {
                return false;
            }
            if (authService.hasOwnProperty('*')) {
                return true;
            }
            var authAction = authService[action];
            if (!authAction) {
                return false;
            }
            return authAction !== iExt.aop.auth.Scope.NONE;
        },

        /**
         * 
         */
        _ixGetScope: function (authService, action) {
            var scope = iExt.aop.auth.Scope.NONE;
            if (!authService) {
                return scope;
            }
            if (authService.hasOwnProperty('*')) {
                return authService['*'];
            }
            var authAction = authService[action];
            if (!authAction) {
                return scope;
            }
            return authAction;
        },

        /**
         * 
         */
        _ixGetUserAuths: function (services) {
            var me = this;
            var promises = [],
                result = {};

            Ext.each(services, function (service) {
                promises.push(me._ixGetUserAuth(service));
            });

            return Ext.Deferred.all(promises).then(function (data) {
                Ext.each(data, function (item) {
                    Ext.apply(result, item);
                });
                return result;
            }, function (errors) {
                return errors;
            });
        },

        /**
         * 
         */
        _ixGetUserAuth: function (service) {
            var me = this,
                d = new Ext.Deferred();
            // 如果是开发模式，不获取菜单权限
            if (iExt.app.Runtime.ixIsDevelop()) {
                me._ixCache[service] = {
                    '*': iExt.aop.auth.Scope.GROUP,
                    _authed: true
                };
                var result = {};
                result[service] = Ext.clone(me._ixCache[service]);
                d.resolve(result);
            } else {
                me._ixAjaxCall('ixGetUserAuth', {
                    systemCode: iExt.app.Runtime.getIxAppId(),
                    serviceCode: service
                }).then(
                    function (response, opts) {
                        var records = response.responseText,
                            actions = {
                                _authed: true
                            };
                        if (records) {
                            records = Ext.decode(records);
                        }
                        if (records && records.length > 0) {
                            Ext.each(records, function (item) {
                                actions[item.actionCodes] = item.dataScope;
                            });
                        }
                        me._ixCache[service] = actions;
                        var result = {};
                        result[service] = Ext.clone(me._ixCache[service]);
                        d.resolve(result);
                    },
                    function (response, opts) {
                        d.reject(response);
                    }
                );
            }
            return d.promise;
        }

    }

});