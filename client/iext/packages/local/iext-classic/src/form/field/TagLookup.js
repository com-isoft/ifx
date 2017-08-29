/**
 * @class iExt.form.field.TagLookup
 * @extends {iExt.form.field.TagBase}
 * @classdesc iExt 下拉列表复选参照组件。
 */
Ext.define('iExt.form.field.TagLookup', {
    extend: 'iExt.form.field.TagBase',
    alias: 'widget.ixtaglookup',

    cls: 'ix-tag-lookup',

    mixins: [
        'iExt.mixin.Linkable'
    ],

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        scales: {
            normal: {
                width: 600,
                maxHeight: 300
            }
        }
    },

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
         * 缺省搜索条件
         */
        ixFilters: undefined
    },

    /**
     * 缺省使用仓储标识做为值
     */
    valueField: 'id',
    /**
     * 缺省使用名称做为显示值
     */
    displayField: 'name',

    /**
     * 重载创建下拉框，使用参照视图组件。
     * 由于可以直接监听参照组件的数据选择事件，
     * 所以不需要外套参照视图容器。
     */
    createPicker: function () {
        var me = this,
            picker, pickerCfg ,
            view = me.getIxView(),
            scale = me.getIxScale();

        if (Ext.isString(view)) {
            view =   {
                xtype: view,
                ixMulti: false,
                listeners: {
                    ixselection: {
                        fn: me._ixOnSelection,
                        scope: me
                    }
                }
            };
        } else {
            view = Ext.apply(view, {
                ixMulti: false
            });
        }

        pickerCfg  = me.ixGetPickerConfig(view, 'lookup', scale);
        picker  =  me.picker  =  Ext.widget(pickerCfg);

        return picker;
    },

    initComponent: function () {
        var me = this;
        me.setIxMulti(true);
        me.callParent();
    },

    /**
     * 重载该方法。根据变更的数据设置参照的关联数据。
     */
    onValueCollectionEndUpdate: function ()  {
        var  me  =  this,
            pickedRecords  =  me.valueCollection.items;
        if  (me.isSelectionUpdating())  {
            return;
        } 
        me.callParent();
        me.ixSetLinkValues(pickedRecords , true);
    },

    privates: {

        /**
         * 数据选择事件处理，根据选择的数据设置参照值。
         */
        _ixOnSelection: function (sm, records) {
            var me = this;
            if (records && Ext.isArray(records)) {
                Ext.each(records, function (record) {
                    me.ixAddTag(record);
                });
            }
        }
    }

});