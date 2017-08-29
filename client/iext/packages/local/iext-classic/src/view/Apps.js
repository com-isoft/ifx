/**
 * @class iExt.view.Apps
 * @extends {Ext.view.View} 
 * @classdesc 应用程序列表。
 */
Ext.define('iExt.view.Apps', {
    extend: 'Ext.view.View',
    alias: 'widget.ixappsview',

    cls: 'ix-apps-view',
    width: 750,
    trackOver: true,
    itemSelector: 'div.ix-apps-item',
    overItemCls: 'ix-apps-item-over',
    selectedItemCls: 'ix-apps-item-selected',

    tpl: [
        '<tpl for=".">',
        '<div class="ix-apps-item">',
        '<img class="ix-apps-thumb" src="{thumb}" />',
        '<h3>{name}</h3>',
        '</div>',
        '</tpl>'
    ]

});