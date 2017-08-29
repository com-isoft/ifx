/**
 * @class iExt.app.view.window.Base
 * @extends {iExt.window.Window} 
 * @classdesc iExt 视图窗口基础类。
 */
Ext.define('iExt.app.view.window.Base', {
    extend: 'iExt.window.Window',
    alias: 'widget.ixviewwin',

    config: {
        /**
         * 调用该窗口的组件。
         * {String}
         */
        ixEventItemId: null,

        /**
         * 视图类名称或视图组件配置。
         * {String|Object}
         */
        ixView: null,

        /**
         * 视图规格。
         */
        ixScale: 'normal',

        /**
         * 返回的数据。
         */
        ixReturn: null,

        /**
         * 是否检查脏数据。
         */
        ixDirtyCheck: false
    },

    /**
     * 视图变更事件。
     * @memberOf iExt.app.view.window.Base#
     * @event ixviewchanged
     * @param {iExt.app.view.window.Base} this 视图容器组件
     * @param {Ext.Component} view 当前的视图。
     */

    /**
     * 视图数据模型。
     * 缺省值使用 {iExt.app.view.model.Container}
     */
    viewModel: 'ixviewcontainer',
    layout: 'fit',
    referenceHolder: true,

    bind: {
        /**
         * 绑定标题 title。
         */
        title: '{ixvc.title}'
    },

    /**
     * 设置视图。
     */
    applyIxView: function (view) {
        var me = this;
        if (view) {
            view = iExt.View.ixGetView(view);
            if (me.rendered) {
                me.removeAll();
                me.add(view);
            } else {
                me.items = [];
                me.items.push(view);
            }
        }
        return view;
    },

    initComponent: function () {
        var me = this,
            title = me.getTitle();

        if (title) {
            me.setBind({
                title: '{ixvc.title}'
            });
            vm = me.getViewModel();
            vm.set('ixvc.title', title);
        }
        // 设置工具栏
        me.ixSetToolbar();
        // 监听事件处理
        me.on('afterrender', me.ixOnAfterRender, me);
        me.on('add', me.ixOnAdd, me);
        me.on('show', me.ixOnShow, me);
        me.on('beforeclose', me.ixOnBeforeClose, me);

        // <debug>
        iExt._$views[me.getId()] = Ext.now();
        // </debug>

        me.callParent(arguments);
    },

    /**
     * 设置容器的工具栏。
     */
    ixSetToolbar: Ext.emptyFn,

    /**
     * 获取当前视图。
     */
    ixGetCurrentView: function () {
        return this._ixCurrentView;
    },

    /**
     * 当前视图变更模板方法
     * @param {Ext.Component} view 变更的视图
     */
    ixOnViewChanged: function (view) {
        var me = this;
        if (me.hasListeners.ixviewchanged) {
            me.fireEvent('ixviewchanged', me, view);
        }
    },

    /**
     * 渲染后处理。
     */
    ixOnAfterRender: function (win, eOpts) {

    },

    /**
     * 处理组件标题。
     */
    ixOnAdd: function (panel, component, index, eOpts) {
        if (component.isComponent === true && component.getTitle) {
            var me = this,
                title = component.getTitle();
            var vm = this.getViewModel();
            vm.set('ixvc.title', title);
            me._ixCurrentView = component;
            me.ixOnViewChanged(component);
        }
    },

    /**
     * 
     */
    ixOnShow: function (win, eOpts) {

    },

    /**
     * 关闭前事件处理，
     * 对于一些需要提示存在未保存数据的情况下进行处理。
     */
    ixOnBeforeClose: function () {
        var me = this;
        me.ixOnClose();
        return true;
    },

    /**
     * 触发自定义的关闭事件 ixclose 。
     */
    ixOnClose: function () {
        var me = this;
        if (me.hasListeners.ixclose) {
            me.fireEvent('ixclose', me, Ext.clone(me.getIxReturn()));
        }
    },

    /**
     * 销毁处理，清除缓存的视图。
     */
    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '_ixCurrentView');
        // <debug>
        delete iExt._$views[this.getId()];
        // </debug>
    },

    /**
     * 取消按钮的默认处理，可以被重载。
     * @param {Ext.Compomnent} item 触发事件的组件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件选项。
     */
    ixOnCancel: function (item, e, eOpts) {
        var me = this;
        me.setIxReturn(null);
        me.close();
    },

    privates: {

        /**
         * 当前视图。
         * 添加子组件后设置为当前视图。
         */
        _ixCurrentView: null

    }

});