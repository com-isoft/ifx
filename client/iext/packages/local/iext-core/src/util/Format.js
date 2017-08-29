/**
 * @class iExt.util.Format
 * @classdesc 格式化帮助类。
 */
Ext.define('iExt.util.Format', {
    alternateClassName: 'iExt.Format',
    singleton: true,

    /**
     * 根据对象属性格式化字符串。
     * @memberOf iExt.util.Util#
     * @param {String} expression 要格式化的字符串。
     * @param {Ext.data.Model} record 数据对象。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixFormat: function (expression, record) {
        if (!expression || !record) {
            return expression;
        }
        var s = expression,
            reg = new RegExp('\\{(.+?)\\}', 'g');
        var matched = s.match(reg);
        if (matched) {
            for (var i = 0; i < matched.length; i++) {
                var prop = matched[i];
                prop = prop.substr(1, prop.length - 2);
                var val = record.get(prop);
                //<debug>
                if (!val) {
                    Ext.raise('未能获取属性 [' + prop + '] 值！');
                }
                //</debug>
                s = s.replace(matched[i], val);
            }
        }
        return s;
    },

    /**
     * 双态bool数据格式化。
     * 使用类似 checkbox 的形式。
     * @param {Boolean} 值。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixDual: function (value) {
        if (value === true) {
            return '&#xf046';
        } else {
            return '&#xf096';
        }
    },

    /**
     * 三态bool数据格式化。
     * 使用类似 checkbox 和 '' 的形式。
     * @param {Boolean} 值。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixTriplet: function (value) {
        if (value === true) {
            return '&#xf046';
        } else if (value === false) {
            return '&#xf096';
        } else {
            return '&nbsp;';
        }
    },

    /**
     * 三态bool数据格式化。
     * 使用类似 radio button 的形式。
     * @param {Boolean} 值。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixTriplet2: function (value) {
        if (value === true) {
            return '&#xf111';
        } else if (value === false) {
            return '&#xf10c';
        } else {
            return '&#xf192';
        }
    }

});