/**
 * @class iExt.app.view.Tab
 * @extends {iExt.app.view.Workspace} 
 * @classdesc 应用程序工作区。
 */
Ext.define('iExt.app.view.Tab', {
    extend: 'iExt.app.view.Workspace',
    xtype: 'widget.ixapptab',

    requires: [

    ],

    cls: 'ix-app-tab',

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
                    text: '安全退出',
                    listeners: {
                        click: function (item, e, eOpts) {
                            item.fireEvent('ixlogoff');
                        }
                    }
                }]
            }
        });

        var nohelp = me.fireEvent('ixnohelp');
        if (nohelp === false) {
            tbrItems.push({
                iconCls: 'x-fa fa-question-circle',
                listeners: {
                    click: function (item, e, eOpts) {
                        item.fireEvent('ixhelp');
                    }
                }
            });
        }

        items.push({
            xtype: 'ixappheader',
            region: 'north',
            reference: 'ixAppHeader',
            items: tbrItems
        });

        items.push({
            xtype: 'ixquickcontainer',
            region: 'east',
            reference: 'ixAppQuick',
            hidden: false,
            width: 240
        });

        items.push({
            xtype: 'ixtabpanel',
            region: 'center',
            plain: true,
            //plain: true,
            reference: 'ixAppMain',
            items: [{
                xtype: 'panel',
                reference: 'ixAppList',
                layout: 'auto',
                title: '应用程序',
                hidden: true,
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

    /**
     * 打开视图
     * @param {Stirng|Ext.Component} view 视图名称或组件
     * @param {Object} options 选项
     */
    ixOpenView: function (item, view, options) {
        var me = this,
            options = options || {};
        var target = options.target || iExt.action.ViewTarget.MAIN;

        switch (target) {
            case iExt.action.ViewTarget.MAIN:
                me._ixMain(item, view, options);
                break;
            case iExt.action.ViewTarget.QUICK:
                me._ixQuick(item, view, options);
                break;
            case iExt.action.ViewTarget.IXWIN:
                me._ixWin(item, view, options);
                break;
            case iExt.action.ViewTarget.SELF:
                me._ixSelf(item, view, options);
                break;
            default:
                break;
        }
    },

    privates: {

        _ixOnSelectApp: function (item, e, opts) {
            var me = this,
                refs = me.getReferences(),
                tbr = refs.ixAppHeader,
                ws = refs.ixAppMain,
                nav = ws.getTabBar(),
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
                ws = refs.ixAppMain,
                nav = ws.getTabBar(),
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
                        ixView: item.view,
                        listeners: {
                            click: function (item, e, eOpts) {
                                var view = item.ixView;
                                if (view) {
                                    item.fireEvent('ixopenview', item, view, {
                                        target: iExt.action.ViewTarget.MAIN
                                    });
                                }
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
        },

        /**
         * 根据视图信息获取视图
         */
        _ixGetView: function (view, viewConfig) {
            var cmp = view;
            if (Ext.isString(view)) {
                cmp = iExt.View.ixCreate(view, viewConfig);
            } else if (view.isComponent !== true) {
                cmp = Ext.apply(view, viewConfig);
                cmp = Ext.create(cmp);
            }
            return cmp;
        },

        /**
         * 在主工作区打开视图
         */
        _ixMain: function (item, view, options) {
            var me = this,
                refs = me.getReferences(),
                main = refs.ixAppMain,
                view = me._ixGetView(view, options.viewConfig);
            if (view) {
                main.ixAddView(view);
            }
        },

        /**
         * 在当前容器中打开视图
         */
        _ixSelf: function (item, view, options) {
            var me = this,
                refs = me.getReferences(),
                main = refs.ixAppMain,
                view = me._ixGetView(view, options.viewConfig);
            if (view) {
                var self = main.getActiveTab();
                self.close();
                main.ixAddView(view);
            }
        },

        _ixQuick: function (item, view, options) {
            var me = this,
                refs = me.getReferences(),
                qv = refs.ixAppQuick,
                view = me._ixGetView(view, options.viewConfig);

            Ext.suspendLayouts();
            if (view) {
                qv.removeAll(true);
                qv.add(view);
            }
            qv.setVisible(true);
            Ext.resumeLayouts(true);
        },

        _ixWin: function (item, view, options) {
            // ****组件在删除时要销毁 _$ixViewId 组件
            var winId = item._$ixViewId;
            var win = Ext.getCmp(winId);
            if (!win) {
                var me = this,
                    itemId = item.getId(),
                    options = options || {},
                    scale = options.scale || 'normal',
                    formType = options.formType || 'search';
                var cachable = me._ixFormWinTypes[formType].cachable,
                    xtype = me._ixFormWinTypes[formType].xtype;
                var fn = options.fn || Ext.emptyFn;
                var winConfig = {
                    xtype: xtype,
                    closable: false,
                    modal: true,
                    listeners: {
                        ixclose: {
                            fn: fn,
                            scope: item
                        }
                    },
                    //animateTarget: item,
                    ixEventItemId: itemId,
                    ixView: view
                };

                // 获取尺寸
                var size = iExt.View.ixGetScaleSize(formType, scale);
                if (size) {
                    winConfig = Ext.apply(winConfig, size);
                }

                win = Ext.create(winConfig);
                // 是否缓存打开的窗体
                if (cachable === true) {
                    item._$ixViewId = win.getId();
                }
            }
            win.show();
        },

        _ixFormWinTypes: {
            'search': {
                xtype: 'ixsearchwin',
                cachable: true
            },
            'lookup': {
                xtype: 'ixlookupwin',
                cachable: true
            },
            'add': {
                xtype: 'ixformwin',
                cachable: false
            },
            'edit': {
                xtype: 'ixformwin',
                cachable: false
            },
            'detail': {
                xtype: 'ixformwin',
                cachable: false
            }
        }

    }

});