/**
 * @class iExt.meta.Base
 * @extends {Ext.Base} 
 * @classdesc 元数据基础类。
 * 元数据用于描述实体模型的信息，不应该包括UI方面的内容。
 */
Ext.define('iExt.meta.Base', {
    alternateClassName: 'iExt.Meta',

    requires: [
        'iExt.meta.field.*',
        'iExt.meta.ixtype.*'
    ],

    /**
     * 实体模型类名称
     */
    ixModelName: null,

    /**
     * 实体代码，例如：user
     */
    ixCode: '',

    /**
     * 实体名称，例如：用户
     */
    ixName: '',

    /**
     * 缺省排序列集合
     */
    ixSorters: [],

    /**
     * 元数据字段集合
     */
    ixFields: [],

    /**
     * 仓储标识字段 (meta field)
     */
    ixRepoId: null,

    /**
     * 实体标识字段 (meta field)
     */
    ixEntityId: null,

    /**
     * 实体描述字段 (meta field)
     */
    ixEntityDesc: null,

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    statics: {

        /**
         * 按照属性序号排序
         */
        ixSortByNo: function (a, b) {
            // a is less than b by some ordering criterion return -1
            // a is greater than b by the ordering criterion return 1
            // a is equal to b by the ordering criterion return 0
            if (a.ixNo < b.ixNo) {
                return -1;
            } else if (a.ixNo > b.ixNo) {
                return 1;
            } else {
                return 0;
            }
        }

    },

    privates: {

        statics: {

            _ixInitFields: function (data, cls, proto) {
                var Field = iExt.meta.Field;
                var fieldDefs = data.ixFields;
                var superFields = proto.ixFields;
                var i, length, field, ixField;
                var fields = [],
                    sorters = [];

                if (superFields) {
                    // 获取父类的字段定义
                    for (i = 0, length = superFields.length; i < length; ++i) {
                        field = Ext.Object.chain(superFields[i]);
                        field.owner = cls;
                        fields.push(field);
                    }
                }
                if (fieldDefs) {
                    delete data.ixFields;
                    delete data.ixSorters;
                    // 仓储标识为1，其他从2开始
                    var ixNo = 2;
                    for (i = 0, length = fieldDefs.length; i < length; ++i) {
                        field = fieldDefs[i];
                        if (field.ixSortDir) {
                            sorters.push({
                                ixName: field.ixName,
                                ixSortDir: field.ixSortDir
                            });
                        }

                        // 处理序号，按照定义的顺序设置No
                        if (field.ixNo > 0) {
                            // 后续的从此开始排
                            ixNo = field.ixNo
                        } else {
                            field.ixNo = ixNo;
                        }
                        ixNo++;

                        ixField = Field.create(field);
                        if (field.ixIsRepoId === true) {
                            cls.ixRepoId = proto.ixRepoId = ixField;
                        }
                        if (field.ixIsEntityId === true) {
                            cls.ixEntityId = proto.ixEntityId = ixField;
                        }
                        if (field.ixIsEntityDesc === true) {
                            cls.ixEntityDesc = proto.ixEntityDesc = ixField;
                        }
                        fields.push(ixField);
                    }
                }

                // 按照序号排序所有列
                fields.sort(iExt.Meta.ixSortByNo);
                cls.ixFields = proto.ixFields = fields;
                cls.ixSorters = proto.ixSorters = sorters;
            }
        }
    }

}, function () {
    var Meta = this;
    Meta.onExtended(function (cls, data) {
        var proto = cls.prototype;
        var superCls = proto.superclass.self;

        // 注册元数据与模型映射
        if (data.ixModelName) {
            iExt.meta.Manager.ixRegister(data.$className,
                data.ixModelName);
        }

        Meta._ixInitFields(data, cls, proto);
    });
});