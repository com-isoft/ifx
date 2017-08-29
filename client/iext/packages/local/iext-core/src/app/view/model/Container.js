/**
 * @class iExt.app.view.model.Container
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 视图容器ViewModel。
 */
Ext.define('iExt.app.view.model.Container', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixviewcontainer',

    ixIsContainerViewModel: true,

    data: {
        /**
         * 视图容器数据。
         * 其他视图定义的数据不能以ix开头。
         */
        ixvc: {
            /**
             * 标题。
             */
            title: '',

            /**
             * 子标题。
             */
            subTitle: null,
            /**
             * 当前视图的引用名称。
             */
            viewRef: '',
            /**
             * 当前视图的标识。
             */
            viewId: ''
        }
    },

    formulas: {

        /**
         * 视图容器标题。
         */
        title: function (get) {
            var title = get('ixvc.title');
            var subTitle = get('ixvc.subTitle');
            if (!Ext.isEmpty(subTitle)) {
                title = title + '：' + subTitle;
            }
            return title;
        }

    },

    /**
     * 设置标题的快捷方式。
     */
    ixSetTitle: function (title) {
        this.set('ixvc.title', title);
    },

    /**
     * 设置子标题的快捷方式。
     */
    ixSetSubTitle: function (subTitle) {
        this.set('ixvc.subTitle', subTitle);
    }

});