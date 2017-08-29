/**
 * @class Ext.overrides.grid.column.Column
 * @override {Ext.grid.column.Column} 
 * @classdesc 设置列标题居中，缺省不允许排序。
 */
Ext.define('Ext.overrides.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    sortable: false,
    align: 'left',
    textAlign: 'left',
    tooltipType: 'title',

    initComponent: function () {
        var me = this, align = me.align;
        me.callParent(arguments);

        if (align !== 'center' && !me.config.isCheckerHd) {
            me.removeCls(Ext.baseCSSPrefix + 'column-header-align-' + align);
            me.addCls(Ext.baseCSSPrefix + 'column-header-align-center');
        }
    },

    beforeRender: function () {
        var me = this, rootHeaderCt = me.getRootHeaderCt();
        if (rootHeaderCt && rootHeaderCt.grid) {
            me.callParent();
        } else {
            me.callSuper();
        }
    }

});