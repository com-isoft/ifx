/**
 * @mixin iExt.mixin.Linkable
 * @extends {Ext.Mixin} 
 * @classdesc iExt 关联其他组件 MIXIN。
 * 根据一个或多个数据记录设置多个关联组件值的功能。
 * 例如：对于参照组件需要根据选择的数据设置其他组件值。
 */
 
Ext.define('iExt.mixin.Linkable', {
    extend: 'Ext.Mixin',

    requires: [],

    mixinConfig: {
        id: 'iext-multi-display'
    },

    ixIsMultiLink: true,

    config: {
        /**
         * 是否支持多条数据。
         */
        ixMulti: false,
        /**
         * 值属性名称。
         */
        ixValueField: '',
        /**
         * 关联设置集合。
         * 目前是为了参照组件设置的关联显示属性设置，
         * 未来考虑设置参照组件的关联条件等，
         * 需要在对象定义中扩展linkMode的配置。
         * {Object[]}: [{dataIndex:'', ref:''},{...}]
         */
        ixLinkItems: []
    },

    /**
     * 缺省分隔符。
     */
    ixDelimiter: ',',

    /**
     * 清除关联组件。
     * @memberOf iExt.mixin.MultiLink#
     */
    ixClearLinkValues: function () {
        var me = this;
        me.setValue(null);
        // 设置显示属性值
        var refHoder = me.lookupReferenceHolder(true);
        //<debug>
        if (!refHoder) {
            Ext.raise('未找到 ReferenceHolder ！');
            return;
        }
        //</debug>
        var refs = refHoder.getReferences();
        var items = me.getIxLinkItems() || [];
        Ext.each(items, function (item) {
            //<debug>
            if (!item.ref) {
                Ext.raise('未指定显示属性的 ref ！');
                return;
            }
            //</debug>
            var ref = refs[item.ref];
            //<debug>
            if (!ref) {
                Ext.raise('未找到引用的控件 [' + item.ref + '] ！');
                return;
            }
            //</debug>
            ref.setValue(null);
        });
    },

    /**
     * 设置关联组件。
     * @param {Ext.data.Model[]} records 选择的数据记录
     * @param {Boolean} ignoreMe 忽略自身组件的值
     */
    ixSetLinkValues: function (records, ignoreMe) {
        if (!records || !Ext.isArray(records)) {
            return;
        }
        if (records.length === 0) {
            return;
        }
        var me = this,
            multi = me.getIxMulti(),
            items = me.getIxLinkItems() || [];

        if (items.length > 0) {
            var refHoder = me.lookupReferenceHolder(true);
            //<debug>
            if (!refHoder) {
                Ext.raise('未找到 ReferenceHolder ！');
                return;
            }
            //</debug>
            var refs = refHoder.getReferences();

            if (multi === true) {
                me._ixSetLinkValues(records, items, refs, me.ixDelimiter);
            } else {
                me._ixSetLinkValue(records[0], items, refs);
            }
        }
        
        // 对于有些组件不能设置自身的值，例如下拉组件 combox 等。
        if (ignoreMe === undefined) {
            ignoreMe = true;
        }
        var valueField = me.getIxValueField(),
            val = '';
        if (!ignoreMe && !Ext.isEmpty(valueField)) {
            if (multi === true) {
                Ext.each(records, function (record) {
                    val += record.get(valueField) + me.ixDelimiter;
                });
                val = val.substr(0, val.length - me.ixDelimiter.length);
            } else {
                val = records[0].get(valueField);
            }
            me.setValue(val);
        }
    },

    privates: {

        /**
         * 设置显示属性组件值。
         * @param {Model} record 选择的数据。
         * @param {Object[]} linkItems 关联组件集合。
         * 示例：[{dataIndex:'', ref:''},{...}]
         * @param {Object} refs 组件引用对象。
         */
        _ixSetLinkValue: function (record, linkItems, refs) {
            var val = '',
                links = {};

            Ext.each(linkItems, function (item) {
                //<debug>
                if (!item.dataIndex) {
                    Ext.raise('未指定显示属性的 dataIndex ！');
                }
                if (!item.ref) {
                    Ext.raise('未指定显示属性的 ref ！');
                }
                //</debug>
                var ref = refs[item.ref];
                //<debug>
                if (!ref) {
                    Ext.raise('未找到引用的控件 [' + item.ref + '] ！');
                }
                //</debug>
                val = record.get(item.dataIndex) || '';
                ref.setValue(val);
            });
            
        },

        /**
         * 设置显示属性组件值。
         * @param {Model[]} records 选择的数据。
         * @param {Object[]} linkItems 关联组件集合。
         * 示例：[{dataIndex:'', ref:''},{...}]
         * @param {Object} refs 组件引用对象。
         * @param {String} delimiter 分隔符。
         */
        _ixSetLinkValues: function (records, linkItems, refs, delimiter) {
            if (!records || !Ext.isArray(records)) {
                return;
            }
            var val = '',
                links = {};

            Ext.each(records, function (record) {
                Ext.each(linkItems, function (item) {
                    //<debug>
                    if (!item.dataIndex) {
                        Ext.raise('未指定显示属性的 dataIndex ！');
                        return;
                    }
                    if (!item.ref) {
                        Ext.raise('未指定显示属性的 ref ！');
                        return;
                    }
                    //</debug>
                    val = record.get(item.dataIndex) || '';
                    links[item.ref] = links[item.ref] || '';
                    links[item.ref] += val + delimiter;
                });
            });

            Ext.Object.each(links, function (key, value, myself) {
                var ref = refs[key];
                //<debug>
                if (!ref) {
                    Ext.raise('未找到引用的控件 [' + key + '] ！');
                    return;
                }
                //</debug>
                value = value.substr(0, value.length - delimiter.length);
                ref.setValue(value);
            });
        }

    }

});
