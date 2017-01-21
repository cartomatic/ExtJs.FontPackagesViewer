/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
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
        {
            title: 'Icon54',
            reference: 'Icon54all',
            iconCls: 'x-i54c i54c-you-rock',
            layout: 'fit',
            scrollable: 'y',
            bodyPadding: 20
        },
        // {
        //     title: 'Icon54com',
        //     reference: 'Icon54com',
        //     //iconCls: 'fa-home',
        //     layout: 'fit',
        //     scrollable: 'y',
        //     bodyPadding: 20
        // },
        {
            title: 'LinearIcons',
            reference: 'LinearIcons',
            iconCls: 'x-li li-diamond3',
            layout: 'fit',
            scrollable: 'y',
            bodyPadding: 20
        }

    ],

    listeners: {
        tabchange: 'onTabChange'
    }
});
