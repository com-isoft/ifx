/**
 * iExt Ajax请求类
 */
Ext.define('iExt.Ajax', {

    requires: [
        'Ext.Ajax'
    ],

    statics: {
        /**
         * 发起api请求。
         * @memberOf iExt.Ajax#
         * @statics
         * @param {String} url URL地址。
         * @param {String} method 处理方法（POST/GET/DELETE/PUT）。
         * @param {Object} data 请求的数据。
         * @param {Object} headers 请求头。
         * @return {Ext.promise.Promise} 级联操作对象。
         */
        ixCall: function (url, method, data, headers) {
            var options = {
                method: method,
                url: url,
                headers: headers
            };

            if (method === "GET") {
                Ext.apply(options, {
                    params: data
                });
            } else {
                Ext.apply(options, {
                    jsonData: data
                });
            }
            return Ext.Ajax.request(options);
        },

        /**
         * 异步Get请求。
         * @param {String} 请求地址
         * @param {Object} 参数对象
         */
        ixGet: function (url, data) {
            return this.ixCallAsync(url, 'GET', data);
        }
    }

});