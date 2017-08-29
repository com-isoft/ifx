/**
 * @mixin iExt.mixin.FormView
 * @extends {iExt.mixin.View} 
 * @classdesc iExt 表单视图 MIXIN。
 */
Ext.define('iExt.mixin.FormView', {
    extend: 'iExt.mixin.View',

    mixinConfig: {
        id: 'iext-view-form',
        on: {
            afterRender: '_ixOnAfterRender'
        }
    },

    ixIsFormView: true,

    config: {
        /**
         * 表单类型。
         * {iExt.app.view.FormTypes}
         */
        ixFormType: 'detail',
        /**
         * 表单规格。
         * {iExt.app.view.Scales}
         */
        ixScale: 'normal',
        /**
         * 标题字段名称。
         * {iExt.app.view.Scales}
         */
        ixTitleField: ''
    },

    /**
     * 根据字符串解析枚举值。
     */
    applyIxFormType: function (formType) {
        if (Ext.isString(formType)) {
            formType = iExt.app.view.FormTypes.ixGetValue(
                formType.toUpperCase());
        }
        return formType;
    },

    /**
     * 根据字符串解析枚举值。
     */
    applyIxScale: function (scale) {
        if (Ext.isString(scale)) {
            scale = iExt.app.view.Scales.ixGetValue(
                scale.toUpperCase());
        }
        return scale;
    },

    /**
     * 合法性变更事件。
     * @memberOf iExt.mixin.FormView#
     * @event ixvaliditychange
     * @param {iExt.mixin.FormView} this iExt.mixin.FormView 控件。
     * @param {iExt.mixin.FormView} this iExt.mixin.FormView 控件。
     */

    /**
     * 取消事件。
     * 关闭当前视图，可能是为获取到数据或者未经授权。
     * @memberOf iExt.mixin.FormView#
     * @event ixcancel
     * @param {iExt.mixin.FormView} this iExt.mixin.FormView 控件。
     */

    /**
     * 获取表单数据。
     */
    ixGetFormData: iExt.unimplFn,

    /**
     * 获取是否合法信息。
     */
    ixIsValid: iExt.unimplFn,

    /**
     * 获取是否存在“脏数据”。
     */
    ixIsDirty: iExt.unimplFn,

    /**
     * 刷新数据。
     */
    ixRefresh: function (close) {
        // 数据经过处理并且成功后触发该事件
        // 可以通过此事件处理视图设置
        if (this.hasListeners.ixformchanged) {
            this.fireEvent('ixformchanged', this, close);
        }
    },

    /**
     * 添加Form事件进行处理。
     * 可以重载该方法设置自定义的事件监听。
     */
    ixAddListeners: function () {
        var me = this;
        me.on('validitychange', me._ixOnValidityChange, me);
    },

    privates: {

        /**
         * 触发数据验证事件。
         */
        _ixOnValidityChange: function (form, valid) {
            if (this.hasListeners.ixvaliditychange) {
                this.fireEvent('ixvaliditychange', this, valid);
            }
        },

        _ixOnAfterRender: function () {
            var me = this;
            var valid = me.ixIsValid();
            me.ixAddListeners();
            me._ixOnValidityChange(me, valid);
        }

    }

});