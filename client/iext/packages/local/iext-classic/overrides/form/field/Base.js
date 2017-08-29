/**
 * @class Ext.overrides.form.field.Base
 * @override {Ext.form.field.Base} 
 * @classdesc 设置必须输入项的标签样式。
 */
Ext.define('Ext.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',

    msgTarget: 'title',
    labelSeparator: '&nbsp：',
    ixLabelRequiredCls: 'ix-label-required',

    initComponent: function () {
        var me = this;
        if (me.allowBlank === false && me.hasVisibleLabel() === true) {
            me.labelSeparator = '<span class="' + me.ixLabelRequiredCls + '"></span>:';
            // 采用下述的方法对于右对齐和左对齐的情况还不能提供较好的体验
            // 理想情况下应该可以根据对齐方式采用在前面或在后面添加
            //me.beforeLabelTextTpl = '<span class="' + me.ixLabelRequiredCls + '">*</span>';
        }
        me.callParent(arguments);
    }

});