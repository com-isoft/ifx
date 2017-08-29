/**
 * @class iExt.model.TreeEntity
 * @extends {iExt.data.TreeModel} 
 * @classdesc 树型实体类。
 */
Ext.define('iExt.model.TreeEntity', {
    extend: 'iExt.data.TreeModel',

    idProperty: 'id',

    /**
     * 框架实体
     */
    ixIsTreeModel: true,

    fields: [{
        name: 'version',
        persist: false
    }]

});
