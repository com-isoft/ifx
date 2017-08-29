/**
 * @class iExt.align.Form
 * @extends {iExt.align.Base} 
 * @classdesc 用户操作动作组件表单对齐类。
 */
Ext.define('iExt.align.Form', {
    extend: 'iExt.align.Base',
    alias: 'ixalign.form',

    /**
     * 是否可用的方法，根据表单合法性验证。
     * @param {Boolean} isValid 数据是否有效。
     * @param {Ext.data.Model[]} records 数据（可以验证多条数据？）。
     * @return {Boolean} 是否可用。
     */
    ixIsEnabled: function (isValid, records) {
        var me = this,
            enabled = true,
            mode = me.getIxMode();

        // 未指定数据验证，直接返回 true
        if (mode === null) {
            return true;
        }

        // 未指定参数，直接返回 false
        if (arguments.length === 0) {
            return false;
        }

        // 如果要求数据有效，而实际无效，直接返回 false
        if (mode === true && isValid === false) {
            return false;
        }

        var fn = me.getIxEnabledWhen();
        if (fn) {
            for (var i = 0; i < records.length; i++) {
                enabled = fn(records[i]);
                if (!enabled) {
                    break;
                }
            }
        }
        return enabled;
    }

});