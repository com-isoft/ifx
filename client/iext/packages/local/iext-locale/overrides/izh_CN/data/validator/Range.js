Ext.define("Ext.locale.izh_CN.data.validator.Range", {
    override: "Ext.data.validator.Range",

    config: {
        minOnlyMessage: '该输入项的最小值是 {0}',
        maxOnlyMessage: '该输入项的最大值是 {0}',
        bothMessage: '该输入项必须在 {0} 和 {1} 之间',
        nanMessage: '{0} 不是有效数值'
    }
});
