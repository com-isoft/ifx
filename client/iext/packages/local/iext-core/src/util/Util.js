/**
 * @class iExt.util.Util
 * @classdesc 前端框架帮助类。
 */
Ext.define('iExt.util.Util', {
    alternateClassName: 'iExt.Util',
    singleton: true,

    ixDateNull: new Date('0001-01-01'),
    ixDateMin: new Date('1900-01-01'),
    ixDateMax: new Date('2999-12-31'),

    /**
     * 获取给定参数的hash值。
     */
    ixGetHashCode: function () {
        var hash = 0,
            me = this;
        if (arguments && arguments.length > 0) {
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (Ext.isArray(arg)) {
                    args.push(arg.join(';'));
                } else if (Ext.isObject(arg)) {
                    Ext.Object.each(arg, function (key, value, myself) {
                        if (Ext.isObject(value)) {
                            // 检测两级参数
                            var s = me._ixGetObjectString(value);
                            args.push(key + '=' + s);
                        } else {
                            args.push(key + '=' + value);
                        }
                    });
                } else {
                    args.push(arg);
                }
            }
            hash = me._ixGetHashCode(args.join(';'));
        }
        return hash;
    },

    /**
     * 区分单双字节计算字符串长度。
     * @memberOf iExt.util.Util#
     * @param {String} value 字符串。
     * @return {Integer} 字符串长度。
     */
    ixLen: function (value) {
        var len = 0;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) < 0 || value.charCodeAt(i) > 255) {
                len = len + 2;
            } else {
                len = len + 1;
            }
        }
        return len;
    },

    privates: {

        _ixRegColor: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,

        /**
         * 获取给定参数的hash值。
         * @param {String} 字符串数据。
         * @return {Integer} hash值。
         */
        _ixGetHashCode: function (value) {
            var h = 0,
                len = value.length;
            var tMax = 2147483648;
            for (var i = 0; i < len; i++) {
                h = 31 * h + value.charCodeAt(i);
                //java int 溢出则取模
                if (h > tMax) {
                    h %= tMax;
                }
            }
            return h;
        },

        /**
         * 获取对象的字符串表达式。
         * @param {Object} value 对象。
         * @return {String} 字符串表达式。
         */
        _ixGetObjectString: function (value) {
            var s = '';
            Ext.Object.each(value, function (key, value, myself) {
                s += key + '=' + value + ';';
            });
            return s;
        }

    }

});