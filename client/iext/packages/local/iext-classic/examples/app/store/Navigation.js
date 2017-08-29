Ext.define('app.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    constructor: function (config) {
        var me = this;

        me.callParent([Ext.apply({
            root: {
                text: '全部',
                id: 'all',
                expanded: true,
                children: me.getNavItems()
            }
        }, config)]);
    },

    addIconClasses: function (items) {
        return items;
    },

    getNavItems: function () {
        return this.addIconClasses([
            {
                text: '基础配置',
                code: 'base',
                expanded: true,
                iconCls: 'x-fa fa-desktop',
                children: [
                    { code: 'system', text: '系统维护', leaf: true },
                    { code: 'program', text: '程序维护', leaf: true },
                    {
                        code: 'menu', text: '菜单维护',
                        address: 'examples.view.menu.List', openType: 1, leaf: true
                    },
                    {
                        code: 'baidu', text: '百度',
                        address: 'https://www.baidu.com',
                        target: 1,
                        type: 4,
                        leaf: true
                    },
                    {
                        code: 'sina', text: '新浪',
                        address: 'http://www.sina.com.cn',
                        target: 2,
                        type: 4,
                        leaf: true
                    },
                    {
                        code: 'sohu', text: '搜狐',
                        address: 'http://www.sohu.com',
                        target: 4,
                        type: 4,
                        leaf: true
                    }
                ]
            },
            {
                text: '用户管理',
                code: 'users',
                expanded: true,
                iconCls: 'x-fa fa-edit',
                children: [
                    {
                        code: 'role', text: '角色维护',
                        address: 'examples.view.role.List', leaf: true
                    },
                    {
                        code: 'user', text: '用户维护',
                        address: 'examples.view.user.List', target: 1, leaf: true
                    }
                ]
            },
            {
                text: '控件示例',
                code: 'components',
                expanded: true,
                iconCls: 'x-fa fa-leanpub',
                children: [
                    {
                        code: 'gridedit', text: 'GridEdit',
                        address: 'examples.view.component.grid.Edit', leaf: true
                    },
                    {
                        code: 'multicombox', text: 'MultiCombox',
                        address: 'examples.view.component.field.MultiCombox', leaf: true
                    },
                    {
                        code: 'myhome', text: '首页',
                        address: 'examples.view.home.Home', leaf: true
                    },
                    {
                        code: 'report', text: '报表',
                        address: 'examples.view.user.Report', leaf: true
                    },
                    {
                        code: 'calendar', text: '日历',
                        address: 'examples.view.component.calendar.Calendar', leaf: true
                    }]
            }
        ]);
    }

});