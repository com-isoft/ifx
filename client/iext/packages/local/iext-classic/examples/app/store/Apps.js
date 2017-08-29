Ext.define('app.store.Apps', {
    extend: 'Ext.data.Store',

    alias: 'store.apps',

    fields: [
        'code', 'name', 'icon'
    ],

    data: { items: [
        { code: 'hr', name: "人力资源管理", thumb: "resources/images/icons/icon-1.png" },
        { code: 'oa', name: "办公自动化管理", thumb: "resources/images/icons/icon-2.png" },
        { code: 'tc', name: "培训管理", thumb: "resources/images/icons/icon-3.png" },
        { code: 'crm', name: "客户关系管理", thumb: "resources/images/icons/icon-4.png" },
        { code: 'bz', name: "交易管理", thumb: "resources/images/icons/icon-5.png" },
        { code: 'fin', name: "财务管理", thumb: "resources/images/icons/icon-6.png" },
        { code: 'job', name: "招聘管理", thumb: "resources/images/icons/icon-7.png" },
        { code: 'sm', name: "薪资管理", thumb: "resources/images/icons/icon-8.png" },
        { code: 'kpi', name: "绩效管理", thumb: "resources/images/icons/icon-9.png" },
        { code: 'so', name: "商机管理", thumb: "resources/images/icons/icon-10.png" }  
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
