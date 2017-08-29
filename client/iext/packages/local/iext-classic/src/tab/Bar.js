/**
 * @class iExt.tab.Bar
 * @extends {Ext.tab.Bar} 
 * @classdesc 主要用于处理向导模式时不能通过标签进行切换。
 */
Ext.define('iExt.tab.Bar', {
    extend: 'Ext.tab.Bar',
    alias: 'widget.ixtabbar',

    privates: {

        /**
         * 重载TabBar的Click事件处理，向导模式下不允许通过Tab导航。
         * @memberOf iExt.tab.Bar#
         * @privates
         * @param {Event} e 事件。
         * @param {Objects} target 目标对象。
         */
        onClick: function (e, target) {
            return;
        }

    }
});