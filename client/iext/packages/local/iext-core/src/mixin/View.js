/**
 * @mixin iExt.mixin.View
 * @extends {Ext.Mixin} 
 * @classdesc iExt视图 MIXIN。
 */
Ext.define('iExt.mixin.View', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'iext-view',
        on: {
            initComponent: 'ixOnInitComponent',
            destroy: 'ixOnDestroy',
            afterRender: 'ixOnAfterRender'
        }
    },

    config: {
        /**
         * 数据模型的类型名称
         * 例如: examples.model.User
         */
        ixModelName: undefined,
        
        /**
         * 视图数据模型的属性名称。
         * 如果未指定自动使用 ixModelName 的简称的小写形式。
         * 例如: user
         */
        ixViewDataName: null,

        /**
         * 权限验证的业务服务名称。
         * 如果未指定自动使用 ixModelName 的简称的Camel形式的复数？
         * 例如: user
         */
        ixService: null,

        /**
         * 视图参数。
         * 格式：{
         *  ixId: '', 
         *  ixRecord: Ext.data.Model
         * }
         */
        ixParams: null
    },

    ixIsView: true,

    /**
     * 视图的hash值，用于路由
     */
    ixHashCode: 0,

    /**
     * 缺省的标识参数名称。
     * 参数是通过视图传递的，所以应该定义在视图中。
     */
    ixIdProperty: 'ixId',

    /**
     * 缺省的数据参数名称。
     * 参数是通过视图传递的，所以应该定义在视图中。
     */
    ixRecordProperty: 'ixRecord',

    /**
     * 与该视图对齐的操作组件标识集合。
     * 在视图控制器加载时会自动设置。
     */
    _$ixAlignTargetIds: null,

    /**
     * 获取标识参数值的快捷方式。
     */
    ixGetId: function () {
        return this.ixGetParamValue(this.ixIdProperty);
    },

    /**
     * 获取数据参数值的快捷方式。
     */
    ixGetRecord: function () {
        return this.ixGetParamValue(this.ixRecordProperty);
    },

    /**
     * 获取参数对象。
     */
    ixGetParams: function () {
        var view = this.getView();
        if (view.ixIsView === true) {
            return view.getIxParams();
        }
        return undefined;
    },

    /**
     * 获取参数值。
     * @param {Stirng} paramName 参数名称。
     */
    ixGetParamValue: function (paramName) {
        var params = this.getIxParams();
        if (params) {
            return params[paramName];
        }
        return undefined;
    },

    /**
     * 初始化视图处理。
     */
    ixOnInitComponent: function () {
        // <debug>
        iExt.log('视图初始化', this.$className, this.getId());
        iExt._$views[this.getId()] = Ext.now();
        // </debug>
    },

    /**
     * 析构视图处理。
     */
    ixOnDestroy: function () {
        // <debug>
        iExt.log('视图销毁', this.$className, this.getId());
        delete iExt._$views[this.getId()];
        // </debug>
    },

    /**
     * 渲染后处理
     */
    ixOnAfterRender: function () {
        // <debug>
        iExt.log('视图已渲染', this.$className, this.getId());
        // </debug>
    }

});