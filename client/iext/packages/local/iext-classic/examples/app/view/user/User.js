Ext.define('app.view.user.User', {
    extend: 'iExt.app.view.container.List',
    xtype: 'app-user',

    requires: [
        'iExt.toolbar.Indexer',
        'iExt.form.field.TagLabel',
        'iExt.form.field.TagSearch',
        'iExt.meta.Types'
    ],
    controller: 'user',
    viewModel: 'user',
    title: '用户',

    ixDomain: 'app.domain.User'

});