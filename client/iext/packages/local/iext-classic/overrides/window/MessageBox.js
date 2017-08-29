/**
 * @class Ext.overrides.window.MessageBox
 * @override {Ext.window.MessageBox} 
 * @classdesc 设置对话框的最小宽度和高度，以及按钮的最小宽度。
 * 修订对话框信息显示滚动条的缺陷。
 */
Ext.define('Ext.overrides.window.MessageBox', {
    override: 'Ext.window.MessageBox',

    cls: 'ix-win',
    bodyCls: 'ix-msg-body',

    defaultMinWidth: 450,
    defaultMinHeight: 120,
    minProgressWidth: 450,
    minPromptWidth: 450,

    makeButton: function (btnIdx) {
        var btn = this.callParent(arguments);
        return Ext.apply(btn, {
            minWidth: 100,
            margin: '0 20 0 20'
        });
    }

});