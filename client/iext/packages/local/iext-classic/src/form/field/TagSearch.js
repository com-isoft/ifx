/**
 * @class iExt.form.field.TagSearch
 * @extends {iExt.form.field.TagBase} 
 * @classdesc iExt 下拉筛选视图控件。
 */
Ext.define('iExt.form.field.TagSearch', {
    extend: 'iExt.form.field.TagBase',
    alias: 'widget.ixtagsearch',

    cls: 'ix-tag-search',

    mixins: [
        'iExt.mixin.FilterView',
        'iExt.mixin.Action'
    ],

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        /**
         * 参见 TagBase
         */
        scales: {
            small: {
                width: 240,
                maxHeight: 320
            },
            normal: {
                width: 560,
                maxHeight: 420
            },
            medium: {
                width: 640,
                maxHeight: 480
            },
            large: {
                width: 720,
                maxHeight: 520
            }
        }
    },

    config: {
        /**
         * 筛选条件视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal'
    },

    grow: false,
    triggerCls: 'x-fa fa-search-plus',
    // autoselect=true，会自动检索下拉列表的数据
    emptyText: '搜索 ···',
    pickerAlign: 'tr-br',

    /* 可配置的标签样式
    tagItemCls: 'ix-tagsearch-item',
    tagItemTextCls: 'ix-tagsearch-item-text',
    tagItemCloseCls: 'ix-tagsearch-item-close',

    tagItemSelector: '.ix-tagsearch-item',
    tagItemCloseSelector: '.ix-tagsearch-item-close',
    tagSelectedCls: 'ix-tagsearch-item-selected',
    */

    /**
     * TODO：可以收藏常用的搜索条件。
     */
    triggers: {
        favorite: {
            cls: 'x-fa fa-star',
            tooltip: '收藏',
            handler: function () {
                this.ixFavorite();
            }
        }
    },

    /**
     * 重载创建下拉框，使用搜索视图容器组件。
     * 由于不能直接处理筛选条件的事件
     * 所以必须使用搜索视图容器组件包装一下。
     */
    createPicker: function () {
        var me = this,
            picker, pickerCfg ,
            view = me.getIxView(),
            scale = me.getIxScale();

        view =   {
            xtype: 'ixsearchcontainer',
            userCls: 'ix-tag-search-picker',
            ixView: view,
            listeners: {
                ixclose: {
                    fn: me._ixOnClose,
                    scope: me
                }
            }
        };

        pickerCfg  = me.ixGetPickerConfig(view, 'search', scale);
        picker  =  me.picker  =  Ext.widget(pickerCfg);

        return picker;
    },

    initComponent: function () {
        var me = this;
        me.setIxAlign({
            type: 'list',
            ixMode: null
        });

        var trigger = me.getTrigger('picker');
        if (trigger) {
            trigger.setTooltip('筛选');
        }
        me.valueField = 'value';
        me.displayField = 'text';
        me.callParent(arguments);
    },

    /**
     * 重载关闭Tag时触发的处理过程，删除Store中的记录。
     * 增加了不可删除条件的处理，用于必须具备的条件的情况。
     * @memberOf iExt.form.field.TagSearch#
     * @param {Element} itemEl 关闭的标签对象。
     */
    removeByListItemNode: function (itemEl) {
        var me = this,
            removable = true,
            rec = me.getRecordByListItemNode(itemEl);

        if (rec) {
            if (me.picker) {
                removable = me.picker.ixRemoveFilter(rec.get('value'));
            }
            if (removable === false) {
                me.setValue(me.store.getRange());
                return;
            }
        }
        me.callParent(arguments);
        var filters = [];
        Ext.each(me.store.getRange(0), function (record) {
            filters.push(record.get('value'));
        });
        me.fireEvent('ixsearch', me, filters);
    },

    /**
     * 重载 MultiSelectItemTpl，对于不能删除的条件去掉删除按钮
     * 原始的 tpl: "<tpl for=".">
     * <li data-selectionIndex="{[xindex - 1]}" data-recordId="{internalId}" 
     * role="presentation" class="x-tagfield-item
     * <tpl if="this.isSelected(values)"> x-tagfield-item-selected</tpl>
     * {%values = values.data;%}">
     * <div role="presentation" class="x-tagfield-item-text">
     * {[this.getItemLabel(values)]}</div>
     * <div role="presentation" class="x-tagfield-item-close">
     * </div></li></tpl>"
     */
    getMultiSelectItemMarkup: function () {
        var me = this;
        if (!me.ixMultiSelectItemTpl) {
            me.callParent();
            me.ixMultiSelectItemTpl = me.multiSelectItemTpl;

            var html = me.ixMultiSelectItemTpl.html;

            // 调整不能关闭的 tagfield-item 右边距
            var injectAt = 'x-tagfield-item-selected</tpl>';
            var injectTpl = injectAt + '<tpl if="!values.data.removable"> ix-tagfield-noclose</tpl>';
            var tpls = html.split(injectAt);
            html = tpls.join(injectTpl);

            // 对于不能关闭的 tagfield-item 去掉关闭按钮
            injectAt = '<div role="presentation" class="x-tagfield-item-close"></div>';
            injectTpl = '<tpl if="values.removable">' + injectAt + '</tpl>';
            tpls = html.split(injectAt);
            html = tpls.join(injectTpl);

            me.ixMultiSelectItemTpl.set(html, true);
        }
        if (!me.ixMultiSelectItemTpl.isTemplate) {
            me.ixMultiSelectItemTpl = me.lookupTpl('ixMultiSelectItemTpl');
        }
        return me.ixMultiSelectItemTpl.apply(me.valueCollection.getRange());
    },

    /**
     * TODO：收藏搜索条件
     * 需要使用 Meta 的元数据管理功能。
     */
    ixFavorite: function () {
        iExt.Msg.ixInfo('可以收藏此搜索条件！');
    },

    privates: {

        /**
         * 参照视图关闭事件处理
         * 可以通过判断 filters 来识别是否指定了新的搜索条件
         * 如果为 null，表示用户点击了取消按钮。
         */
        _ixOnClose: function (item, filters) {
            var me = this;
            if (filters) {
                records = iExt.Filters.ixGetFilterRecords(filters);
                me.store.removeAll(true);
                me.store.add(records);
                me.setValue(me.store.getRange());
                me.fireEvent('ixsearch', me, filters);
            }
            me.collapse();
        }
    }

});