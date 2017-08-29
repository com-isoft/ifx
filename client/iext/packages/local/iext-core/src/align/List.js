/**
 * @class iExt.align.List
 * @extends {iExt.align.Base} 
 * @classdesc 用户操作动作组件列表对齐类。
 */
Ext.define('iExt.align.List', {
    extend: 'iExt.align.Base',
    alias: 'ixalign.list',

    /**
     * 是否可用的方法，根据选择的数据验证。
     * @param {Boolean} isMulti 是否多条数据。
     * 事实上该参数并没有实际的使用意义，只是为了统一list和form的接口。
     * @param {Ext.data.Model[]} records 数据。
     */
    ixIsEnabled: function (isMulti, records) {
        var me = this,
            enabled = true,
            mode = me.getIxMode();

        // 如果未指定对齐方式直接返回true
        if (mode === null) {
            return true;
        }

        if (arguments.length === 0) {
            return false;
        }

        // 如果未选择数据返回false
        if (!Ext.isArray(records) || records.length === 0) {
            return false;
        }

        // 如果单选，但是选择了多条数据返回false
        if (mode === false && records.length > 1) {
            return false;
        }

        // 如果设置了对齐函数，返回函数的处理结果
        var fn = me.getIxEnabledWhen();
        if (fn) {
            for (var i = 0; i < records.length; i++) {
                enabled = fn(records[i]);
                if (!enabled) {
                    break;
                }
            }
        }
        return enabled;
    },

    /**
     * 获取需要处理的数据。
     * 需要根据对齐的组件标识获取相应的数据。
     * @return {Object[]} 选择的数据。
     */
    ixGetAlignData: function () {
        var me = this,
            // 在align内部无法获取引用的组件。
            // 控制器需要在初始化时，根据引用设置id。
            id = me._$ixTargetId;
        // <debug>
        if (!id) {
            iExt.log('列表对齐操作', '对齐的组件标识_$ixTargetId未设置！');
            return null;
        }
        // </debug>
        var mode = me.getIxMode(),
            view = Ext.getCmp(id);
        if (view.ixIsListView === true && mode !== null) {
            var records = view.ixGetSelectedData();
            if (!records || records.length === 0) {
                Ext.raise('请选择要处理的数据！');
                return null;
            }
            return records;
        }
        return null;
    }

});