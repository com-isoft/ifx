/**
 * @mixin iExt.mixin.Action
 * @extends {Ext.Mixin} 
 * @classdesc iExt 用户操作 MIXIN。
 * 用于设置操作组件的授权和对齐信息。
 */
Ext.define('iExt.mixin.Action', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'iext-action',
        on: {
            destroy: '_ixOnDestroy',
            afterRender: '_ixOnAfterRender'
        }
    },

    ixIsAction: true,
    ixIsAuthed: true,

    config: {
        /**
         * 需要验证的授权操作。
         * {ixService:'user', ixOperation:'add'}
         * 'add'，字符串形式下，使用所属的工具栏的 ixAuthService
         */
        ixAuth: null,

        /**
         * 该组件可用性配置。
         * {type: 'form/list'}
         */
        ixAlign: null
    },

    /**
     * 获取控件的文本信息 function ()
     * 由于menuitem不存在getText()方法,
     * 所以统一使用 ixGetText() 获取控件文本。
     */
    ixGetText: iExt.unimplFn,

    /**
     * 设置对齐信息。
     */
    applyIxAlign: function (align) {
        if (align) {
            align = Ext.clone(align);
            // 生成 align 实例
            align = iExt.Align.create(align);
        }
        return align;
    },

    privates: {

        _ixOnDestroy: function () {

        },

        _ixOnAfterRender: function () {

        }
    }

});