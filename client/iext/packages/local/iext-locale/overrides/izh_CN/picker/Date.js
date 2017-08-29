Ext.define("Ext.locale.izh_CN.picker.Date", {
    override: "Ext.picker.Date",

    todayText: "今天",
    minText: "日期必须大于最小允许日期",
    maxText: "日期必须小于最大允许日期",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: '下个月 (Ctrl+Right)',
    prevText: '上个月 (Ctrl+Left)',
    monthYearText: '选择一个月 (Control+Up/Down 来改变年份)',
    todayTip: "{0} (空格键选择)",
    format: "y年m月d日",
    ariaTitle: '{0}',
    ariaTitleDateFormat: 'Y\u5e74m\u6708d\u65e5',
    longDayFormat: 'Y\u5e74m\u6708d\u65e5',
    monthYearFormat: 'Y\u5e74m\u6708',
    getDayInitial: function (value) {
        return value.substr(value.length - 1);
    }
});
