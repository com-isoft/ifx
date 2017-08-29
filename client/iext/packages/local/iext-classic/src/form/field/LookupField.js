/**
 * @class iExt.form.field.LookupField
 * @extends {Ext.form.field.Text}
 * @classdesc iExt 参照文本框。
 */
Ext.define('iExt.form.field.LookupField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixlookupfield',

    cls: 'ix-lookup-field',

    mixins: [
        'iExt.mixin.Linkable'
    ],

    config: {
        /**
         * 参照视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal',
        /**
         * 
         */
        ixQuickView: null
    },

    initComponent: function () {
        var me = this;
        if (me.readOnly !== true) {
            var triggers = {
                lookup: {
                    cls: 'x-fa fa-ellipsis-h',
                    tooltip: '选择数据...',
                    handler: me.ixOnLookup.bind(me)
                },
                extlink: {
                    cls: 'x-fa fa-external-link',
                    tooltip: '查看数据...'
                }
            };
            me.setTriggers(triggers);
        }
        me.callParent(arguments);
    },

    /**
     * 点击参照事件处理，显示参照窗口。
     * 目前打开的ixwin窗体进行了缓存，以便保留上次的状态
     * 通过为打开视图的组件设置了 _$ixViewId 缓存视图标识
     * 但是带来的问题是缓存的视图谁来销毁？
     * 所以打开缓存视图的组件在销毁时需要检测 _$ixViewId 属性
     * 如果指定的组件存在需要手动销毁。
     */
    ixOnLookup: function (field, trigger, e) {
        var me = this,
            view = me.getIxView(),
            multi = me.getIxMulti(),
            scale = me.getIxScale();
        if (view) {
            view = iExt.View.ixGetView(view, {
                ixMulti: multi,
                header: false
            });
            var target = iExt.action.ViewTarget.IXWIN;
            me.fireEvent('ixopenview', me, view, {
                target: target,
                formType: 'lookup',
                scale: scale,
                fn: me._ixOnSelection
            });
        }
        e.stopPropagation();
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        if (this._$ixViewId) {
            var cmp = Ext.getCmp(this._$ixViewId);
            if (cmp) {
                cmp.destroy();
            }
        }
        Ext.destroyMembers(this, '__ixCurrentView');
        this.callParent();
    },

    privates: {

        /**
         * 数据选择事件处理，根据选择数据设置值。
         */
        _ixOnSelection: function (item, records) {
            var me = this;
            me.ixSetLinkValues(records, false);
        }
    }
});