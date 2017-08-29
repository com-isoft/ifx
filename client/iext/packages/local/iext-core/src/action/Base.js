/**
 * @class iExt.action.Base
 * @classdesc 用户操作动作基础类。
 * 未来考虑根据action的定义自动生成操作组件。
 */
Ext.define('iExt.action.Base', {
    alternateClassName: 'iExt.Action',
    alias: 'ixaction.auto',
    aliasPrefix: 'ixaction.',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    factoryConfig: {
        /**
         * 缺省是打开视图的操作。
         */
        defaultType: 'view'
    },

    /**
     * 用户操作动作的代码，例如：'add'。
     * 触发事件时可以根据该代码进行不同的处理。
     */
    ixCode: null,

    /**
     * 用户操作动作的名称，例如：'新建'。
     */
    ixName: null,

    /**
     * 需要的授权操作。
     * {ixService:'user', ixOperation:'add'}
     * 'add'，字符串形式下，采用所属领域的领域代码。
     */
    ixAuth: null,

    /**
     * 允许多选操作，缺省是 false 。
     */
    ixMulti: false,

    /**
     * 允许未通过合法性验证进行操作，缺省是 false。
     */
    ixValid: false,

    /**
     * 允许指定该动作的限制条件表达式。
     * '{status}===1'
     */
    ixEnableWhen: null,

    /**
     * 参数信息。
     * TODO 格式：
     */
    ixParams: null,

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    /**
     * 验证操作是否可用的方法。
     * @param {Ext.data.Model[]} records 选择的数据。
     * function (records)
     */
    ixIsEnabled: iExt.unimplFn,

    /**
     * 执行动作。
     * @param {Ext.Component} item 调用该方法的组件。
     * @param {Ext.data.Model[]} records 选择的数据。
     * @param {Object} option 操作选项。
     * function (item, records, options)
     * 
     * options
     *  ixClose:    自动关闭当前的视图
     *  ixCallback: 回调函数
     *      {fn: function(item, success), scope: me}
     */
    ixDo: iExt.unimplFn

});