/**
 * @class iExt.align.Base
 * @classdesc 用户操作动作组件对齐基础类。
 * 用于控制操作组件需要对齐的组件以及验证条件，
 * 可以根据验证条件判断该对齐信息所属的操作组件是否可用。
 */
Ext.define('iExt.align.Base', {
    alternateClassName: 'iExt.Align',
    alias: 'ixalign.auto',
    aliasPrefix: 'ixalign.',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    factoryConfig: {
        /**
         * 缺省使用表单对齐。
         */
        defaultType: 'form'
    },

    config: {
        /**
         * 对齐方式 true/false 。
         * 对于表单对齐，表示是否要求数据必须有效；
         * 对于列表对齐，表示是否允许操作多条数据。
         */
        ixMode: false,

        /**
         * 对齐的目标控件引用标识。
         * 控制器或视图，可以根据ref值获取对应的组件，
         * 然后设置_$ixTargetId属性值。
         */
        ixTargetRef: null,

        /**
         * 对齐验证函数。
         * 使用表达式的形式设定操作的可用性。例如：
         * '{status===1}' / '"{name}"==="abc"'
         * 实际的求值过程是用属性值替换{}占位符，
         * 注意表达式的数据类型的一致性。
         */
        ixEnabledWhen: null
    },

    /**
     * 对齐的目标控件标识，实际设置对齐组件时并不能直接指定id。
     * 所以在视图加载中会自动设置该值，以_$命名。
     */
    _$ixTargetId: null,

    /**
     * 自动对齐的操作组件。
     * 由于存在动态对齐操作组件的场景，例如列表视图容器，
     * 需要根据视图的变化自动设置对齐。
     * 如果第一次设置后就无法识别下次的对齐处理。
     */
    ixAutoTarget: false,

    /**
     * 设置对齐组件引用。
     * 如果未指定引用则自动对齐当前视图的组件。
     */
    applyIxTargetRef: function (targetRef) {
        if (Ext.isEmpty(targetRef)) {
            this.ixAutoTarget = true;
        }
        return targetRef;
    },

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    /**
     * 是否可用的处理方法。
     * function (mode, data)
     */
    ixIsEnabled: iExt.unimplFn,

    /**
     * 获取需要处理的数据。
     * 需要根据对齐的组件标识获取相应的数据。
     * @return {Object[]} 对齐组件选择的数据。
     */
    ixGetAlignData: iExt.unimplFn,

    applyIxEnabledWhen: function (fn) {
        if (Ext.isString(fn)) {
            var me = this;
            var exp = fn;
            fn = function (records) {
                return me._ixEvalEnabledWhen(exp, records);
            };
        }
        return fn;
    },

    privates: {

        /**
         * 字符串表达式验证方法。
         * @param {String} expression
         * @param {Ext.data.Model[]} records 需要验证的数据集合。
         */
        _ixEvalEnabledWhen: function (expression, records) {
            var exp = iExt.Format.ixFormat(expression, records);
            if (exp === expression) {
                return true;
            }
            return eval(exp);
        }

    }

});