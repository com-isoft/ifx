/**
 * @class iExt.grid.column.Integer
 * @override {iExt.grid.column.Column} 
 * @classdesc 整型列组件。设置列居右，缺省允许排序。
 */
Ext.define('iExt.grid.column.Integer', {
    extend: 'iExt.grid.column.Column',
    alias: 'widget.ixintcol',

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
            'int': {
                width: 100,
                renderer: iExt.Renderer.ixInt
            },
            'no': {
                width: 80,
                renderer: iExt.Renderer.ixNo
            },
            'bit': {
                hidden: true
            },
            'list': {
                hidden: true
            }
        }
    },

    config: {
        /**
         * 数据子类型
         * {iExt.meta.ixtype.Integer}
         */
        ixType: 'int'
    },

    applyIxDataType: function (type) {
        return iExt.meta.Types.INTEGER;
    },

    applyIxType: function (type) {
        var me = this;
        if (type && Ext.isString(type)) {
            type = type.toUpperCase();
            type = iExt.meta.ixtype.Integer.ixGetValue(type);
        }
        var name = iExt.meta.ixtype.Integer.ixGetName(type).toLowerCase();
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