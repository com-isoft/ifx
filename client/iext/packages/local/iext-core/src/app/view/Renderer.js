/**
 * @class iExt.app.view.Renderer
 * @classdesc Grid列渲染器。
 */
Ext.define('iExt.app.view.Renderer', {
    alternateClassName: 'iExt.Renderer',

    requires: [
        'iExt.util.Format'
    ],

    singleton: true,

    /**
     * 格式化日期
     */
    ixDate: function (value, metaData) {
        return Ext.util.Format.date(value, 'Y-m-d');
    },

    /**
     * 格式化时间
     */
    ixTime: function (value, metaData) {
        return Ext.util.Format.date(value, 'H:i');
    },

    /**
     * 格式化日期时间
     */
    ixDatetime: function (value, metaData) {
        return Ext.util.Format.date(value, 'Y-m-d H:i:s');
    },

    /**
     * 格式化年月
     */
    ixYearMonth: function (value, metaData) {
        return Ext.util.Format.date(value, 'Y-m');
    },

    /**
     * 格式化整型
     */
    ixInt: function (value, metaData) {
        return Ext.util.Format.number(value, '0');
    },

    /**
     * 格式化金额
     */
    ixAmt: function (value, metaData) {
        if (value === 0) {
            return '&nbsp;';
        }
        value = Math.round((value - 0) * 100) / 100;
        value = value === Math.floor(value) ?
            value + '.00' :
            value * 10 === Math.floor(value * 10) ? value + '0' : value;
        value = String(value);
        var ps = value.split('.'),
            whole = ps[0],
            sub = ps[1] ? '.' + ps[1] : '.00',
            r = /(\d+)(\d{3})/;
        while (r.test(whole)) {
            whole = whole.replace(r, '$1' + ',' + '$2');
        }
        value = whole + sub;
        if (value.charAt(0) === '-') {
            return '-¥' + value.substr(1);
        }
        return '¥' + value;
    },

    /**
     * 格式化数量
     */
    ixQty: function (value, metaData) {
        return Ext.util.Format.number(value, '0,0.00');
    },

    /**
     * 格式化百分比
     */
    ixPct: function (value, metaData) {
        return Ext.util.Format.percent(value);
    },

    /**
     * 格式编号，增加前导0
     */
    ixNo: function (value, metaData) {
        var format = '00000000';
        var s = value.toString();
        var l = format.length - s.length;
        for (var i = 0; i < l; i++) {
            s = 0 + s;
        }
        return s;
    },

    /**
     * 格式化双态布尔值
     */
    ixDual: function (value, metaData) {
        return iExt.util.Format.ixDual(value);
    },

    /**
     * 格式化三态布尔值
     */
    ixTriplet: function (value, metaData) {
        return iExt.util.Format.ixTriplet(value);
    }

});