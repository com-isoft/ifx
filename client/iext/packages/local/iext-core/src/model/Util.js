/**
 * @class iExt.model.Util
 * @classdesc 实体帮助类。
 */
Ext.define('iExt.model.Util', {
    alternateClassName: 'iExt.Model',
    singleton: true,

    /**
     * 根据实体的类名获取实体类。
     * @param {String} 实体类名称。
     * @return {Object} 实体类。
     */
    ixGetModel: function (className) {
        var modelClass = Ext.ClassManager.get(className);
        if (!modelClass) {
            Ext.raise('未找到指定的实体类 [' + className + '] !');
        }
        return modelClass;
    },

    /**
     * 根据实体的类名获取服务名称。
     * @param {String} 实体类名称。
     * @return {String} 服务名称。
     */
    ixGetService: function (className) {
        var names = className.$className.split('.');
        var service = names[names.length - 1].toLowerCase();
        return service;
    }

});