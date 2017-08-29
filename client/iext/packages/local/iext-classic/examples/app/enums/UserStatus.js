Ext.define('app.enums.UserStatus', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixItems: [{
        name: 'ACTIVE',
        text: '有效',
        value: 1
    }, {
        name: 'INACTIVE',
        text: '无效',
        value: 2
    }, {
        name: 'LOGON',
        text: '登录',
        value: 4
    }, {
        name: 'LOGOFF',
        text: '注销',
        value: 8
    }]

});