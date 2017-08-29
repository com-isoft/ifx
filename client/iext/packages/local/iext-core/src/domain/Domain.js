/**
 * @class iExt.domain.Domain
 * @extends {Ext.Base} 
 * @classdesc 领域类。
 * 用于定义领域的模型、元数据、领域服务、领域视图信息。
 */
Ext.define('iExt.domain.Domain', {
    alternateClassName: 'iExt.Domain',

    requires: [],

    /**
     * 领域代码，例如：user
     */
    ixCode: null,

    /**
     * 领域中文名称，例如：用户
     */
    ixName: null,

    /**
     * 聚合根数据模型类名称
     */
    ixModelName: null,

    /**
     * 聚合根元数据类名称
     */
    ixMetaName: null,

    /**
     * 是否允许导入
     */
    ixImportable: false,

    /**
     * 是否允许复制
     */
    ixDuplicatable: false,

    /**
     * 操作集合对象，例如：新建、修改、审核等
     * {add: '新建', edit: '编辑', ...}
     * 使用下划线用于区分系统定义的动作和用户定义的动作。
     */
    ixActions: {
        add: {
            type: 'view',
            ixCode: 'add',
            ixName: '新建',
            ixIconCls: 'x-fa fa-plus'
        },
        edit: {
            type: 'view',
            ixCode: 'edit',
            ixName: '修改',
            ixIconCls: 'x-fa fa-edit'
        },
        detail: {
            type: 'view',
            ixCode: 'detail',
            ixName: '详细',
            ixIconCls: 'x-fa fa-file-o'
        },
        remove: {
            type: 'api',
            ixCode: 'remove',
            ixName: '删除',
            ixApiCode: 'erase',
            ixIconCls: 'x-fa fa-trash'
        },
        search: {
            type: 'view',
            ixCode: 'search',
            ixName: '搜索',
            ixIconCls: 'x-fa fa-search'
        }
    },

    /**
     * 列表视图集合，例如：列表页、看板页、日历页、图表页、报表页等
     * [{ixLisType:'list',...},{ixListType: 'kanban', ...}]
     */
    ixListViews: [],

    privates: {

        statics: {

            /**
             * 继承基类的操作信息。
             */
            _ixInitActions: function (data, cls, proto) {
                var actionsDefs = data.ixActions;
                var superActions = proto.ixActions;
                var i, length, actionProp, action;

                var actions = {};
                if (superActions) {
                    for (actionProp in superActions) {
                        if (superActions.hasOwnProperty(actionProp)) {
                            action = Ext.clone(superActions[actionProp]);
                            if (action !== false) {
                                actions[actionProp] = action;
                            }
                        }
                    }
                }

                if (actionsDefs) {
                    delete data.ixActions;
                    for (actionProp in actionsDefs) {
                        if (actionsDefs.hasOwnProperty(actionProp)) {
                            action = Ext.clone(actionsDefs[actionProp]);
                            if (action !== false) {
                                if (actions[actionProp]) {
                                    Ext.apply(actions[actionProp], action);
                                } else {
                                    actions[actionProp] = action;
                                }
                            }
                        }
                    }
                }
                cls.ixActions = proto.ixActions = actions;
            }

        }

    }

}, function () {
    var Domain = this;
    Domain.onExtended(function (cls, data) {
        var proto = cls.prototype;
        var superCls = proto.superclass.self;
        Domain._ixInitActions(data, cls, proto);
    });
});