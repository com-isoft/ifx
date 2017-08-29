/**
 * @class iExt.form.Quick
 * @extends {Ext.form.Panel} 
 * @classdesc 快速查看表单。
 */
Ext.define('iExt.form.Quick', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixqvform',

    cls: 'ix-quick-form',
    bodyCls: 'ix-quick-form-body',

    mixins: [
        'iExt.mixin.View'
    ],

    viewModel: true,
    header: false,
    scrollable: 'y',
    defaultType: 'ixdisplay',
    bodyPadding: '10 5 5 5',

    fieldDefaults: {
        labelAlign: 'top'
    },

    config: {
        /**
         * 实体模型类名称
         */
        ixModelName: null,

        /**
         * 仓储标识
         */
        ixId: null,

        /**
         * 实体数据记录
         * 如果提供数据，则以数据展示
         * 否则根据 ixModelName 和 ixId 加载数据
         */
        ixRecord: null
    },

    /**
     * 空文本替代字符：&#160; or &nbsp;
     */
    ixEmptyText: '&#160;',

    initComponent: function () {
        var me = this,
            modelName,
            record = me.getIxRecord();

        if (record) {
            modelName = record.$className;
        } else {
            modelName = me.getIxModelName();
        }

        me._ixMeta = iExt.meta.Manager.ixGetMeta(modelName);

        // 缺省使用 model 的名称
        var names = modelName.split('.');
        var title = names[names.length - 1];

        // 如果存在元数据，使用元数据的名称
        if (me._ixMeta) {
            title = me._ixMeta.ixName || title;
        }
        me.title = title;

        me.callParent();
    },

    afterRender: function () {
        var me = this,
            record = me.getIxRecord();

        if (record) {
            me._ixSetView(record);
        } else {
            var modelName = me.getIxModelName(),
                id = me.getIxId();

            if (modelName && id) {
                var model = Ext.create(modelName);
                var mask = new Ext.LoadMask({
                    msg: '加载中...',
                    target: me
                });
                mask.show();
                model.self.load(id, {
                    callback: function (record, operation, success) {
                        if (success) {
                            me._ixSetView(record);
                        }
                        mask.destroy();
                    }
                });
            }
        }
        me.callParent();
    },

    destroy: function () {
        this._ixMeta = null;
        this.callParent();
    },

    privates: {

        /**
         * 元数据实例
         */
        _ixMeta: null,

        /**
         * 设置视图内容
         */
        _ixSetView: function (record) {
            var me = this,
                label, value, meaningful,
                data = record.data;

            Ext.suspendLayouts();

            if (!me._ixMeta) {
                for (var p in data) {
                    if (data.hasOwnProperty(p)) {
                        value = data[p] || me.ixEmptyText;
                        value = value === '' ? me.ixEmptyText : value;

                        me.add({
                            ixQuick: true,
                            fieldLabel: p,
                            value: value
                        });
                    }
                }
            } else {
                Ext.each(me._ixMeta.ixFields, function (field) {
                    meaningful = field.ixMeaningful;
                    // 忽略无意义的数据
                    if (meaningful === false) {
                        return;
                    }
                    label = field.ixLabel || field.ixTitle;
                    value = data[field.ixName];
                    if (value) {
                        value = field.ixFormat(value);
                    } else {
                        value = me.ixEmptyText;
                    }
                    value = value === '' ? me.ixEmptyText : value;

                    me.add({
                        ixQuick: true,
                        fieldLabel: label,
                        value: value
                    });
                });
            }

            Ext.resumeLayouts(true);
        }

    }

});