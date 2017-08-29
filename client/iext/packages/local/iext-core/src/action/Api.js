/**
 * @class iExt.action.Api
 * @extends {iExt.action.Base}
 * @classdesc 调用API操作动作类。
 */
Ext.define('iExt.action.Api', {
    extend: 'iExt.action.Base',
    alias: 'ixaction.api',

    /**
     * Api代码，与 Model 中定义的 ixApis 的代码对应
     */
    ixApiCode: null,

    /**
     * 是否需要确认： Boolean | String
     * Boolean(true/false)：表示是否需要确认
     * String：表示需要确认，并以相应的信息提示
     * 提示信息可以使用模板
     */
    ixConfirm: true,

    /**
     * 提示信息模板
     */
    ixTipTpl: null,

    /**
     * 操作是否可用
     */
    ixIsEnabled: function () {
        return this.ixApiCode !== null;
    },

    /**
     * 执行动作
     */
    ixDo: function (item, align, data) {
        // iExt.Msg.ixInfo(me.getIxName() + '-' + me.getIxApi());
        var action = this;
        iExt.action.Api.ixCallApi(item, action, data);
    },

    statics: {

        /**
         * 调用Model的API
         */
        ixCallApi: function (item, action, data) {
            if (!data || data.length < 1) {
                Ext.raise('请选择要处理的数据！');
                return false;
            }

            if (!data[0].isModel) {
                Ext.raise('处理的数据不是有效的Model！');
                return false;
            }

            var api = action.ixApiCode || action.ixCode;
            if (!api) {
                Ext.raise('未指定操作方法！');
                return;
            }

            var cnt = data.length,
                confirm = action.ixConfirm,
                text = action.ixName,
                close = action.ixClose;

            if (!data[0][api]) {
                Ext.raise('Model未定义【' + api + '】的方法！');
                return false;
            }

            if (confirm && !Ext.isString(confirm)) {
                if (cnt === 1 && tpl) {
                    var tip = iExt.Util.ixFormat(tpl, data[0]);
                    confirm = '是否要【' + text + '】' + tip + '？';
                } else {
                    confirm = '是否要【' + text + '】选择的数据？';
                }
            }

            var mask, i = 0,
                promises = [],
                errorInfo = {
                    count: 0,
                    messages: []
                },
                successInfo = {
                    count: 0,
                    messages: []
                };

            var __ixDoCallback = function (btn, success) {
                if (success === true && item.ixAlignView) {
                    item.ixAlignView.ixRefresh(close);
                }
            };

            var __ixShowDoResult = function () {
                if (mask) {
                    mask.destroy();
                }
                Ext.MessageBox.hide();

                if (errorInfo.count === 0) {
                    iExt.Msg.ixInfo('成功处理了 ' + successInfo.count + ' 条数据！',
                        function (btn) {
                            __ixDoCallback(btn, true);
                        }, scope);
                } else {
                    var msgs = [
                        '处理成功 ' + successInfo.count + ' 条数据;',
                        '处理失败 ' + errorInfo.count + ' 条数据;'
                    ];
                    msgs.push('----------错误原因----------');
                    msgs = msgs.concat(errorInfo.messages);
                    iExt.Msg.ixAlert(msgs, function (btn) {
                        __ixDoCallback(btn, true);
                    }, scope);
                }
            };

            var __ixDoAction = function (data, batch) {
                if (batch === true) {
                    var d = new Ext.Deferred();
                    data[api]({
                        callback: function (record, operation, success) {
                            i = i + 1;
                            Ext.MessageBox.updateProgress(
                                i / cnt, '已完成 ' + Math.round(100 * i / cnt) + ' %');
                            if (success) {
                                successInfo.count = successInfo.count + 1;
                            } else {
                                errorInfo.count = errorInfo.count + 1;
                                var response = operation.getError().response;
                                if (response && response.responseText) {
                                    var data = Ext.decode(response.responseText, true);
                                    if (tpl) {
                                        var msg = iExt.Util.ixFormat(tpl, record);
                                        if (Ext.isArray(data.details)) {
                                            data.details[0] = data.details[0] + ' ' + msg;
                                        } else {
                                            data.details = data.details + ' ' + msg;
                                        }
                                    }
                                    errorInfo.messages =
                                        errorInfo.messages.concat(data.details);
                                }
                            }
                            d.resolve(record);
                        }
                    });
                    return d.promise;
                } else {
                    data[api]({
                        callback: function (record, operation, success) {
                            if (mask) {
                                mask.destroy();
                            }
                            if (success) {
                                var msg = tpl ? iExt.Util.ixFormat(tpl, record) : '数据';
                                msg += '【' + text + '】成功！';
                                __ixDoCallback(null, true);
                                iExt.Toast.ixInfo(msg);
                            } else {
                                iExt.Msg.ixApiFailed(operation, function (btn) {
                                    __ixDoCallback(btn, false);
                                }, scope);
                            }
                        }
                    });
                }
            };

            var __ixDoActionBatch = function (data) {
                iExt.Msg.ixProgress('正在进行处理...', '处理中...');
                Ext.each(data, function (record) {
                    promises.push(__ixDoAction(record, true));
                });
                Ext.Deferred.all(promises).then(__ixShowDoResult, __ixShowDoResult).done();
            };

            var __ixToDo = function (btn) {
                if (btn === 'yes') {
                    if (item.ixAlignView) {
                        mask = new Ext.LoadMask({
                            msg: '正在进行处理, 请稍侯...',
                            target: item.ixAlignView
                        });
                        mask.show();
                    }
                    if (cnt === 1) {
                        __ixDoAction(data[0], false);
                    } else {
                        __ixDoActionBatch(data);
                    }
                }
            };

            if (confirm) {
                iExt.Msg.ixConfirm(confirm, __ixToDo);
            } else {
                __ixToDo('yes');
            }
        }

    }

});