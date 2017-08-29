/**
 * @class iExt.grid.column.Boolean
 * @override {iExt.grid.column.Column} 
 * @classdesc 布尔列组件。设置列居右，缺省允许排序。
 */
Ext.define('iExt.grid.column.Boolean', {
    extend: 'iExt.grid.column.Column',
    alias: 'widget.ixboolcol',

    sortable: true,
    align: 'center',
    tdCls: 'ix-bool-col',

    /**
     * 主题设置
     */
    ixTheme: {
        /**
         * 数据类型的缺省样式
         */
        defaults: {
            'dual': {
                width: 70,
                renderer: iExt.Renderer.ixDual
            },
            'triplet': {
                width: 70,
                renderer: iExt.Renderer.ixTriplet
            }
        }
    },

    config: {
        /**
         * 数据子类型
         * {iExt.meta.ixtype.Boolean}
         */
        ixType: 'dual'
    },

    applyIxDataType: function (type) {
        return iExt.meta.Types.BOOLEAN;
    },

    applyIxType: function (type) {
        var me = this;
        if (type && Ext.isString(type)) {
            type = type.toUpperCase();
            type = iExt.meta.ixtype.Boolean.ixGetValue(type);
        }
        var name = iExt.meta.ixtype.Boolean.ixGetName(type).toLowerCase();
        var cfg = me.ixTheme.defaults[name] || {};
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