Ext.define('app.model.User', {
    extend: 'iExt.model.Aggregate',

    ixApiConfig: {
        ixAppId: 'huc',
        ixApis: [{
                ixCode: 'resetPassword',
                ixMethod: 'PUT'
            },
            {
                ixCode: 'active',
                ixMethod: 'PUT'
            },
            {
                ixCode: 'inactive',
                ixMethod: 'PUT'
            }
        ]
    },

    fields: [{
        name: 'code',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'status',
        type: 'string',
        defaultValue: 1
    }, {
        name: 'statusName',
        type: 'string'
    }, {
        name: 'dual',
        type: 'bool'
    }, {
        name: 'triplet',
        type: 'bool',
        allowNull: true
    }]
});