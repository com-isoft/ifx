/**
 * @class iExt.action.View
 * @extends {iExt.action.Base}
 * @classdesc 打开视图操作动作类。
 */
Ext.define('iExt.action.View', {
    extend: 'iExt.action.Base',
    alias: 'ixaction.view',

    requires: [
        'iExt.action.ViewTarget'
    ],

    config: {
        /**
         * 打开视图目标。
         */
        ixTarget: iExt.action.ViewTarget.MAIN
    },

    /**
     * 视图类名称或视图对象（不是已创建的组件）。
     * 视图的xtype名称，或者完全类名称。
     */
    ixView: null,

    /**
     * 视图的扩展配置。
     */
    ixConfig: null,

    /**
     * 动态缓存的视图标识。
     * 对于参照、搜索等操作，可以缓存其视图，以保存视图状态。
     * 但是打开视图的组件需要手动销毁缓存的视图。
     * 由于是框架动态创建的数据所以使用_$前缀。
     * _$ixViewId: null,
     */

    /**
     * 根据字符串解析枚举值。
     */
    applyIxTarget: function (target) {
        if (Ext.isString(target)) {
            target = iExt.action.ViewTarget.ixGetValue(
                target.toUpperCase());
        }
        return target;
    },

    /**
     * 是否可用。
     */
    ixIsEnabled: function () {
        return !Ext.isEmpty(this.getIxView());
    },

    /**
     * 执行动作。
     */
    ixDo: function (item, align, records) {
        // iExt.Msg.ixInfo(me.getIxName() + '-' + me.getIxView());
        var action = this;
        var close = action.getIxClose();
        if (close === true && item.ixAlignView) {
            // 关闭当前窗口
            var win = item.ixAlignView.ownerCt;
            if (win.isWindow === true) {
                win.close();
            }
        }
        if (Ext.isArray(records)) {
            records = records[0];
        }
        iExt.action.View.ixOpenView(item, action, records);
    },

    statics: {

        /**
         * 打开视图
         */
        ixOpenView: function (item, action, record) {
            var name = action.getIxName(),
                view = action.getIxView(),
                config = action.getIxConfig() || {},
                params = action.getIxParams() || {};

            if (!view) {
                var service = action.getIxService() || '',
                    code = action.getIxCode() || '';
                view = service + '-' + code;
            }
            if (record) {
                Ext.apply(params, {
                    ixId: record.get('id')
                });
            }
            Ext.apply(config, {
                ixParams: params
            });
            var target = action.getIxTarget();
            item.fireEvent('ixopenview', item, target, view, config);
        }
    }

});