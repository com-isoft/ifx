/**
 * @class iExt.app.view.Scales
 * @extends {iExt.enums.Base} 
 * @classdesc 视图尺寸枚举。
 */
Ext.define('iExt.app.view.Scales', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [{
        name: 'USER',
        text: '自定义',
        value: 1
    }, {
        name: 'SMALL',
        text: '较小',
        value: 2
    }, {
        name: 'NORMAL',
        text: '常规',
        value: 4
    }, {
        name: 'MEDIUM',
        text: '较大',
        value: 8
    }, {
        name: 'LARGE',
        text: '大',
        value: 16
    }]

});