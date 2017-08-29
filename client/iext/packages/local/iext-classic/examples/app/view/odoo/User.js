Ext.define('app.view.odoo.User', {
    extend: 'iExt.app.view.container.List',
    xtype: 'app-odoo',

    requires: [
        'iExt.toolbar.Indexer',
        'iExt.form.field.TagLabel',
        'iExt.form.field.TagSearch',
        'iExt.meta.Types'
    ],
    controller: 'odoo',
    viewModel: 'odoo',
    title: '用户',

    ixDomain: 'app.domain.User'

});