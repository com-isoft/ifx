/**
 * @class iExt.grid.column.Column
 * @override {Ext.grid.column.Column} 
 * @classdesc 设置列标题居中，缺省不允许排序。
 */
Ext.define('iExt.grid.column.Column', {
    extend: 'Ext.grid.column.Column',
    alternateClassName: 'iExt.Column',
    alias: 'widget.ixcol',

    align: 'left',
    sortable: false,
    tooltipType: 'title',
    textAlign: 'left',

    /**
     * 主题设置
     */
    ixTheme: {
        /**
         * 数据类型的缺省样式
         */
        defaults: {
            'string': {
                width: 100
            },
            'guid': {
                hidden: true
            },
            'text': {
                flex: 1
            }
        }
    },

    config: {
        /**
         * 最大长度
         */
        ixLen: null,
        /**
         * 数据类型
         * {iExt.meta.Types}
         */
        ixDataType: 'string',
        /**
         * 数据子类型
         * {iExt.meta.ixtype.String}
         */
        ixType: 'string'
    },

    applyIxDataType: function (type) {
        return iExt.meta.Types.STRING;
    },

    applyIxType: function (type) {
        var me = this;
        if (type && Ext.isString(type)) {
            type = type.toUpperCase();
            type = iExt.meta.ixtype.String.ixGetValue(type);
        }
        var name = iExt.meta.ixtype.Date.ixGetName(type).toLowerCase();
        var cfg = me.ixTheme.defaults[name] || {};
        if (cfg) {
            //delete me.flex;
            Ext.applyIf(me, cfg);
            // renderer 缺省设置为 'false'
            if (me.renderer === false && cfg.renderer) {
                me.renderer = cfg.renderer;
            }
        }
        return type;
    }

});