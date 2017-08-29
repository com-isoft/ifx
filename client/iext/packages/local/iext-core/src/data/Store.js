/**
 * @class iExt.data.Store
 * @extends {Ext.data.Store}
 * @classdesc iExt数据源的基础类。
 */
Ext.define('iExt.data.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.ixstore',

    pageSize: 15,
    remoteSort: true,
    remoteFilter: true,

    ixRootProperty: 'data',

    /**
     * 设置代理reader的root property。
     * @memberOf iExt.data.Store#
     * @param {Ext.data.proxy.Proxy} proxy 代理。
     */
    updateProxy: function (proxy) {
        if (proxy) {
            var reader = proxy.getReader();
            if (Ext.isEmpty(reader.getRootProperty()) && this.ixRootProperty) {
                reader.setRootProperty(this.ixRootProperty);
            }
        }
    }

});