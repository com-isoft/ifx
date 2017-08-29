/**
 * @class iExt.model.User
 * @extends {Ext.data.Model} 
 * @classdesc 用户实体。
 */
Ext.define('iExt.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'code', persist: false },
        { name: 'name', persist: false }
    ]

});
