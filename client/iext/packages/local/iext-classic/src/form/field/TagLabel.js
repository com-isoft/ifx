/**
 * @class iExt.form.field.TagLabel
 * @extends {Ext.form.field.TagBase} 
 * @classdesc 标签输入项。
 */
Ext.define('iExt.form.field.TagLabel', {
    extend: 'iExt.form.field.TagBase',
    alias: 'widget.ixtaglabel',

    cls: 'ix-tag-label',
    triggerCls: 'x-fa fa-close',

    /**
     * 重载点击下拉按钮的事件处理。禁用下拉选择。
     * @memberOf iExt.form.field.TagLabel#
     * @return {Boolean} 返回false，禁用下拉选择。
     */
    onTriggerClick: function () {
        this.ixClearTag();
        return true;
    }
});