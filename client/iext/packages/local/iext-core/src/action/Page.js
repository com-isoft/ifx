/**
 * @class iExt.action.Page
 * @extends {iExt.action.Base}
 * @classdesc 打开页面操作动作类。
 */
Ext.define('iExt.action.Page', {
    extend: 'iExt.action.Base',
    alias: 'ixaction.page',

    requires: [
        'iExt.action.PageTarget'
    ],

    config: {
        /**
         * 打开页面目标
         */
        ixTarget: iExt.action.PageTarget.BROWSER
    },

    /**
     * 页面地址
     */
    ixUrl: 'about:blank',

    /**
     * 窗体配置
     */
    ixConfig: null,

    /**
     * 根据字符串解析枚举值
     */
    applyIxTarget: function (target) {
        if (Ext.isString(target)) {
            target = iExt.action.PageTarget.ixGetValue(
                target.toUpperCase());
        }
        return target;
    },

    /**
     * 是否可用
     */
    ixIsEnabled: function () {
        return this.ixUrl !== null;
    },

    /**
     * 执行动作
     */
    ixDo: function (item, align, data) {
        var action = this;
        var close = action.ixClose;
        if (close === true && item.ixAlignView) {
            // 关闭当前窗口
            var win = item.ixAlignView.ownerCt;
            if (win.isWindow === true) {
                win.close();
            }
        }
        if (Ext.isArray(data)) {
            data = data[0];
        }
        iExt.action.Page.ixOpenPage(item, action, data);
    },

    statics: {

        /**
         * 打开页面
         */
        ixOpenPage: function (item, action, data) {
            var name = action.ixName,
                url = action.ixUrl,
                config = action.ixConfig || {},
                params = action.ixParams || {};

            if (!url) {
                url = 'about:blank';
            }
            var target = action.getIxTarget();
            item.fireEvent('ixopenpage', item, target, url, config);
        }
    }

});