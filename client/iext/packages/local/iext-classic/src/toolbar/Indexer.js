/**
 * @class iExt.toolbar.App
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 字母索引工具栏。
 */
Ext.define('iExt.toolbar.Indexer', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixindexer',

    requires: [],

    cls: 'ix-tbr-indexer',
    overflowHandler: 'scroller',

    defaults: {
        scale: 'small'
    },

    ixLetters: '*9ABCDEFGHIKLMNOPQRSTUVWXYZ',
    ixIndex: '*',

    /**
     * 索引点击事件。
     * @memberOf iExt.toolbar.Indexer#
     * @event ixindex
     * @param {iExt.toolbar.Indexer} this iExt.toolbar.Indexer控件。
     * @param {Ext.Button} button 按钮控件。
     * @param {string} letter 索引字母。
     */

    initComponent: function () {
        var me = this;
        var items = [], letter;
        for (var i = 0; i < me.ixLetters.length; i++) {
            letter = me.ixLetters.substr(i, 1);
            items.push({
                text: letter,
                cls: 'ix-tbr-indexer-btn',
                scale: 'small',
                pressed: me.ixIndex === letter
            });
        }
        me.items = [{
            xtype: 'segmentedbutton',
            allowMultiple: false,
            vertical: me.dock === 'right' || me.dock === 'left',
            items: items,
            listeners: {
                toggle: { fn: me._ixToggle, scope: me }
            }

        }];
        me.callParent(arguments);
    },

    privates: {

        _ixToggle: function (item, button, isPressed, eOpts) {
            var me = this;
            if (isPressed === true) {
                var letter = button.text;
                if (me.hasListeners.ixindex) {
                    me.fireEvent('ixindex', me, button, letter);
                }
            }
        }

    }

});