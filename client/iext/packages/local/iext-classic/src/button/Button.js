/**
 * @class iExt.button.Button
 * @extends {Ext.button.Button} 
 * @classdesc 按钮控件，扩展了 badge 功能。
 */
Ext.define('iExt.button.Button', {
    extend: 'Ext.button.Button',
    alias: 'widget.ixactbtn',

    requires: [],

    mixins: [
        'iExt.mixin.Action'
    ],

    config: {

        /**
         * badge 文本
         */
        ixBadgeText: null,

        /**
         * badge 样式
         * 与 Ext 的组件样式设置方法一致
         * {color: '', border: ''}
         */
        ixBadgeStyle: null
    },

    ixMenuOffset: [0, 1],

    cls: 'ix-act-btn',
    menuAlign: 'tc-bc',

    initComponent: function () {
        var me = this;
        me.callParent();
    },

    /**
     * 统一获取文本操作方法
     * Ext.menu.Item 未提供获取文本的方法
     * 为了统一操作，统一使用 ixGetText 方法
     */
    ixGetText: function () {
        return this.getText();
    },

    /**
     * 重载获取模板参数方法，添加 badge 信息
     */
    getTemplateArgs: function () {
        var me = this;
        var args = me.callParent();
        var badgeText = me.getIxBadgeText(),
            badgeStyle = Ext.DomHelper.generateStyles(me.getIxBadgeStyle());

        me.ixBadged = badgeText !== null;
        return Ext.apply(args, {
            badgeText: badgeText,
            badgeStyle: badgeStyle
        });
    },

    /**
     * 更新 badge 文本
     */
    updateIxBadgeText: function (text, oldText) {
        text = text == null ? '' : String(text);
        oldText = oldText || '';

        var me = this,
            btnEl = me.btnEl;

        if (me.rendered && me.ixBadged) {
            var spanText = btnEl.down('span:last-child');
            spanText.setHtml(text || '&#160;');
            me.updateLayout();
        }
        me.fireEvent('ixbadgechange', me, oldText, text);
    },

    /**
     * 更新 badge 样式
     */
    updateIxBadgeStyle: function (style, oldStyle) {
        var me = this,
            btnEl = me.btnEl;

        if (me.rendered && me.ixBadged) {
            var spanText = btnEl.down('span:last-child');
            spanText.setStyle(style);
            me.updateLayout();
        }
    },

    /**
     * 重载 showMenu ，支持 menuOffset 功能。
     */
    showMenu: function (clickEvent) {
        var me = this,
            menu = me.menu,
            isPointerEvent = !clickEvent || clickEvent.pointerType;

        if (menu && me.rendered) {
            if (me.tooltip && Ext.quickTipsActive && me.getTipAttr() !== 'title') {
                Ext.tip.QuickTipManager.getQuickTip().cancelShow(me.el);
            }
            if (menu.isVisible()) {
                if (isPointerEvent) {
                    menu.hide();
                } else {
                    menu.focus();
                }
            } else if (!clickEvent || me.showEmptyMenu || menu.items.getCount() > 0) {
                menu.autoFocus = !isPointerEvent;
                menu.showBy(me.el, me.menuAlign, me.ixMenuOffset);
            }
        }
        return me;
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        if (this._$ixViewId) {
            var cmp = Ext.getCmp(this._$ixViewId);
            if (cmp) {
                cmp.destroy();
            }
        }
        this.callParent();
    }

}, function (btnClass) {

    // 注入 badge 模板信息
    var _ixInjectTpl = '{text}</span><tpl if="badgeText"><span class="ix-btn-badge"' +
        '<tpl if="badgeStyle"> style="{badgeStyle}"</tpl>>{badgeText}</span></tpl>',
        _ixInjectAt = '{text}</span>';

    var superTpl = btnClass.superclass.renderTpl;
    var tpls = superTpl.split(_ixInjectAt);
    var myTpl = tpls.join(_ixInjectTpl);
    btnClass.addConfig({
        renderTpl: myTpl
    });

});