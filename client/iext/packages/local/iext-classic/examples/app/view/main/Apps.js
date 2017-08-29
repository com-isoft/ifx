Ext.define('app.view.main.Apps', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-apps',

    requires: [],
    controller: 'apps',
    viewModel: 'apps',
    bodyCls: 'apps-body',

    items: [{
        xtype: 'dataview',
        itemSelector: 'div.apps-item',
        width: 750,
        store: {
            type: 'apps'
        },

        tpl: [
            '<tpl for=".">',
            '<div class="apps-item">',
            '<img src="resources/images/icons/{icon}" />',
            '<h3>{name}</h3>',
            '</div>',
            '</tpl>'
        ],

        listeners: {
            selectionchange: 'onSelectionChange'
        }
    }]
});