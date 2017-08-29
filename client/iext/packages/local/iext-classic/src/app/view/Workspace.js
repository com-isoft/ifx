/**
 * @class iExt.app.view.Workspace
 * @extends {Ext.container.Viewport} 
 * @classdesc 应用程序工作区。
 */
Ext.define('iExt.app.view.Workspace', {
    extend: 'Ext.container.Viewport',
    xtype: 'widget.ixappws',

    requires: [
        'iExt.toolbar.AppTitle'
    ],

    mixins: [
        'iExt.mixin.Workspace'
    ],

    viewModel: 'ixmain',
    controller: 'ixws',

    layout: 'border',

    config: {
        /**
         * 标题行扩展组件集合
         */
        ixHeaderItems: [],

        /**
         * 主视图
         */
        ixHomeView: null,

        /**
         * 
         */
        ixAppsStore: null
    },

    applyIxUser: function (user) {
        var vm = this.getViewModel();
        vm.ixSetUser(user);
        return user;
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }

});