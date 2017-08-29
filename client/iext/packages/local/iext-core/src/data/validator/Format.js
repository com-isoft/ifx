/**
 * @class iExt.data.validator.Format
 * @extends {Ext.data.validator.Format} 
 * @classdesc 实体属性验证。
 */
Ext.define('iExt.data.validator.Format', {
    extend: 'Ext.data.validator.Format',
    alias: 'data.validator.ixmvformat',
    type: 'ixmvformat',

    validate: function (value) {
        var matcher = this.getMatcher(), result = false;
        if (matcher) {
            if (value === undefined || value === null || value === '') {
                result = true;
            } else {
                result = matcher.test(value);
            }
        }
        return result ? result : this.getMessage();
    }

});