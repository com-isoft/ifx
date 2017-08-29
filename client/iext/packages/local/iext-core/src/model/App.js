/**
 * @class iExt.model.App
 * @extends {Ext.data.Model} 
 * @classdesc 应用程序实体。用于获取应用记录。
 * 不是应用应用程序维护中使用的聚合根。
 */
Ext.define('iExt.model.App', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'code', persist: false },
        { name: 'name', persist: false },
        { name: 'site', persist: false },
        { name: 'thumb', persist: false },
        { name: 'description', persist: false }
    ]

});
