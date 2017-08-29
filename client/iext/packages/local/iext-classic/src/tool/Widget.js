/**
 * @class iExt.tool.Widget
 * @extends {Ext.container.Container} 
 * @classdesc 控件调试。
 */
Ext.define('iExt.tool.Widget', {
    extend: 'Ext.container.Container',
    alias: 'widget.ixwidget',

    title: '控件调试',
    layout: 'border',

    referenceHolder: true,

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'panel',
            title: '预览',
            region: 'center',
            header: false,
            reference: 'pnlView',
            scrollable: 'y',
            listeners: {
                afterRender: function (panle) {
                    prettyPrint();
                }
            }
        }, {
            xtype: 'panel',
            title: '代码',
            header: false,
            split: {
                size: 5
            },
            reference: 'pnlCode',
            weight: 20,
            height: 240,
            region: 'south',
            layout: 'fit',
            bodyCls: 'ix-code-editor',
            tbar: {
                xtype: 'toolbar',
                items: [{
                    text: '清除',
                    iconCls: 'x-fa fa-eject',
                    listeners: {
                        click: {
                            fn: me._ixClear,
                            scope: me
                        }
                    }
                }, {
                    xtype: 'label',
                    reference: 'lblInfo'
                }, '->', {
                    text: '代码美化',
                    iconCls: 'x-fa fa-bars',
                    listeners: {
                        click: {
                            fn: me._ixPrettyPrint,
                            scope: me
                        }
                    }
                }, {
                    text: '运行',
                    iconCls: 'x-fa fa-play',
                    listeners: {
                        click: {
                            fn: me._ixAdd,
                            scope: me
                        }
                    }
                }]
            },
            html: me._ixPreTag +
                '{xtype:"toolbar",items:[' +
                '{xtype:"textfield",value:"hello world"},' +
                '{xtype:"button",text:"ok"}]}' +
                '</pre>',
            listeners: {
                afterRender: function () {
                    prettyPrint();
                }
            }
        }];
        me.callParent(arguments);
    },

    privates: {

        _ixPreTag: '<pre contenteditable="true" spellcheck="false" class="prettyprint">',

        /**
         * 添加组件
         */
        _ixAdd: function (item, e, eOpts) {
            var me = this,
                refs = me.getReferences();
            try {
                me._ixClear();
                var codeEl = refs.pnlCode.body.down('pre:first-child');
                var code = codeEl.dom.innerText;
                var cmpCode = Ext.decode(code);
                var cmp = refs.pnlView.add(cmpCode);
                var info;
                if (Ext.isArray(cmp)) {
                    info = '创建了 ' + cmp.length + ' 个控件...';
                } else {
                    info = '创建了 className: ' + cmp.$className +
                        ', id: ' + cmp.getId() + ' 的控件...';
                }
                refs.lblInfo.setText(info);
            } catch (e) {
                refs.pnlView.setHtml(
                    '<p><b>Message:</b> ' + e.message + '</p>' +
                    '<p><b>Stack:</b> ' + e.stack.replace(/\n/g, '<br/>') + '</p>');
                return true;
            }
        },

        /**
         * 清除所有组件
         */
        _ixClear: function (item, e, eOpts) {
            var me = this,
                refs = me.getReferences();
            refs.pnlView.removeAll();
            refs.pnlView.setHtml('');
            refs.lblInfo.setText('');
        },

        /**
         * 美化代码
         */
        _ixPrettyPrint: function (item, e, eOpts) {
            var me = this,
                refs = me.getReferences();
            var body = refs.pnlCode.body;
            var codeEl = body.down('pre:first-child');
            var code = codeEl.dom.innerText;
            body.setHtml(me._ixPreTag + code + '</pre>');
            prettyPrint();
        }

    }

});