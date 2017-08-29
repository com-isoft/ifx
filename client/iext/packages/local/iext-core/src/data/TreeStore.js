/**
 * @class iExt.data.TreeStore
 * @extends {Ext.data.TreeStore}
 * @classdesc iExt树型实体数据源的基础类。
 */
Ext.define('iExt.data.TreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.ixtreestore',

    remoteFilter: true,

    /**
     * 本地筛选后事件。
     * @memberOf iExt.data.TreeStore#
     * @event ixafterlocalfilter
     * @param {iExt.data.TreeStore} this iExt.data.TreeStore控件。
     * @param {Object} root 根节点。
     * @param {Object[]} childNodes 符合条件的子节点。
     */

    /**
     * 重载节点筛选处理。触发ixafterlocalfilter事件。
     * @memberOf iExt.data.TreeStore#
     * @param {Object} root 根节点。
     * @param {Object[]} childNodes 符合条件的节点集合。
     */
    onNodeFilter: function (root, childNodes) {
        var me = this;
        me.callParent(arguments);
        if (me.hasListeners.ixafterlocalfilter) {
            me.fireEvent('ixafterlocalfilter', me, root, childNodes);
        }
    }

});