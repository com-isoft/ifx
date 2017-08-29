Ext.define("Ext.locale.izh_CN.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",

    createLinkText: '添加超级链接:'
}, function () {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: '粗体 (Ctrl+B)',
                text: '将选中的文字设置为粗体',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: '斜体 (Ctrl+I)',
                text: '将选中的文字设置为斜体',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: '下划线 (Ctrl+U)',
                text: '给所选文字加下划线',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: '增大字体',
                text: '增大字号',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: '缩小字体',
                text: '减小字号',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: '以不同颜色突出显示文本',
                text: '使文字看上去像是用荧光笔做了标记一样',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: '字体颜色',
                text: '更改字体颜色',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: '左对齐',
                text: '将文字左对齐',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: '居中',
                text: '将文字居中对齐',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: '右对齐',
                text: '将文字右对齐',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: '项目符号',
                text: '开始创建项目符号列表',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: '编号',
                text: '开始创建编号列表',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: '转成超级链接',
                text: '将所选文本转换成超级链接',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: '代码视图',
                text: '以代码的形式展现文本',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});