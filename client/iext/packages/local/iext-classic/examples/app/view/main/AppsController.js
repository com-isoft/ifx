Ext.define('app.view.main.AppsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.apps',

    onSelectionChange: function (selmodel, selected, eOpts) {
        var view = this.getView();
        view.fireEvent('ixappchange', view, selected[0]);
    }

});