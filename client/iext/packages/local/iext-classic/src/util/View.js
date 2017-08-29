/**
 * @class iExt.util.View
 * @classdesc 视图帮助类。
 * 组件/视图通用方法帮助类。
 */
Ext.define('iExt.util.View', {
    singleton: true,

    /**
     * 根据自定义模板、列集合、线型获取列表配置
     * @param {String[]} tpl 模板。
     * @param {Object[]} cols 列集合。
     * 示例：[{dataIndex:'', width:100},{...}]
     * @param {String} lines 边框线显示方式。
     * 可用值：'all/col/row/none'
     * @return {Object} 下拉列表模板配置信息
     */
    ixGetItemTplConfig: function (tpl, cols, lines) {
        var listConfig = {};
        if (tpl) {
            listConfig.itemTpl = tpl;
        } else {
            if (cols) {
                listConfig.cls = 'ix-picker';
                if (lines === 'row' || lines === 'all') {
                    listConfig.cls += ' ix-rows';
                } else if (lines === 'col') {
                    listConfig.cls += ' ix-cols';
                }
                var i = 1,
                    item = '',
                    total = cols.length;
                tpl = [];
                Ext.each(cols, function (col) {
                    item = '<span class="ix-col';
                    // 后续列加左边框线
                    if (i < total && (lines === 'col' || lines === 'all')) {
                        item += ' ix-line';
                    }
                    item += '"';
                    if (col.width) {
                        item += ' style="width:' + col.width + 'px;"';
                    }
                    item += '>{' + col.dataIndex + '}</span>'
                    tpl.push(item);
                    i++;
                });
                listConfig.itemTpl = tpl;
            }
        }
        return listConfig;
    }

});