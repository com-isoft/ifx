/**
 * @class iExt.app.view.Logon
 * @extends {Ext.container.Viewport} 
 * @classdesc 登录视图的基础类。
 */
Ext.define('iExt.app.view.Logon', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.ixlogon',
    cls: 'ix-app-logon',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'iExt.app.view.model.Main',
        'iExt.form.Panel',
        'iExt.form.field.Text'
    ],

    viewModel: 'ixmain',

    config: {
        /**
         * 用户信息
         * {code: '', password: ''}
         */
        ixUser: null,

        /**
         * 系统名称
         * 可以通过 iExt.app.Runtime 配置
         */
        ixTitle: 'iExt',

        /**
         * 版权信息
         * 可以通过 iExt.app.Runtime 配置
         * 不同的应用可能不一致
         */
        ixCopyright: '&copy;版权所有，保留所有权利！'
    },

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        minWidth: 240
    },

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    /**
     * 登录事件。
     * @memberOf iExt.app.view.Logon#
     * @event ixlogon
     * @param {iExt.app.view.Logon} this iExt.app.view.Logon控件。
     * @param {String} code 登录用户代码。
     * @param {String} password 用户口令。
     */

    /**
     * 重载初始化控件。主要是创建登录页面的控件和布局。
     * @memberOf iExt.app.view.Logon#
     */
    initComponent: function () {
        var me = this;
        me.items = [];

        var form = {
            xtype: 'ixform',
            bodyPadding: '10 20 20 20',
            defaultButton: 'btnLogon',
            referenceHolder: true,
            title: me.getIxTitle(),
            minWidth: null,
            minHeight: null,
            layout: {
                type: 'vbox'
            },

            defaults: {
                xtype: 'ixtext',
                msgTarget: 'title',
                labelAlign: 'top',
                minWidth: me.ixTheme.minWidth,
                margin: '10 0 10 0'
            },

            header: {
                cls: 'ix-logon-header',
                titleAlign: 'center'
            },

            items: [{
                fieldLabel: '帐号',
                name: 'code',
                allowBlank: false,
                triggers: {
                    user: {
                        cls: 'x-fa fa-user'
                    }
                }
            }, {
                fieldLabel: '密码',
                allowBlank: false,
                name: 'password',
                inputType: 'password',
                triggers: {
                    lock: {
                        cls: 'x-fa fa-lock'
                    }
                }
            }, {
                xtype: 'button',
                reference: 'logonBtn',
                text: '马上登录',
                margin: '30 0 0 0',
                minWidth: me.ixTheme.minWidth,
                listeners: {
                    click: {
                        fn: me.ixOnLogon,
                        scope: me
                    }
                }
            }]
        };
        me.items.push(form);

        var cmp = {
            xtype: 'component',
            cls: 'ix-logon-copyright',
            html: me.getIxCopyright()
        };
        me.items.push(cmp);
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var form = me.items.get(0);
        form.focus();
    },

    applyIxUser: function (user) {
        var me = this;
        if (Ext.isObject(user)) {
            user = Ext.clone(user);
            if (me.rendered) {
                var code = me.down('textfield[name=code]');
                code.setValue(user.code);
                var password = me.down('textfield[name=password]');
                password.setValue(user.password);
            }
        }
        return user;
    },

    /**
     * 登录操作事件处理。
     * @memberOf iExt.ws.Logon#
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixOnLogon: function (item, e, eOpts) {
        var me = this;
        var form = me.down('form');
        if (!form || !form.isValid()) {
            return;
        }
        var user = form.getValues();
        me.fireEvent('ixlogon', user.code, user.password);
    }

});