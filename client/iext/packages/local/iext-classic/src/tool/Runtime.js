/**
 * @class iExt.tool.Runtime
 * @extends {Ext.grid.property.Grid} 
 * @classdesc 当前运行时参数信息。
 */
Ext.define('iExt.tool.Runtime', {
    extend: 'Ext.grid.property.Grid',
    alias: 'widget.ixruntimegrid',

    title: '运行参数',
    nameColumnWidth: 200,
    sortableColumns: false,
    clicksToEdit: 0,

    initComponent: function () {
        var me = this, source = {}, sourceConfig = {};

        source['ixSessionKey'] = iExt.app.Runtime.getIxSessionKey();
        sourceConfig['ixSessionKey'] = {
            displayName: '用户会话标识'
        };

        source['ixApp'] = '';
        sourceConfig['ixApp'] = {
            displayName: '应用程序'
        };

        source['ixAppId'] = iExt.app.Runtime.getIxAppId();
        sourceConfig['ixAppId'] = {
            displayName: '&#160;&#160;标识'
        };

        source['ixAppCode'] = iExt.app.Runtime.getIxAppCode();
        sourceConfig['ixAppCode'] = {
            displayName: '&#160;&#160;代码'
        };

        source['ixAppName'] = iExt.app.Runtime.getIxAppName();
        sourceConfig['ixAppName'] = {
            displayName: '&#160;&#160;名称'
        };

        source['ixAppUrl'] = iExt.app.Runtime.getIxAppUrl();
        sourceConfig['ixAppUrl'] = {
            displayName: '&#160;&#160;服务地址'
        };

        source['ixDebug'] = iExt.app.Runtime.getIxDebug();
        sourceConfig['ixDebug'] = {
            displayName: '是否调试'
        };

        source['ixMode'] = iExt.app.Runtime.getIxMode();
        sourceConfig['ixMode'] = {
            displayName: '运行模式'
        };

        me.source = source;
        me.sourceConfig = sourceConfig;

        me.callParent();
    }

});