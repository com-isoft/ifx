/**
 * @class iExt.toolbar.Selector
 * @extends {iExt.toolbar.Toolbar} 
 * @classdesc 左右数据选择或取消选择工具栏。
 */
Ext.define('iExt.toolbar.Selector', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixselectortbr',

    cls: 'ix-selector-tbr',
    vertical: true,
    padding: '40 5 40 5',
    defaults: {
        xtype: 'ix-actbtn'
    },

    initComponent: function () {
        var me = this;
        me.items = [{
            iconCls: 'x-fa fa-forward',
            tooltip: '添加选择的数据',
            ixEventName: 'ixselect',
            listeners: {
                click: { fn: me._ixOnClick, scope: me }
            }
        }, {
            iconCls: 'x-fa fa-fast-forward',
            tooltip: '添加当前页的所有数据',
            ixEventName: 'ixselectall',
            listeners: {
                click: { fn: me._ixOnClick, scope: me }
            }
        }, {
            xtype: 'tbfill'
        }, {
            iconCls: 'x-fa fa-backward',
            tooltip: '移除选择的数据',
            ixEventName: 'ixdeselect',
            listeners: {
                click: { fn: me._ixOnClick, scope: me }
            }
        }, {
            iconCls: 'x-fa fa-fast-backward',
            tooltip: '移除所有数据',
            ixEventName: 'ixdeselectall',
            listeners: {
                click: { fn: me._ixOnClick, scope: me }
            }
        }];

        me.callParent(arguments);
    },

    /**
     * 设置按钮是否可用
     * @param {Boolean|Object} disabled 是否可用
     * 如果是{Object}，标识设置哪个按钮是否可用
     * {sel/selAll/desel/deselAll: true/false}
     */
    ixSetDisabled: function (disabled) {
        var me = this;
        if (Ext.isObject(disabled)) {
            for (var p in disabled) {
                if (disabled.hasOwnProperty(p)) {
                    if (me._ixItemIndexes.hasOwnProperty(p)) {
                        var b = disabled[p],
                            idx = me._ixItemIndexes[p];
                        me.items.get(idx).setDisabled(b);
                    }
                }
            }
        } else {
            me.setDisabled(disabled);
        }
    },

    privates: {

        /**
         * 按钮索引
         */
        _ixItemIndexes: {
            'sel': 0,
            'selAll': 1,
            'desel': 3,
            'deselAll': 4
        },

        /**
         * 触发数据选择或取消选择事件
         */
        _ixOnClick: function (item, e, eOpts) {
            var event = item.ixEventName;
            this.fireEvent(event, this);
        }

    }

});