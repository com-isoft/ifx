/**
 * @class iExt.app.view.Card
 * @extends {iExt.app.view.Workspace} 
 * @classdesc 应用程序工作区。
 */
Ext.define('iExt.app.view.Card', {
    extend: 'iExt.app.view.Workspace',
    xtype: 'widget.ixappcard',
    requires: [

    ],

    cls: 'ix-app-card',

    initComponent: function () {
        var me = this,
            items = [],
            headerItems = me.getIxHeaderItems() || [],
            home = me.getIxHomeView(),
            store = me.getIxAppsStore();

        if (!home) {
            Ext.raise('Card Workspace: 未设置首页视图信息！');
        }

        var tbrItems = [];
        tbrItems.push({
            iconCls: 'x-fa fa-th',
            scale: 'large',
            listeners: {
                click: {
                    fn: me._ixOnSelectApp,
                    scope: me
                }
            }
        }, '->');

        if (headerItems.length > 0) {
            tbrItems.push(headerItems);
        }

        tbrItems.push({
            bind: {
                text: '{ixa.user.code}-{ixa.user.name}'
            },
            iconCls: 'x-fa fa-user',
            menuAlign: 'tr-br',
            menu: {
                shadow: false,
                items: [{
                    text: '修改口令'
                }, {
                    text: '安全退出'
                }]
            }
        });

        items.push({
            xtype: 'container',
            region: 'north',
            items: [{
                xtype: 'ixappheader',
                reference: 'ixAppHeader',
                items: tbrItems
            }, {
                xtype: 'toolbar',
                reference: 'ixAppNav',
                items: [{
                    xtype: 'ixtbrtitle',
                    html: '用户'
                }, '->', {
                    xtype: 'ixtbrholder'
                }]
            }]
        });

        items.push({
            xtype: 'ixquickcontainer',
            region: 'east',
            reference: 'ixAppQuick',
            hidden: false,
            width: 240
        });

        items.push({
            xtype: 'container',
            region: 'center',
            reference: 'ixAppMain',
            layout: {
                type: 'card'
            },
            items: [{
                xtype: 'panel',
                reference: 'ixAppList',
                layout: 'auto',
                bodyCls: 'ix-apps-body',
                items: [{
                    xtype: 'ixappsview',
                    width: 780,
                    store: store,
                    listeners: {
                        selectionchange: {
                            fn: me._ixOnSelectionChange,
                            scope: me
                        }
                    }
                }]
            }, {
                xtype: home
            }]
        });

        me.items = items;
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var ws = me.lookupReference('ixAppMain');
        var layout = ws.getLayout();
        layout.setActiveItem(1);
    },

    privates: {

        _ixOnSelectApp: function (item, e, opts) {
            var me = this,
                refs = me.getReferences(),
                tbr = refs.ixAppHeader,
                nav = refs.ixAppNav,
                ws = refs.ixAppMain,
                qv = refs.ixAppQuick,
                apps = refs.ixAppList;

            var isApps = tbr._ixApps === true;

            Ext.suspendLayouts();
            if (isApps) {
                qv.setVisible(qv._ixVisible || false);
                item.setIconCls('x-fa fa-th');
            } else {
                qv._ixVisible = qv.isVisible();
                item.setIconCls('x-fa fa-chevron-left');
                qv.setVisible(false);
            }
            tbr.items.each(function (element, index) {
                if (element.ixAppMenu === true) {
                    element.setVisible(isApps);
                }
            });
            var layout = ws.getLayout();
            if (isApps) {
                layout.setActiveItem(me._ixLastActiveItem);
            } else {
                me._ixLastActiveItem = layout.getActiveItem();
                layout.setActiveItem(apps);
            }
            nav.setVisible(isApps);
            Ext.resumeLayouts(true);

            tbr._ixApps = !isApps;
        },

        _ixOnSelectionChange: function (selmodel, selected, eOpts) {
            var me = this,
                refs = me.getReferences(),
                tbr = refs.ixAppHeader,
                nav = refs.ixAppNav,
                ws = refs.ixAppMain,
                qv = refs.ixAppQuick,
                apps = refs.ixAppList;

            var layout = ws.getLayout();
            layout.setActiveItem(me._ixLastActiveItem);

            var app = selected[0];
            var code = app.get('code');
            tbr.items.getAt(0).setVisible(true);
            tbr.items.getAt(0).setIconCls('x-fa fa-th');
            tbr.items.each(function (item, index) {
                if (item.ixAppMenu === true) {
                    tbr.remove(item);
                }
            });
            var idx = 1;
            tbr.insert(idx, {
                xtype: 'ixapptitle',
                ixScale: 'large',
                ixAppMenu: true,
                html: app.get('name')
            });
            idx++;

            var menus = me.getViewModel().getData()[code];
            if (menus) {
                menus.forEach(function (item, index) {
                    tbr.insert(idx, {
                        text: item.name,
                        ixAppMenu: true,
                        listeners: {
                            click: function (item, e, eOpts) {
                                alert('you are clicking ' + item.getText());
                            }
                        }
                    });
                    idx++;
                });
            }

            qv.removeAll();
            qv.setVisible(false);

            nav.setVisible(true);

            tbr._ixApps = false;
        }

    }

});