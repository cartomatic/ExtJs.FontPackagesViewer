(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 21.01.2017.
     */
    Ext.define('FontPackagesViewer.model.FontIcon', {
        extend: 'Ext.data.Model',
    
        fields: [
            { name: 'name', type: 'string' },
            { name: 'iconCls', type: 'string' },
            { name: 'fontCode', type: 'string' },
            { name: 'group', type: 'string' }
        ]
    });
    
}());

    