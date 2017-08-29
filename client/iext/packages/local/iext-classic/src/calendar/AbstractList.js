/**
 * @class iExt.calendar.AbstractList
 * @extends {Ext.view.View}
 * @classdesc A base class for the calendar view.
 */
Ext.define('iExt.calendar.AbstractList', {
    extend: 'Ext.view.View',
 
    updateNavigationModel: function(navigationModel, oldNavigationModel) {
        navigationModel.focusCls = '';
    },
 
    onItemClick: function(record, item, index, e) {
        this.callParent([record, item, index, e]);
        this.handleItemTap(record);
    }
})