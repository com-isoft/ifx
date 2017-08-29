/**
 * @class iExt.enums.Model
 * @extends {Ext.data.Model}
 * @classdesc 枚举数据模型的基础类。用于枚举Store的数据模型。
 */
Ext.define('iExt.enums.Model', {
    extend: 'Ext.data.Model',

    idProperty: 'value',

    fields: [{
        name: 'value',
        type: 'int',
        persist: false
    }, {
        name: 'name',
        type: 'string',
        persist: false
    }, {
        name: 'text',
        type: 'string',
        persist: false
    }]

});