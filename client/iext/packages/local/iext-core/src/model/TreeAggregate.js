/**
 * @class iExt.model.TreeAggregate
 * @extends {iExt.model.TreeEntity} 
 * @classdesc 树型聚合根。
 */
Ext.define('iExt.model.TreeAggregate', {
    extend: 'iExt.model.TreeEntity',

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
