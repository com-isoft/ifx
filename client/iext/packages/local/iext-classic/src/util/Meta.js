/**
 * @class iExt.util.Meta
 * @classdesc 元数据帮助类。
 */
Ext.define('iExt.util.Meta', {
    singleton: true,

    /**
     * 根据元数据字段信息获取列对象
     */
    ixGetColumn: function (metaField) {
        var me = this,
            dataType = metaField.getIxDataType(),
            subType = metaField.getIxSubType();
        var sortable = true;

        if (dataType === iExt.meta.Types.STRING &&
            subType !== iExt.meta.ixtype.String.STRING) {
            // 对于大文本型的属性不能排序
            sortable = false;
        }

        var col = {
            xtype: me._ixGetColXType(dataType),
            text: metaField.ixTitle,
            dataIndex: metaField.ixName,
            sortable: sortable,
            ixSubType: subType
        };
        return col;
    },

    privates: {

        /**
         * 根据数据类型获取col的xtype值。
         * @param {enums} 数据类型。
         * @return {String} xtype类型。
         */
        _ixGetColXType: function (dataType) {
            var xtype = 'ixcol';
            switch (dataType) {
                case iExt.meta.Types.BOOLEAN:
                    xtype = 'ixboolcol';
                    break;
                case iExt.meta.Types.DATE:
                    xtype = 'ixdatecol';
                    break;
                case iExt.meta.Types.INTEGER:
                case iExt.meta.Types.NUMBER:
                    xtype = 'ixnumcol';
                    break;
            }
            return xtype;
        }
    }

});