/**
 * @class iExt.dashboard.Kpi
 * @extends {Ext.Component} 
 * @classdesc 指标组件。
 */
Ext.define('iExt.dashboard.Kpi', {
    extend: 'Ext.Component',
    alias: 'widget.ixkpi',

    requires: [],

    config: {
        ixIconCls: undefined,
        ixScale: 'medium',
        ixKpi: undefined,
        ixKpm: undefined
    },

    cls: 'ix-kpi-btn',
    minWidth: 140,
    tpl: [
        '<tpl for=".">' +
        '<span id="{id}-btnIconEl" data-ref="btnIconEl" role="presentation" ' +
        'unselectable="on" class="{ixIconCls} ">{ixKpi}'  +
        '</span>' +
        '</tpl>'
    ],

    initComponent: function () {
        var me = this;
        me.renderData = {
            ixKpi: 'sdfsfdsf'
        };
        me.callParent();
    }

});