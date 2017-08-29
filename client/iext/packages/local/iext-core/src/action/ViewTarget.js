/**
 * @class iExt.action.ViewTarget
 * @extends {iExt.enums.Base} 
 * @classdesc 视图查看目标枚举。
 */
Ext.define('iExt.action.ViewTarget', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [{
        name: 'MAIN',
        text: '主工作区',
        value: 1
    }, {
        name: 'QUICK',
        text: '快速查看',
        value: 2
    }, {
        name: 'IXWIN',
        text: 'EXT窗口',
        value: 4
    }, {
        name: 'SELF',
        text: '当前容器',
        value: 8
    }]

});