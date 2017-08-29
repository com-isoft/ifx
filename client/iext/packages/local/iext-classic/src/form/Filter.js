/**
 * @class iExt.form.Filter
 * @extends {Ext.form.Panel} 
 * @classdesc 搜索表单控件。
 * 该表单只用于定义搜索条件，不具备执行搜索的功能。
 * 所以命名为 Filter，而不是命名为 Search。
 */
Ext.define('iExt.form.Filter', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixfilterform',

    mixins: [
        'iExt.mixin.FilterView'
    ],

    cls: 'ix-filter-form',
    bodyPadding: 5,
    border: false,
    header: false,
    title: '详细搜索',
    referenceHolder: true,
    defaultType: 'ixtext',
    scrollable: 'y',
    layout: 'column',

    defaults: {
        columnWidth: 0.5,
        labelAlign: 'left',
        labelWidth: 80,
        msgTarget: 'title',
        margin: '5 5 5 5'
    },

    // 获取是否合法信息
    ixIsValid: function () {
        return this.getForm().isValid();
    },

    /**
     * 
     */
    afterRender: function () {
        var me = this;
        var valid = me.ixIsValid();
        me.on('validitychange', me._ixOnValidityChange, me);
        me._ixOnValidityChange(me, valid);
        me.callParent(arguments);
    },

    privates: {

        /**
         * 校验变化事件处理
         * @memberOf iExt.mixin.FilterView#
         * @param {Ext.Component} item 触发事件的控件。
         * @param {Boolean} valid 是否有效。
         */
        _ixOnValidityChange: function (item, valid) {
            if (this.hasListeners.ixvaliditychange) {
                this.fireEvent('ixvaliditychange', this, valid);
            }
        }

    }

});