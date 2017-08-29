/**
 * @class iExt.tree.Column
 * @override {Ext.tree.Column} 
 * @classdesc 树型咧。
 */
Ext.define('iExt.tree.Column', {
    extend: 'Ext.tree.Column',
    alias: 'widget.ixtreecol',

    /**
     * 重载对齐方式
     * 原对齐'start'，目前存在问题
     */
    align: 'left',
    textAlign: 'left',
    sortable: false,
    tooltipType: 'title'

});