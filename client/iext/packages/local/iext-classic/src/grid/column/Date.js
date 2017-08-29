/**
 * @class iExt.grid.column.Date
 * @override {iExt.grid.column.Column} 
 * @classdesc 日期时间列组件。设置列居中，缺省允许排序。
 */
Ext.define('iExt.grid.column.Date', {
    extend: 'iExt.grid.column.Column',
    alias: 'widget.ixdatecol',

    sortable: true,
    align: 'center',

    /**
     * 主题设置
     */
    ixTheme: {
        /**
         * 数据类型的缺省样式
         */
        defaults: {
            'ym': {
                width: 70,
                renderer: iExt.Renderer.ixYearMonth
            },
            'date': {
                width: 100,
                renderer: iExt.Renderer.ixDate
            },
            'time': {
                width: 80,
                renderer: iExt.Renderer.ixTime
            },
            'datetime': {
                width: 160,
                renderer: iExt.Renderer.ixDatetime
            }
        }
    },

    config: {
        /**
         * 数据子类型
         * {iExt.meta.ixtype.Date}
         */
        ixType: 'date'
    },

    applyIxDataType: function (type) {
        return iExt.meta.Types.DATE;
    },

    applyIxType: function (type) {
        var me = this;
        if (type && Ext.isString(type)) {
            type = type.toUpperCase();
            type = iExt.meta.ixtype.Date.ixGetValue(type);
        }
        var name = iExt.meta.ixtype.Date.ixGetName(type).toLowerCase();
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