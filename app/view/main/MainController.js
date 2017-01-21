/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('FontPackagesViewer.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.data.Store'
    ],

    init: function(){
        this.loadIcons(this.getView().getActiveTab());
    },

    onTabChange: function(tabpanel, newTab, oldTab){
        this.loadIcons(newTab);
    },

    iconsLoadStatus: null,

    loadIcons: function(tab){
        this.iconsLoadStatus = this.iconsLoadStatus || {};
        if(this.iconsLoadStatus[tab.reference]){
            return;
        }

        this.iconsLoadStatus[tab.reference] = true;

        //grab the store
        var store = Ext.create('Ext.data.Store', {
            model: 'FontPackagesViewer.model.FontIcon',

            proxy: {
                type: 'rest',
                url: 'data/' + tab.reference + '.json'
            }
        });
        store.on('load', this.onIconsStoreLoad, {me: this, tab: tab});
        store.load();
    },

    onIconsStoreLoad: function(store, records, succesful, op, eOpts){

        if(!successful){
            return;
        }

        //sort the icons first:
        store.sort('group', 'ASC');

        //split icons into groups
        var groups = {};
        store.each(function(r){
            var g = r.get('group');
            groups[g] = groups[g] || [];
            groups[g].push(r);
        });

        //generate html
        var html = '';
        Ext.Array.each(Ext.Object.getKeys(groups), function(group){
           html += '<h3 class="iconGroup">' + (group === 'group_name' ? 'All icons' : group) + '</h3>';
            Ext.Array.each(groups[group], function(icon){
              html +=
                '<div class="iconBox">' +
                    '<div style="width:100%; height: 39px;">' +
                        '<div class="icon ' + icon.get('iconCls') + '"></div><div class="iconCode">' + icon.get('fontCode') +'</div>' +
                    '</div>' +
                    '<div class="iconName">' + icon.get('name') + '</div><br/>' +
                '</div>'
           });
        });

        //and push it into tabpanels html
        this.tab.setHtml(html);
    }
});
