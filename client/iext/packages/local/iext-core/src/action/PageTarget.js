/**
 * @class iExt.action.PageTarget
 * @extends {iExt.enums.Base} 
 * @classdesc 页面查看目标枚举。
 */
Ext.define('iExt.action.PageTarget', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [{
        name: 'MAIN',
        text: '主工作区',
        value: 1
    }, {
        name: 'IXWIN',
        text: 'EXT窗体',
        value: 2
    }, {
        name: 'BROWSER',
        text: '浏览器',
        value: 4
    }]

});