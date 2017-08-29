/**
 * @class iExt.model.Aggregate
 * @extends {iExt.model.Entity} 
 * @classdesc 聚合根。
 */
Ext.define('iExt.model.Aggregate', {
    extend: 'iExt.model.Entity',

    fields: [{
        name: 'createdById',
        type: 'string',
        persist: false
    }, {
        name: 'createdBy_code',
        type: 'string',
        persist: false
    }, {
        name: 'createdBy_name',
        type: 'string',
        persist: false
    }, {
        name: 'createdOn',
        type: 'date',
        persist: false
    }, {
        name: 'modifiedById',
        type: 'string',
        persist: false
    }, {
        name: 'modifiedBy_code',
        type: 'string',
        persist: false
    }, {
        name: 'modifiedBy_name',
        type: 'string',
        persist: false
    }, {
        name: 'modifiedOn',
        type: 'date',
        persist: false
    }]

});