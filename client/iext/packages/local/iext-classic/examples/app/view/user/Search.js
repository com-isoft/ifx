Ext.define('app.view.user.Search', {
    extend: 'iExt.form.Filter',
    xtype: 'app-user-search',

    title: '用户搜索',

    items: [{
        fieldLabel: '代码',
        //allowBlank: false,
        reference: 'txtName'
    }, {
        fieldLabel: '邮箱',
        reference: 'txtEmail'
    }, {
        fieldLabel: 'Other 1',
        xtype: 'ixcombo',
        multiSelect: true,
        store: {
            type: 'ixenumsstore',
            ixEnumType: 'iExt.meta.Types'
        }
    }, {
        fieldLabel: 'Other 2'
    }],

    ixFilters: {
        ixConnector: iExt.filter.Connectors.AND,
        ixItems: [{
            ixProperty: 'name',
            ixOperator: iExt.filter.Operators.CT,
            ixAlignTarget: 'txtName',
            type: 'string'
        }, {
            ixProperty: 'email',
            ixOperator: iExt.filter.Operators.CT,
            ixAlignTarget: 'txtEmail',
            type: 'string'
        }]
    }

});