Ext.define("Ext.locale.izh_CN.data.validator.Length", {
    override: "Ext.data.validator.Length",

    config: {
        minOnlyMessage: '该输入项的最小长度是 {0} 个字符',
        maxOnlyMessage: '该输入项的最大长度是 {0} 个字符',
        bothMessage: '该输入项的长度必须在 {0} 和 {1} 之间'
    }
});