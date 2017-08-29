/**
 * @class iExt.grid.column.Number
 * @override {iExt.grid.column.Column} 
 * @classdesc 数字列组件。设置列居右，缺省允许排序。
 */
Ext.define('iExt.grid.column.Number', {
    extend: 'iExt.grid.column.Column',
    alias: 'widget.ixnumcol',

    sortable: true,
    align: 'right',

    /**
     * 主题设置
     */
    ixTheme: {
        /**
         * 数据类型的缺省样式
         */
        defaults: {
            'qty': {
                width: 100,
                renderer: iExt.Renderer.ixQty
            },
            'prc': {
                width: 80,
                renderer: iExt.Renderer.ixAmt
            },
            'amt': {
                width: 100,
                renderer: iExt.Renderer.ixAmt
            },
            'pct': {
                width: 70,
                renderer: iExt.Renderer.ixPct
            }
        }
    },

    config: {
        /**
         * 数据子类型
         * {iExt.meta.ixtype.Number}
         */
        ixType: 'qty'
    },

    applyIxDataType: function (type) {
        return iExt.meta.Types.NUMBER;
    },

    applyIxType: function (type) {
        var me = this;
        if (type && Ext.isString(type)) {
            type = type.toUpperCase();
            type = iExt.meta.ixtype.Number.ixGetValue(type);
        }
        var name = iExt.meta.ixtype.Number.ixGetName(type).toLowerCase();
        if (cfg) {
            delete me.flex;
            Ext.applyIf(me, cfg);
            // renderer 缺省设置为 'false'
            if (me.renderer === false && cfg.renderer) {
                me.renderer = cfg.renderer;
            }
        }
        return type;
    }

});