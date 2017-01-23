Ext.define('FontPackagesViewer.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.data.Store'
    ],

    init: function(){
        this.loadIcons(this.getView().getActiveTab());
    },

    /**
     * tab change callback - loads new icons
     * @param tabpanel
     * @param newTab
     * @param oldTab
     */
    onTabChange: function(tabpanel, newTab, oldTab){
        this.loadIcons(newTab);
    },

    /**
     * whether or not icons have been loaded for a view
     */
    iconsLoadStatus: null,

    /**
     * loads icons from json
     * @param tab
     */
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

    /**
     * @private
     */
    idGen: null,

    /**
     * gets an instance of sequential id generator
     * @returns {null}
     */
    getGenerator: function(){
        if(!this.idGen){
            this.idGen = Ext.create('Ext.data.identifier.Sequential');
        }
        return this.idGen;
    },

    /**
     * icons store load callback - prepares categories grid data and icons html
     * @param store
     * @param records
     * @param successful
     * @param op
     * @param eOpts
     */
    onIconsStoreLoad: function(store, records, successful, op, eOpts){

        if(!successful){
            return;
        }

        //sort the icons first:
        store.sort('group', 'ASC');

        //split icons into groups
        var groups = {},
            html = '',
            cats = [],
            idGen = this.me.getGenerator();


        store.each(function(r){
            var g = r.get('group');
            groups[g] = groups[g] || [];
            groups[g].push(r);
        });

        //generate html and categories list data
        Ext.Array.each(Ext.Object.getKeys(groups), function(group){
            var groupName = group === 'group_name' ? 'All icons' : group,
                groupId = 'cat_' + idGen.generate();

            html += '<div id="' + groupId + '" style="display: inline-block; width: 100%;">';

            html += '<h3 class="iconGroup">' + groupName + '</h3>';

            Ext.Array.each(groups[group], function(icon){
              html +=
                '<div class="iconBox">' +
                    '<div style="width:100%; height: 39px;">' +
                        '<div class="icon ' + icon.get('iconCls') + '"></div><div class="iconCode">' + icon.get('fontCode') +'</div>' +
                    '</div>' +
                    '<div class="iconName">' + icon.get('name') + '</div><br/>' +
                '</div>';
            });

            html += '</div>';

            cats.push({category: groupName, groupId: groupId});
        });

        //load the cats store
        this.me.lookupReference(this.tab.reference + '_categories').setStore(
            Ext.create('Ext.data.Store', {
                fields: ['category', 'groupId'],
                data: cats
            })
        );

        //and push it into tabpanels html
        this.me.lookupReference(this.tab.reference + '_icons').setHtml(html);
    },

    /**
     * cats grid select allback - scrolls cat into view
     * @param rowModel
     * @param rec
     */
    onCatsGridSelect: function(rowModel, rec){
        if(!rec){
            return;
        }

        Ext.get(rec.get('groupId')).scrollIntoView(this.lookupReference(rowModel.view.grid.reference.replace('_categories', '_icons')).body.dom);
    }
});
