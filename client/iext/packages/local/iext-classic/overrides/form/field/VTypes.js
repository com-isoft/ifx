/**
 * @class Ext.overrides.form.field.VTypes
 * @override {Ext.form.field.VTypes} 
 * @classdesc 扩展输入框的验证规则。
 */
Ext.define('Ext.overrides.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    // 日期区间验证
    daterange: function (val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax ||
            date.getTime() !== this.dateRangeMax.getTime())) {
            var start = field.up('form').down('#' + field.startDateField);
            if (!start) {
                Ext.raise('field.VTypes: 未找到起始控件 ' + field.startDateField + ' ！');
                return false;
            }
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin ||
            date.getTime() !== this.dateRangeMin.getTime())) {
            var end = field.up('form').down('#' + field.endDateField);
            if (!end) {
                Ext.raise('field.VTypes: 未找到截止控件 ' + field.endDateField + ' ！');
                return false;
            }
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },
    daterangeText: '起始日期必须小于等于截止日期！',

    // 口令一致性验证
    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return val === pwd.getValue();
        }
        return true;
    },
    passwordText: '确认密码不一致！',

    // 数字区间验证
    numberrange: function (val, field) {
        if (!Ext.isNumeric(val)) {
            return false;
        }

        if (field.startNumberField && (!field.numberRangeMax ||
            val !== field.numberRangeMax)) {
            var start = field.up('form').down('#' + field.startNumberField);
            if (!start) {
                Ext.raise('field.VTypes: 未找到起始控件 ' + field.startNumberField + ' ！');
                return false;
            }
            start.setMaxValue(val);
            field.numberRangeMax = val;
            start.validate();
        }
        else if (field.endNumberField && (!field.numberRangeMin ||
            val !== field.numberRangeMin)) {
            var end = field.up('form').down('#' + field.endNumberField);
            if (!end) {
                Ext.raise('field.VTypes: 未找到截止控件 ' + field.endNumberField + ' ！');
                return false;
            }
            end.setMinValue(val);
            field.numberRangeMin = val;
            end.validate();
        }
        return true;
    },
    numberrangeText: '起始数字必须小于等于截止数字！',

    // 代码验证
    code: function (v) {
        var code = /^[A-Za-z0-9_]+$/;
        return code.test(v);
    },
    codeMask: /[A-Za-z0-9_\.]/i,
    codeText: '只能使用大小写字母、数字或下划线！',

    // 大写代码验证
    uppercode: function (v) {
        var uc = /^[A-Z0-9_]+$/;
        return uc.test(v);
    },
    uppercodeMask: /[A-Z0-9_]/i,
    uppercodeText: '只能使用大写字母、数字或下划线！',

    // 小写代码验证
    lowercode: function (v) {
        var lc = /^[a-z0-9_]+$/;
        return lc.test(v);
    },
    lowercodeMask: /[a-z0-9_]/i,
    lowercodeText: '只能使用小写字母、数字或下划线！',

    // 数字代码验证，例如单独区号或单据编号，需要使用前导0的情况
    numbercode: function (v) {
        var nc = /^[0-9]+$/;
        return nc.test(v);
    },
    numbercodeMask: /[0-9]/i,
    numbercodeText: '只能使用数字！',

    // 身份证号验证
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    idcard: function (v) {
        var card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return card.test(v);
    },
    idcardMask: /[A-Z0-9_]/i,
    idcardText: '身份证号长度不对或者号码不符合规定！',

    // 手机证号验证
    mobile: function (v) {
        //电信手机号码正则。
        var dianxinReg = /^(1[3578][01379])\d{8}$/;
        //联通手机号正则。
        var liantongReg = /^(1[34578][01256])\d{8}$/;
        //移动手机号正则。
        var yidongReg = /^((134[012345678])\d{7}|(1[34578][012356789])\d{8})$/;
        // 判断指定手机号是否有效。
        if (dianxinReg.test(v) || liantongReg.test(v) || yidongReg.test(v)) {
            return true;
        } else {
            return false;
        }
    },
    mobileMask: /[0-9_]/i,
    mobileText: '手机号码不符合规范！',

    // 电话号验证
    phone: function (v) {
        /*ignore jslint start*/
        var phone = /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        /*ignore jslint end*/
        return phone.test(v);
    },
    phoneMask: /[0-9\-]/i,
    phoneText: '电话号码不符合规范，格式：\n（3-4位区号，7-8位直播号码，1－4位分机号）！'
});
