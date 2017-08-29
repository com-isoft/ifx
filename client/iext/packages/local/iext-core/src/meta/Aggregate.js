/**
 * @class iExt.meta.Entity
 * @extends {iExt.meta.Meta} 
 * @classdesc 聚合根元数据类。
 */
Ext.define('iExt.meta.Aggregate', {
    extend: 'iExt.meta.Entity',

    ixModelName: 'iExt.model.Aggregate',

    ixFields: [{
        type: 'string',
        ixNo: 991,
        ixName: 'createdById',
        ixTitle: '创建用户标识',
        ixSubType: iExt.meta.ixtype.String.GUID
    }, {
        ixNo: 992,
        ixName: 'createdBy_code',
        ixTitle: '创建用户代码',
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        ixNo: 993,
        ixName: 'createdBy_name',
        ixTitle: '创建用户名称',
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        type: 'date',
        ixNo: 994,
        ixName: 'createdOn',
        ixTitle: '创建时间',
        ixSubType: iExt.meta.ixtype.Date.DATETIME
    }, {
        ixNo: 995,
        ixName: 'modifiedById',
        ixTitle: '修改用户标识',
        ixSubType: iExt.meta.ixtype.String.GUID
    }, {
        ixNo: 996,
        ixName: 'modifiedBy_code',
        ixTitle: '修改用户代码',
        ixSubType: iExt.meta.ixtype.String.STRING
        // 导航属性
        // ixNavigator: { ixModel: 'examples.model.User', ixProperty: 'modifiedById' }
    }, {
        ixNo: 997,
        ixName: 'modifiedBy_name',
        ixTitle: '修改用户名称',
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        type: 'date',
        ixNo: 998,
        ixName: 'modifiedOn',
        ixTitle: '修改时间',
        ixSubType: iExt.meta.ixtype.Date.DATETIME
    }]

});