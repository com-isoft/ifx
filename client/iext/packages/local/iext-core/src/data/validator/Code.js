/**
 * @class iExt.data.validator.Code
 * @extends {iExt.data.validator.Format} 
 * @classdesc 代码验证。
 */
Ext.define('iExt.data.validator.Code', {
    extend: 'iExt.data.validator.Format',
    alias: 'data.validator.ixmvcode',
    type: 'ixmvcode',

    config: {
        message: '只能使用大小写字母、数字或下划线！',
        matcher: /^[A-Za-z0-9_]+$/
    }

});