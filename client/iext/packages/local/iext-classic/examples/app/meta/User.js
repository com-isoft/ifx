Ext.define('app.meta.User', {
    extend: 'iExt.meta.Aggregate',

    ixModelName: 'app.model.User',
    ixName: '用户',

    ixFields: [{
        ixName: 'code',
        ixTitle: '代码',
        ixSortDir: 'ASC',
        ixIsEntityId: true,
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        ixName: 'name',
        ixTitle: '名称',
        ixIsEntityDesc: true,
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        ixName: 'email',
        ixTitle: '邮箱',
        ixSubType: iExt.meta.ixtype.String.TEXT
    }, {
        type: 'int',
        ixName: 'status',
        ixTitle: '状态',
        ixMeaningful: false,
        ixSubType: iExt.meta.ixtype.Integer.INT
    }, {
        ixName: 'statusName',
        ixTitle: '状态',
        ixSubType: iExt.meta.ixtype.String.STRING
    }]

});
