/**
 * @mixin iExt.mixin.Workspace
 * @extends {iExt.mixin.View} 
 * @classdesc 工作区 MIXIN。
 * 控制器虽然可以监听到事件，但是处理方式还是由视图决定，
 * 所以不能在工作区的控制器中进行处理。
 */
Ext.define('iExt.mixin.Workspace', {
    extend: 'iExt.mixin.View',

    mixinConfig: {
        id: 'iext-view-ws'
    },

    ixIsWorkspace: true,

    config: {
        /**
         * 用户信息，可以通过外部配置设置。
         * {code: '', password: ''}
         */
        ixUser: null
    },

    /**
     * 打开视图。
     * @param {Ext.Component} item 打开视图的组件。
     * @param {String|Object} view 视图名称或对象。
     * @param {Object} options 选项。
     * target {iExt.action.ViewTarget} 打开目标。
     * viewConfig {Object} 视图配置信息。
     * formType {iExt.app.view.FormTypes} 表单类型。
     * scale {iExt.app.view.Scales} 视图规格。
     */
    ixOpenView: iExt.unimplFn,

    /**
     * 打开页面。
     */
    ixOpenPage: iExt.unimplFn,

    /**
     * 显示提示消息。
     * 工作区会有不同的布局方式，可能会在工作区内显示提示消息。
     * 例如：可以设置一个状态栏，显示提示性信息。
     */
    ixShowTip: function (msg) {
        iExt.Toast.ixInfo(msg);
        return true;
    }

});