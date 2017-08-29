/**
 * @class iExt.meta.Manager
 * @extends {Ext.Base} 
 * @classdesc 元数据管理类。
 */
Ext.define('iExt.meta.Manager', {
    alternateClassName: 'iExt.MetaManager',
    singleton: true,

    ixMaps: [],

    /**
     * 注册元数据与模型数据的映射关系
     */
    ixRegister: function (metaName, modelName) {
        var me = this, mapped = false;
        Ext.each(me.ixMaps, function (map, index) {
            if (map.meta === metaName) {
                map.model = modelName;
                mapped = true;
                return false;
            }
        });
        if (!mapped) {
            me.ixMaps.push({
                meta: metaName,
                model: modelName
            });
        }
    },

    /**
     * 根据实体模型名称获取元数据类名称
     */
    ixGetMetaName: function (modelName) {
        var me = this, meta = null;
        Ext.each(me.ixMaps, function (map, index) {
            if (map.model === modelName) {
                meta = map.meta;
                return false;
            }
        });
        return meta;
    },

    /**
     * 根据实体模型名称获取元数据类名称
     */
    ixGetMeta: function (modelName) {
        var me = this,
            meta = me.ixGetMetaName(modelName);
            
        if (meta) {
            meta = Ext.create(meta);
        }
        return meta;
    }

});