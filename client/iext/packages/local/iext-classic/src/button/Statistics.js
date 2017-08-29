/**
 * @class iExt.button.Statistics
 * @extends {Ext.button.Button} 
 * @classdesc 带统计信息的按钮控件。
 */
Ext.define('iExt.button.Statistics', {
    extend: 'Ext.button.Button',
    alias: 'widget.ixstatbtn',

    requires: [],

    config: {
        /**
         * 扩展值信息
         * 为了保持访问的一致性，使用了 value 的命名方式
         */
        value: null
    },

    // 使用cls和userCls，class添加的位置不同
    // cls：添加在 x-btn 后面
    // userCls：添加在 x-btn-default-toolbar-small 前面
    cls: 'ix-stat-btn',
    textAlign: 'left',

    /**
     * 重载获取模板参数方法，添加 badge 信息
     */
    getTemplateArgs: function () {
        var me = this;
        var args = me.callParent();
        return Ext.apply(args, {
            value: me.getValue() || '&#160;'
        });
    },

    /**
     * 重载更新文本
     */
    updateText: function (text, oldText) {
        text = text == null ? '' : String(text);
        oldText = oldText || '';

        var me = this,
            btnInnerEl = me.btnInnerEl;

        if (me.rendered) {
            var spanText = btnInnerEl.down('span:last-child');
            spanText.setHtml(text || '&#160;');
            me.updateLayout();
        }
        me.fireEvent('textchange', me, oldText, text);
    },

    /**
     * 重载更新值
     */
    updateValue: function (value, oldValue) {
        value = value == null ? '' : value;
        oldValue = oldValue || '';

        var me = this,
            btnInnerEl = me.btnInnerEl;

        if (me.rendered) {
            var spanValue = btnInnerEl.down('span:first-child');
            spanValue.setHtml(value || '&#160;');
            me.updateLayout();
        }
        me.fireEvent('ixvaluechange', me, oldValue, value);
    }

}, function (btnClass) {

    // 注入模板信息
    var _ixInjectTpl = '<span class="ix-stat-btn-value">{value}</span>' +
        '<span class="ix-stat-btn-text">{text}</span>',
        _ixInjectAt = '{text}';

    var superTpl = btnClass.superclass.renderTpl;
    var tpls = superTpl.split(_ixInjectAt);
    var myTpl = tpls.join(_ixInjectTpl);
    btnClass.addConfig({
        renderTpl: myTpl
    });

});