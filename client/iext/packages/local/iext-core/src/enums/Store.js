/**
 * @class iExt.enums.Store
 * @extends {Ext.data.Store}
 * @classdesc 枚举数据源类，可以根据枚举类型自动生成Store 。
 */
Ext.define('iExt.enums.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.ixenumsstore',

    requires: [
        'iExt.enums.Model'
    ],

    model: 'iExt.enums.Model',

    /**
     * proxy 需要在Store中设置，需要与Store的实例相关。
     * model 中的Proxy是静态的，与实例无关。
     */
    proxy: {
        type: 'memory',
        reader: 'json'
    },

    config: {
        ixEnumType: null,
        ixAllowBlank: false
    },

    /**
     * 重载构造函数。
     * @memberOf iExt.data.enums.Store#
     * @param {Object} config 配置信息。
     */
    constructor: function (config) {
        var me = this;
        me.callParent(arguments);

        var type = me.getIxEnumType();
        if (type) {
            var enums = Ext.ClassManager.get(type);
            if (enums) {
                var data = [], blank = me.getIxAllowBlank();
                if (blank === true) {
                    data.push({ value: 0, name: 'Please Select...', text: '请选择...' });
                }
                var list = enums.ixList();
                data = data.concat(list);
                me.loadInlineData(data);
            } else {
                Ext.raise('指定的枚举类型 [' + type + '] 不存在!');
            }
        }
    }

});