/**
 * @class iExt.model.Entity
 * @extends {iExt.data.Model} 
 * @classdesc 实体类。
 */
Ext.define('iExt.model.Entity', {
    extend: 'iExt.data.Model',

    idProperty: 'id',
    
    // 为什么使用该属性会导致版本信息不能传递至服务器端？
    // versionProperty: 'version',

    /**
     * 框架实体
     */
    ixIsModel: true,

    fields: [
        { name: 'id', persist: false },
        { name: 'version', persist: false }
    ]

});
