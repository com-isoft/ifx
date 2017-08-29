/**
 * @class iExt.data.proxy.Rest
 * @extends {Ext.data.proxy.Rest} 
 * @classdesc RESTFul服务访问代理。
 */
Ext.define('iExt.data.proxy.Rest', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.ixrest',

    startParam: '',
    noCache: true,
    sortParam: 'sorter',

    writer: {
        writeAllFields: true,
        dateFormat: 'C',
        allDataOptions: {
            associated: true
        }
    },

    config: {
        /**
         * 应用程序标识
         */
        ixAppId: undefined
    },

    /**
     * 重载构造请求方法。自动添加请求头信息。
     * @memberOf iExt.data.proxy.Rest#
     * @param {Object} operation 请求的操作信息。
     * @return {Object} 服务请求对象。
     */
    buildRequest: function (operation) {
        var me = this,
            request = me.callParent(arguments),
            records = operation.getRecords(),
            record = records ? records[0] : null,
            id = operation.getId(),
            method = me.getMethod(request);

        // 如果是DELETE、PUT、PATCH请求，添加数据版本号到header中
        if (record && (method === "DELETE" || method === "PUT" || method === "PATCH")) {
            me.setHeaders({
                'If-Match': record.get('version')
            });
        }

        // 如果是DELETE，清空RequestPayload中的数据
        if (method === "DELETE") {
            request.setRecords(null);
            operation.setRecords(null);
        }

        // 设置Url参数
        if (record && operation.ixApi && operation.ixApi.ixMethod === 'GET') {
            request.setParams(me._ixGetParams(record, operation.ixApi));
        }

        return request;
    },

    /**
     * 重载构造服务地址方法。根据配置信息项自动定位服务地址。
     * @memberOf iExt.data.proxy.Rest#
     * @param {Object} request 服务请求。
     * @return {String} 服务地址。
     */
    buildUrl: function (request) {
        var url = this.callParent(arguments),
            operation = request.getOperation(),
            records = operation.getRecords(),
            record = records ? records[0] : null,
            baseUrl = this._ixGetBaseUrl(),
            api = operation.ixApi;

        if (record) {
            url = this._ixGetUrl(url, record);
        }

        // 如果是扩展方法，添加方法名称到当前URL中
        if (api) {
            var segments = url.split('?');
            segments[0] = segments[0] + '/' + api.ixCode;
            url = segments.join('?');
        }

        return baseUrl + url;
    },

    /**
     * 对搜索条件进行编码。
     * @param {Object|Object[]} 搜索条件。
     * @return {String} 编码后的搜索条件。
     */
    encodeFilters: function (filters) {
        if (filters && filters.length === 1 && filters[0].type) {
            return Ext.encode(filters[0].serialize());
        } else {
            return this.callParent(arguments);
        }
    },

    privates: {

        /**
         * 根据数据对象获取服务地址。
         * @memberOf iExt.data.proxy.Rest#
         * @private
         * @param {String} url 服务地址。
         * @param {Object} record 数据对象。
         * @return {String} 服务地址。
         */
        _ixGetUrl: function (url, record) {
            /*ignore jslint start*/
            var re = new RegExp(/\{([^\}]+)\}/ig), match = {};
            /*ignore jslint end*/
            while ((match = re.exec(url)) !== null) {
                url = url.replace(match[0], record.get(match[1]));
            }
            return url;
        },

        /**
         * 获取服务基本地址。
         * @memberOf iExt.data.proxy.Rest#
         * @private
         * @return {String} 服务地址。
         */
        _ixGetBaseUrl: function () {
            var appId = this.getIxAppId();
            return iExt.app.Runtime.ixGetAppUrl(appId);
        },

        /**
         * 获取参数。
         * @memberOf iExt.data.proxy.Rest#
         * @private
         * @param {Object} record 参数。
         * @param {Object} apiConfig api配置参数。
         * @returns {Object} 参数
         */
        _ixGetParams: function (record, apiConfig) {
            var result = {};
            // 如果是数组
            if (Ext.isArray(apiConfig.data)) {
                var res = {};
                Ext.each(apiConfig.data, function (p) {
                    res[p] = record.get(p);
                });
                result = res;
            }

            // 如果是对象
            if (Ext.isObject(apiConfig.data)) {
                result = apiConfig.data;
            }

            // 如果是字符串
            if (Ext.isString(apiConfig.data)) {
                result = record[apiConfig.data]();
            }

            return result;
        }

    }
});