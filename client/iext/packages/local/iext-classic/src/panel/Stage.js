/**
 * @class iExt.panel.Stage
 * @extends {Ext.panel.Panel} 
 * @classdesc 看板阶段容器。
 */
Ext.define('iExt.panel.Stage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixstagepanel',

    requires: [],

    ixTheme: {
        collapsedWidth: 42
    },

    config: {
        /**
         * 是否是交替行
         */
        ixAlt: false,
        /**
         * 是否允许收缩和展开
         */
        ixCollapsible: false
    },

    flex: 1,
    border: false,
    scrollable: 'y',
    titleAlign: 'center',
    defaults: {
        margin: '5 10 5 10'
    },

    /**
     * 收缩图标样式
     * x-fa fa-chevron-left
     */
    ixCollapseIconCls: 'x-fa fa-arrows-v',

    /**
     * 展开图标样式
     * x-fa fa-chevron-right
     */
    ixExpandIconCls: 'x-fa fa-arrows-h',

    initComponent: function () {
        var me = this,
            collapsible = me.getIxCollapsible();

        if (collapsible === true) {
            me.header = {
                tools: [{
                    iconCls: me.ixCollapseIconCls,
                    tooltip: '收缩/展开',
                    callback: me._ixToggle
                }],
                titlePosition: 1
            };
        }
        me.callParent();
    },

    applyIxAlt: function (alt) {
        var me = this;
        if (alt === true) {
            me.cls = 'ix-stage-panel-alt';
        } else {
            me.cls = 'ix-stage-panel';
        }
        return alt;
    },

    privates: {

        _ixToggle: function (owner, tool, e) {
            var me = owner.ownerCt;
            if (me.__ixCollapsed === true) {
                me.setFlex(1);
                // 设置 null 清除 width
                me.setWidth(null);
                me.setHeaderPosition('top');
                tool.setIconCls(me.ixCollapseIconCls);
                me.__ixCollapsed = false;
            } else {
                me.setFlex(0);
                me.setWidth(me.ixTheme.collapsedWidth);
                me.setHeaderPosition('left');
                tool.setIconCls(me.ixExpandIconCls);
                me.__ixCollapsed = true;
            }
        }
    }


});