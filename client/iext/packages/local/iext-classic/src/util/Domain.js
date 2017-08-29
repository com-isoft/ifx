/**
 * @class iExt.util.Domain
 * @classdesc 领域帮助类。
 */
Ext.define('iExt.util.Domain', {
    singleton: true,

    /**
     * 根据领域信息获取工具栏操作对象
     */
    ixGetListActionItems: function (domain) {
        var me = this,
            items = [],
            menu = [];

        if (domain) {
            Ext.Object.each(domain.ixActions, function (key, value, self) {
                if (key === 'add') {
                    items.push({
                        text: value.ixName || '新建',
                        iconCls: value.ixIconCls,
                        ixAuth: value.ixCode || key,
                        ixAlign: {
                            type: 'list',
                            ixMode: null
                        },
                        listeners: {
                            click: function (item, e, eOpts) {
                                item.fireEvent('ixopenview', item, value.ixView, {
                                    target: iExt.action.ViewTarget.MAIN
                                });
                            }
                        }
                    });
                } else if (key === 'detail') {
                    items.push({
                        text: value.ixName || '详细',
                        iconCls: value.ixIconCls,
                        ixAuth: value.ixCode || key,
                        ixAlign: {
                            type: 'list',
                            ixMode: false
                        }
                    });
                }
            });

        }
        return items;
    }

});