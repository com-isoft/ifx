/**
 * @class iExt.grid.Lookup
 * @extends {iExt.grid.Panel} 
 * @classdesc GridPanel参照基础类。
 */
Ext.define('iExt.grid.Lookup', {
    extend: 'iExt.grid.Panel',
    alias: 'widget.ixlookupgrid',

    /**
     * 可配置主题。
     * 可以在主题包中进行重载。
     */
    ixTheme: {
        pageSize: 10
    },

    /**
     * 分页栏缺省配置。
     */
    ixPagingConfig: {
        displayInfo: true,
        ixLastInfo: false
    },

    /**
     * 对于参照组件单选方式不使用 checkbox 。
     */
    applyIxMulti: function (multi) {
        var me = this;
        if (multi !== undefined) {
            if (multi === true) {
                me.selModel = {
                    type: 'checkboxmodel',
                    listeners: {
                        selectionchange: {
                            fn: me.ixOnSelectionChange,
                            scope: me
                        }
                    }
                };
            } else {
                me.selModel = {
                    type: 'rowmodel',
                    listeners: {
                        selectionchange: {
                            fn: me.ixOnSelectionChange,
                            scope: me
                        }
                    }
                };
            }
        }
        return multi;
    }

});