/**
 * @class iExt.app.view.container.Base
 * @extends {Ext.panel.Panel} 
 * @classdesc 视图容器。
 * 该容器的作用是根据domain的配置信息，
 * 自动生成相关的操作组件，保证领域功能操作的一致性。
 */
Ext.define('iExt.app.view.container.Base', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewcontainer',

    requires: [],

    mixins: [
        'iExt.mixin.View'
    ],

    border: false,
    layout: 'fit',
    referenceHolder: true,
    
    /**
     * 视图数据模型
     * 缺省值使用 {iExt.app.container.ViewModel}
     */
    viewModel: 'ixviewcontainer',

    config: {
        /**
         * 领域模型 String / iExt.domain.Domain
         * 领域模型类名称，或者domain的实例
         */
        ixDomain: null,
        /**
         * 调用该窗口的组件
         * {String}
         */
        ixEventItemId: null,
        /**
         * 视图类名称或视图组件配置
         * {String|Object}
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal'
    },

    /**
     * 视图变更事件。
     * @memberOf iExt.app.view.container.Base#
     * @event ixviewchanged
     * @param {iExt.app.view.container.Base} this 视图容器组件
     * @param {Ext.Component} view 当前的视图。
     */

    /**
     * 视图类型
     */
    ixViewType: 'list',

    applyIxView: function (view) {
        return view;
    },

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();

        if (scale) {
            var size = iExt.View.ixGetScaleSize(me.ixViewType, scale);
            if (size) {
                Ext.applyIf(me, size);
            }
        }

        // 由于不同视图容器显示标题的方式可能不同
        // 所以在各自的容器中设置标题的绑定信息
        // 例如：快速查看的视图容器，标题和子标题分别显示

        // 设置工具栏
        me.ixSetToolbar();
        // 监听添加子组件事件处理
        me.on('beforeadd', me.ixOnBeforeAdd, me);
        me.on('add', me.ixOnAdd, me);
        // 为了自动处理工具栏组件的可用性操作
        // 需要监听工具栏的添加和删除事件处理
        me.on('dockedadd', me.ixOnDockedAdd, me);
        me.on('dockedremove', me.ixOnDockedRemove, me);

        // <debug>
        iExt._$views[me.getId()] = Ext.now();
        // </debug>

        me.callParent();
    },

    /**
     * 获取当前视图。
     */
    ixGetCurrentView: function () {
        return this._ixCurrentView;
    },

    /**
     * 获取当前操作工具栏集合。
     */
    ixGetActionBarIds: function () {
        return this._ixActionBarIds;
    },

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: Ext.emptyFn,

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

    ixOnBeforeAdd: function (panel , component , index , eOpts) {

    },

    /**
     * 添加子组件后处理
     */
    ixOnAdd: function (panel, component, index, eOpts) {
        if (component.isComponent === true && component.getTitle) {
            var me = this,
                title = component.getTitle();
            var vm = this.getViewModel();
            vm.set('ixvc.subTitle', title);
            vm.set('ixvc.viewRef', component.getReference());
            vm.set('ixvc.viewId', component.getId());
            me._ixCurrentView = component;
            me.ixOnViewChanged(component);
        }
    },

    /**
     * 添加工具栏处理
     */
    ixOnDockedAdd: function (panel, component, index, eOpts) {
        // 具有获取操作组件标识的工具栏
        if (component.isComponent === true && component.ixGetActionIds) {
            var me = this,
                id = component.getId();
            me._ixActionBarIds = me._ixActionBarIds || {};
            me._ixActionBarIds[id] = id;
        }
    },

    /**
     * 删除工具栏处理
     */
    ixOnDockedRemove: function (panel, component, eOpts) {
        if (component.isComponent === true && component.ixGetActionIds) {
            var me = this,
                id = component.getId();
            delete me._ixActionBarIds[id];
        }
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '_ixActionBarIds', '_ixCurrentView');
        // <debug>
        delete iExt._$views[this.getId()];
        // </debug>
    },

    privates: {

        /**
         * 操作工具栏组件{iExt.toolbar.*}标识集合
         * {String[]}
         */
        _ixActionBarIds: null,

        /**
         * 当前视图
         * 添加子组件后设置为当前视图
         */
        _ixCurrentView: null

    }

});