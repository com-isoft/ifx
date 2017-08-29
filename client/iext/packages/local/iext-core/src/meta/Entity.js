/**
 * @class iExt.meta.Entity
 * @extends {iExt.meta.Base} 
 * @classdesc 实体元数据类。
 */
Ext.define('iExt.meta.Entity', {
    extend: 'iExt.meta.Base',

    ixModelName: 'iExt.model.Entity',

    ixFields: [{
        ixNo: 0,
        type: 'string',
        ixName: 'id',
        ixTitle: '标识',
        ixIsRepoId: true,
        ixSubType: iExt.meta.ixtype.String.GUID
    }, {
        ixNo: 999,
        type: 'int',
        ixName: 'version',
        ixTitle: '数据版本',
        ixMeaningful: false,
        ixSubType: iExt.meta.ixtype.Integer.INT
    }]

});