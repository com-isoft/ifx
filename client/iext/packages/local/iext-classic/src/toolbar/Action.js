/**
 * @class iExt.toolbar.Action
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 用户操作工具栏控件。
 */
Ext.define('iExt.toolbar.Action', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixacttbr',

    requires: [],

    cls: 'ix-act-tbr',
    overflowHandler: 'scroller',

    defaults: {
        xtype: 'ixactbtn'
    },

    config: {
        /**
         * 对齐的目标控件引用标识。
         */
        ixAlignTargetRef: null,

        /**
         * 授权服务代码。
         */
        ixAuthService: null
    },

    /**
     * 获取工具栏的操作组件标识集合。
     * 自动查找该工具栏所有操作组件的标识，并且可以缓存。
     * 缓存的原理是对于没有改变组件结构的情况直接返回原集合。
     * @return {String[]} 所有操作组件的标识集合。
     */
    ixGetActionIds: function () {
        var me = this;
        if (!me._ixIds) {
            me._ixGetActionIds(this.items);
        }
        return me._ixIds;
    },

    /**
     * 获取工具栏与指定视图对齐的操作组件标识集合。
     * 一般来说，如果操作组件应该指定与其对齐视图的引用。
     * 但是多数情况下，一个视图只有一个工具栏，
     * 不需要特殊指定，应该自动与该视图对齐。
     * @param {Ext.Component} view 视图组件。
     * @return {String[]} 所有操作组件的标识集合。
     */
    ixGetAlignIds: function (view) {
        var me = this,
            viewId = view.getId(),
            // 优先使用ref作为组件的关联标识
            // 如果未指定ref，则使用id
            viewKey = view.getReference() || viewId;

        // 检查是否存在缓存的id集合，如果存在直接返回
        me._ixAlignIds = me._ixAlignIds || {};
        if (me._ixAlignIds[viewKey]) {
            return me._ixAlignIds[viewKey]
        }

        // 获取对齐的操作组件标识集合
        var alignIds = [];
        var ids = me.ixGetActionIds();
        Ext.each(ids, function (id) {
            // 组件不存在，进行下一个处理
            var cmp = Ext.getCmp(id);
            if (!cmp) {
                return;
            }

            // 未指定对齐，进行下一个处理
            var align = cmp.getIxAlign();
            if (!align) {
                return;
            }

            var bset = false;
            if (align.ixAutoTarget === true) {
                bset = true;
            } else {
                // 获取组件的对齐引用
                var ref = align.getIxTargetRef() || '';
                // 如果指定的引用等于当前视图
                if (ref === '') {
                    bset = true;
                    cmp.getIxAlign().ixAutoTarget = true;
                } else if (ref === viewKey) {
                    bset = true;
                }
            }
            if (bset) {
                alignIds.push(id);
                // 为操作组件设置其对齐的组件标识
                align._$ixTargetId = viewId;
            }
        });

        // 缓存标识集合并返回
        me._ixAlignIds[viewKey] = alignIds;
        return alignIds;
    },

    /**
     * 重载初始化控件。主要是根据HFX配置项创建搜索项目和搜索按钮。
     * @memberOf iExt.toolbar.Action#
     */
    initComponent: function () {
        var me = this;
        var service = me.getIxAuthService();

        // 如果授权服务不为空，监听添加组件事件
        // 对于未指定服务的操作组件设置授权服务
        if (service !== null) {
            me.on('beforeadd', me._ixOnBeforeAdd, me);
        }
        me.on('add', me._ixOnAdd, me);

        me.callParent(arguments);
    },

    /**
     * 根据用户授权设置工具栏项目。
     * @memberOf iExt.toolbar.Action#
     * @param {Object} auths 用户授权信息。
     */
    ixSetUserAuth: function (auths) {
        this.setDisabled(false);
        //<debug>
        if (!auths) {
            Ext.raise('未指定用户的授权信息！');
        }
        //</debug>
        this._ixSetUserAuth(this.items, auths);
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        Ext.destroyMembers(this, '_ixIds', '_ixAlignIds');
        this.callParent();
    },

    privates: {

        /**
         * 为添加的操作组件设置ixAuthService属性。
         */
        _ixOnBeforeAdd: function (toolbar, component, index, eOpts) {
            if (component.ixIsAction === true) {
                var service = toolbar.getIxAuthService();
                var auth = component.getIxAuth();
                if (Ext.isString(auth)) {
                    auth = {
                        ixService: service,
                        ixOperation: auth
                    };
                    component.setIxAuth(auth);
                }
            }
        },

        /**
         * 工具栏添加了新的组件，清除缓存的操作组件标识。
         */
        _ixOnAdd: function (tbr, component, index, eOpts) {
            // 有新的组件添加后清除缓存的标识。
            this._ixIds = null;
            this._ixAlignIds = null;
        },

        /**
         * 获取所有操作组件的标识。
         * @memberOf iExt.toolbar.List#
         * @private
         * @param {Obejct[]} items 工具栏项目集合。
         */
        _ixGetActionIds: function (items) {
            var me = this;
            items.each(function (item) {
                if (item.ixIsAction !== true) {
                    return;
                }
                me._ixIds = me._ixIds || [];
                me._ixIds.push(item.getId());
                if (item.menu) {
                    me._ixGetActionIds(item.menu.items);
                }
            });
        },

        /**
         * 根据用户授权设置工具栏项目，递归设置所有项目。
         * @memberOf iExt.toolbar.Action#
         * @private
         * @param {Obejct[]} items 工具栏项目集合。
         * @param {Object} auths 用户授权信息。
         */
        _ixSetUserAuth: function (items, auths) {
            var me = this,
                service = me.ixAuthService();
            items.each(function (item) {
                if (item.ixIsAction !== true) {
                    return;
                }
                if (!item.getIxService()) {
                    item.setIxService(service);
                }
                item.ixSetUserAuth(auths);
                if (item.menu) {
                    me._ixSetUserAuth(item.menu.items, auths);
                }
            });
        }

    }

});