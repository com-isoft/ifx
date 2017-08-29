/**
 * @class iExt.app.view.controller.Form
 * @extends {iExt.app.view.controller.Base} 
 * @classdesc iExt 表单视图控制器类。
 */
Ext.define('iExt.app.view.controller.Form', {
    extend: 'iExt.app.view.controller.Base',
    alias: 'controller.ixform',

    listen: {
        component: {
            '*': {
                /**
                 * 合法性验证事件。
                 */
                ixvaliditychange: 'ixOnValidityChange'
            }
        }
    },

    /**
     * 视图初始化后处理。
     * @memberOf iExt.app.controller.Form#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnViewInited: function (view, auths) {
        // <debug>
        iExt.log('表单控制器完成视图初始化', view.$className, view.getId());
        // </debug>

        var me = this,
            refs = view.getReferences();

        // 处理引用的组件
        for (var ref in refs) {
            if (refs.hasOwnProperty(ref)) {
                if (ref.ixIsFormView === true) {
                    if (ref.hasListeners.ixvaliditychange) {
                        // 如果存在事件监听，在事件处理前插入处理
                        ref.onBefore('ixvaliditychange', me.ixOnValidityChange, me);
                    } else {
                        // 添加选择事件处理
                        ref.addListener('ixvaliditychange', me.ixOnValidityChange, me);
                    }
                    var valid = ref.ixIsValid();
                    me.ixOnValidityChange(ref, valid);
                }
            }
        }

        // 处理当前视图
        if (view.ixIsFormView === true) {
            if (view.hasListeners.ixselection) {
                // 如果存在事件监听，在事件处理前插入处理
                view.onBefore('ixvaliditychange', me.ixOnValidityChange, me);
            } else {
                // 添加选择事件处理
                view.addListener('ixvaliditychange', me.ixOnValidityChange, me);
            }
            var valid = view.ixIsValid();
            me.ixOnValidityChange(view, valid);
        }

        // 加载数据
        me.ixLoadRecord(view);
    },

    /**
     * 设置视图数据的重载方法，可以通过此方法加载其他数据。
     * 可以在此进行权限或数据验证，不符合规则可以关闭窗口。
     * 例如：iExt.Msg.ixInfo('不能修改指定的数据！',
     *      function () {
     *          // 通过视图触发“取消”的事件
     *          view.fireEvent('ixcancel', view);
     *      }
     * );
     * @memberOf iExt.app.controller.Form#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} record 当前获取的数据。
     */
    ixOnSetViewModelData: function (view, record) {

    },

    /**
     * 加载当前要处理的记录。
     * @memberOf iExt.app.controller.Form#
     * @param {Ext.Component} view 视图对象。
     */
    ixLoadRecord: function (view) {
        var me = this,
            id = view.ixGetId(),
            record = view.ixGetRecord();
        var modelName = view.getIxModelName(),
            dataName = view.getIxViewDataName(),
            vm = me.getViewModel();

        // record 优先于 id
        if (record) {
            // 如果未设置modelName，使用record的className
            var className = record.$className;
            if (!modelName) {
                modelName = className;
                view.setIxModelName(modelName);
            }
            // 如果未设置 ViewDataName，使用record的className的后缀
            if (!dataName) {
                dataName = iExt.Model.ixGetService(record);
                view.setIxViewDataName(dataName);
            }
            me._ixSetViewModelData(view, vm, dataName, record);
        } else if (id) {
            if (!modelName) {
                Ext.raise('未指定数据模型类型名称！');
                return;
            }
            var model = iExt.Model.ixGetModel(modelName);

            if (!dataName) {
                dataName = iExt.Model.ixGetService(model);
                view.setIxViewDataName(dataName);
            }

            var mask = new Ext.LoadMask({
                msg: '正在获取数据，请稍后...',
                target: view
            });

            mask.show();
            model.load(id, {
                callback: function (record, operation, success) {
                    mask.destroy();
                    if (success) {
                        me._ixSetViewModelData(view, vm, dataName, record);
                    } else {
                        iExt.Msg.ixInfo('未找到指定的数据！',
                            function () {
                                // 通过视图触发“取消”的事件
                                view.fireEvent('ixcancel', view);
                            }
                        );
                    }
                }
            });
        } else {
            /*
            if (!dataName) {
                Ext.raise('未指定视图数据属性名称！');
                return;
            }
            */
            vm.set('user', {});
        }

    },

    /**
     * 选择数据事件处理
     * @param {Ext.Component} form 表单组件。
     * @param {Boolean} valid 是否合法。
     */
    ixOnValidityChange: function (form, valid) {
        var ids = form._$ixAlignTargetIds || [];
        Ext.each(ids, function (id, index) {
            var cmp = Ext.getCmp(id);
            if (cmp && cmp.ixIsAction === true) {
                var align = cmp.getIxAlign();
                if (align) {
                    var data = form.ixGetFormData();
                    var b = align.ixIsEnabled(valid, [data]);
                    cmp.setDisabled(!b);
                }
            }
        });
    },

    privates: {

        _ixSetViewModelData: function (view, viewModel, dataName, record) {
            var me = this;
            if (record) {
                vm.set(dataName, record);
                var field = view.getIxTitleField();
                if (!Ext.isEmpty(field)) {
                    var subTitle = record.get(field);
                    viewModel.set('ixvc.subTitle', subTitle);
                }
                me.ixOnSetViewModelData(view, record);
            }
        }

    }

});