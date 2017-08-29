/**
 * @class iExt.data.Model
 * @extends {Ext.data.Model} 
 * @classdesc 实体模型基类。
 */
Ext.define('iExt.data.Model', {
    extend: 'Ext.data.Model',

    requires: [

    ],

    ixApiConfig: {
        /**
         * app 标识
         */
        ixAppId: null,
        /**
         * 服务标识，例如：user、menu
         */
        ixService: null,
        /**
         * 操作集合，例如：
         * { ixCode: 'resetPassword', ixMethod: 'PUT' },
         * { ixCode: 'active', ixMethod: 'PUT' },
         * { ixCode: 'inactive', ixMethod: 'PUT' }
         */
        ixApis: []
    },

    statics: {

        /**
         * 获取数据访问代理。
         * @memberOf iExt.data.Model#
         * @static
         * @return {iExt.data.proxy.Rest} 数据访问代理。
         */
        getProxy: function () {
            var me = this, url, proxy;
            var apiCfg = me.ixApiConfig;

            if (apiCfg) {
                if (!apiCfg.ixService) {
                    var names = me.$className.split('.');
                    me.ixApiConfig.ixService =
                        Ext.String.uncapitalize(names[names.length - 1]);
                    url = '/' + apiCfg.ixService + 's';
                } else {
                    if (Ext.isString(apiCfg.ixService)) {
                        url = '/' + Ext.String.uncapitalize(apiCfg.ixService) + 's';
                    } else if (Ext.isObject(apiCfg.ixService)) {
                        if (apiCfg.ixService.ixUrl) {
                            url = apiCfg.ixService.ixUrl;
                        } else {
                            url = '/' + apiCfg.ixService.ixCode + 's';
                        }
                    }
                }
                proxy = {
                    type: 'ixrest',
                    url: url,
                    ixAppId: apiCfg.ixAppId
                };
                proxy = me.setProxy(proxy);
            } else {
                proxy = this.callParent(arguments);
            }
            return proxy;
        }

    },

    privates: {

        /**
         * 执行扩展的api方法。
         * @memberOf iExt.data.Model#
         * @private
         * @param {String} api 接口名称。
         * @param {Object} options 执行参数。
         * @return {Object} 扩展的操作信息。
         */
        _ixDoOperation: function (api, options) {
            options = Ext.apply({}, options);
            options.ixApi = Ext.clone(api);

            var me = this, action = 'update', operation,
                scope = options.scope || me,
                callback = options.callback,
                proxy = me.getProxy(),
                actions = proxy.getActionMethods();

            for (var p in actions) {
                if (actions[p] === api.ixMethod) {
                    action = p;
                    break;
                }
            }

            options.records = [me];
            options.internalCallback = function (operation) {
                var args = [me, operation],
                    success = operation.wasSuccessful();
                if (success) {
                    Ext.callback(options.success, scope, args);
                } else {
                    Ext.callback(options.failure, scope, args);
                }
                args.push(success);
                Ext.callback(callback, scope, args);
            };
            delete options.callback;
            operation = proxy.createOperation(action, options);
            operation.execute();
            return operation;
        }

    }

}, function () {

    var Model = this;
    Model.onExtended(function (cls, data) {
        var proto = cls.prototype,
            superCls = proto.superclass;

        // 设置代理
        var apiCfg = data.ixApiConfig;
        var superSelf = proto.superclass.self;

        if (apiCfg) {
            delete data.ixApiConfig;
        } else if (superSelf !== Model) {
            apiCfg = superSelf.ixApiConfig;
        }
        cls.ixApiConfig = apiCfg;

        if (cls.ixApiConfig && cls.getProxy().type === 'ixrest') {
            Ext.each(cls.ixApiConfig.ixApis, function (api) {
                if (!api.ixCode) { return; }
                cls.addMember(api.ixCode, function (options) {
                    this._ixDoOperation(api, options);
                });
            });
        }

    });

});
