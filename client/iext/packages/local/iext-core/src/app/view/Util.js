/**
 * @class iExt.app.view.Util
 * @classdesc 应用视图帮助类。
 */
Ext.define('iExt.app.view.Util', {
    alternateClassName: 'iExt.View',

    requires: [
        'iExt.util.Util'
    ],

    singleton: true,

    /**
     * 创建视图对象。
     * @memberOf iExt.app.view.Util#
     * @param {String|Object} view 视图名称或者视图对象。
     * @param {Object} config 视图的配置信息。
     * @return {Ext.Component} 创建的视图组件。
     */
    ixCreate: function (view, config) {
        if (!view) {
            Ext.raise('请指定要创建的视图！');
            return null;
        }
        var cmp = null;

        if (Ext.isString(view)) {
            if (view.indexOf('.') < 0) {
                // 使用的是别名
                var alias = 'widget.' + view;
                var className = Ext.ClassManager.getNameByAlias(alias);
                if (!className) {
                    Ext.raise('指定的视图 [' + view + '] 不存在！');
                } else {
                    cmp = Ext.widget(view, config);
                }
            } else {
                // 使用的是完整类名
                var viewClass = Ext.ClassManager.get(view);
                if (!viewClass) {
                    Ext.raise('指定的视图 [' + view + '] 不存在！');
                } else {
                    cmp = Ext.create(view, config);
                }
            }
        } else {
            cmp = Ext.widget(view, config);
        }

        return cmp;
    },

    /**
     * 根据视图信息获取视图对象
     * @param {String|Object} view 视图信息
     * @param {Object} viewConfig 视图信息
     * @return {Object} 视图对象
     */
    ixGetView: function (view, viewConfig) {
        if (Ext.isString(view)) {
            view = {
                xtype: view
            };
        }
        view = Ext.apply(view, viewConfig);
        return view;
    },

    /**
     * 根据名称获取视图的完整类名称。
     * @memberOf iExt.app.view.Util#
     * @param {String} viewName 视图名称。
     * @return {String} 完整类名称。
     */
    ixGetViewClass: function (viewName) {
        var viewClass;
        if (viewName.indexOf('.') < 0) {
            // 使用的是别名
            var alias = 'widget.' + viewName;
            viewClass = Ext.ClassManager.getNameByAlias(alias);
        } else {
            viewClass = Ext.ClassManager.get(viewName);
        }
        if (!viewClass) {
            Ext.raise('指定的视图 [' + viewName + '] 不存在！');
        }
        return viewClass;
    },

    /**
     * 打开视图
     * @param {Ext.Component} item 打开视图的组件
     * @param {String|Object} 视图类名称或者视图组件配置。
     * @param {String|iExt.action.ViewTarget} target 在哪里打开。
     * @param {Object} options 可选的参数。
     * 
     */
    ixOpenView: function (item, view, target, options) {
        // 根据字符串解析目标枚举值
        if (Ext.isString(target)) {
            target = iExt.action.ViewTarget.ixGetValue(target.toUpperCase());
        }
        target = target || iExt.action.ViewTarget.MAIN;
        options = options || {};
        options = Ext.applyIf(options, {
            target: target
        });
        item.fireEvent('ixopenview', item, view, options);
    },

    /**
     * 
     * @param {Object} component 组件。
     */
    ixClearValues: function (component) {
        var clear = function (items) {
            if (items && items.length > 0) {
                items.each(function (item) {
                    // 对于某些输入项可能不允许清除
                    // 例如：隐含的搜索条件。可以设置 ixClearable = false
                    if (item.setValue && item.ixClearable !== false) {
                        item.setValue(null);
                    }
                    clear(item.items);
                });
            }
        };
        clear(component.items);
    },

    /**
     * 根据表单类型和规格获取尺寸配置
     * @param {iExt.app.view.FormTypes} formType 表单类型
     * @param {iExt.app.view.Scales} scale 规格
     */
    ixGetScaleSize: function (formType, scale) {
        formType = formType.toLowerCase();
        scale = scale || 'normal';
        scale = scale.toLowerCase();
        var size;
        if (this.ixScaleSizes[formType]) {
            size = this.ixScaleSizes[formType][scale];
        }
        //<debug>
        if (!size) {
            iExt.warn('未能获得尺寸信息', formType, scale);
        }
        //</debug>
        return size;
    },

    /**
     * 规格尺寸定义
     */
    ixScaleSizes: {
        'list': {},
        'add': {

        },
        'edit': {},
        'detail': {},
        'search': {
            small: {
                width: 240,
                maxHeight: 320
            },
            normal: {
                width: 560,
                maxHeight: 420
            },
            medium: {
                width: 640,
                maxHeight: 480
            },
            large: {
                width: 720,
                maxHeight: 520
            }
        },
        'lookup': {
            normal: {
                width: 640,
                minHeight: 480,
                maxHeight: 640
            }
        },
        'quick': {}
    }

});