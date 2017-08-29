Ext.define('app.store.User', {
    extend: 'Ext.data.Store',

    alias: 'store.user',

    model: 'app.model.User',

    data: {
        items: [{
                name: 'Jean Luc',
                email: "jeanluc.picard@enterprise.com",
                phone: "555-111-1111",
                status: 1,
                dual: true,
                triplet: false
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 2,
                dual: true,
                triplet: true
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 4,
                dual: false,
                triplet: false
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 8,
                dual: false,
                triplet: true
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 1
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 2
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 4
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 8
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 1
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 2
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 4
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 8
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 1
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 2
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 4
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 8
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 1
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 2
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 4
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                status: 8
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                status: 1
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-666-6666",
                status: 2
            }
        ]
    },

    proxy: {
        type: 'memory',
        enablePaging: true,
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});