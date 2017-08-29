/**
 * @class iExt.form.Avatar
 * @extends {Ext.Img} 
 * @classdesc 用户头像控件，只是提供了缺省的图片。
 */
Ext.define('iExt.form.Avatar', {
    extend: 'Ext.Img',
    alias: 'widget.ixavatar',

    requires: [
        
    ],

    imgCls: 'ix-avatar',
    alt: '头像'

});
