/**
 * @class iExt.button.Search
 * @extends {Ext.button.Button} 
 * @classdesc 按钮控件，扩展了 badge 功能。
 */
Ext.define('iExt.button.Search', {
    extend: 'iExt.button.Button',
    alias: 'widget.ixsearchbtn',

    requires: [
        'iExt.app.view.Util'
    ],

    config: {
        /**
         * 筛选条件视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal'
    },

    menuAlign: 'tc-bc?',
    text: '搜索',
    iconCls: 'x-fa fa-search',

    initComponent: function () {
        var me = this;

        me.setIxAlign({
            type: 'list',
            ixMode: null
        });
        me.menu = {
            userCls: 'ix-search-menu',
            items: [{
                xtype: 'ixsearchcontainer',
                header: false,
                ixView: me.getIxView(),
                ixEventItemId: me.getId(),
                ixScale: me.getIxScale(),
                listeners: {
                    ixclose: {
                        fn: me._ixOnClose,
                        scope: me
                    }
                }
            }],
            listeners: {
                beforehide: function (memu) {
                    //return false;
                }
            }
        };
        me.callParent();
    },

    privates: {

        _ixOnClose: function (item, filters) {
            var me = this;
            if (filters) {
                me.fireEvent('ixsearch', me, filters);
            }
            me.hideMenu();
        }
    }

});