(function(){

    /**
     * generates a content for a tab
     * @param tabName
     * @param refName
     * @param iconCls
     * @returns {{layout: string, title: *, reference: string, iconCls: *, margin: string, items: [*,*]}}
     */
    var getTab = function(tabName, refName, iconCls){
        return {
            layout: 'border',
            title: tabName,
            reference: refName,
            iconCls: iconCls,
            margin: '10 0 0 0',
            items: [
                {
                    title: 'Categories',
                    reference: refName + '_categories',
                    width: 300,
                    region: 'west',
                    split: true,
                    xtype: 'grid',
                    columns: [
                        {
                            text: 'Category',
                            flex: 1,
                            dataIndex: 'category',
                            align: 'left'
                        }
                    ],
                    listeners: {
                        select: 'onCatsGridSelect'
                    }
                },
                {
                    title: 'Icons',
                    region: 'center',
                    reference: refName + '_icons',
                    layout: 'fit',
                    scrollable: 'y',
                    bodyPadding: 20
                }
            ]
        };
    };

    Ext.define('FontPackagesViewer.view.main.Main', {
        extend: 'Ext.tab.Panel',
        xtype: 'app-main',

        requires: [
            'Ext.plugin.Viewport',
            'Ext.window.MessageBox',

            'FontPackagesViewer.view.main.MainController'
        ],

        controller: 'main',
        viewModel: true,

        items: [
            getTab('Icon 54', 'Icon54all', 'x-i54c i54c-you-rock'),
            getTab('Linear Icons', 'LinearIcons', 'x-li li-diamond3')
        ],

        listeners: {
            tabchange: 'onTabChange'
        }
    });
})();
