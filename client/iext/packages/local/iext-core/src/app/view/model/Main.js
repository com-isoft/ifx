/**
 * @class iExt.app.view.model.Main
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 应用程序ViewModel。
 * 可以共享该ViewModel的数据
 */
Ext.define('iExt.app.view.model.Main', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixmain',

    ixIsAppViewModel: true,

    data: {
        /**
         * 应用程序数据。
         * 其他视图定义的数据不能以ix开头。
         */
        ixa: {
            /**
             * 当前用户信息。
             */
            user: {
                code: 'Administrator',
                name: '管理员'
            },
            /**
             * 当前应用信息。
             */
            app: {
                id: '',
                code: '',
                name: ''
            }
        }
    },

    /**
     * 设置用户的快捷方式。
     */
    ixSetUser: function (user) {
        this.set('ixa.user', user);
    }

});