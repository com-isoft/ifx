Ext.define("Ext.locale.izh_CN.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",

    valueNotFoundText: undefined
}, function () {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "加载中..."
    });
});