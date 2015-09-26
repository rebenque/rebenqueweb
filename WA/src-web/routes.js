'use strict';

var angular = require('angular');
var app = require('./app');

app.config(function ($stateProvider, $urlRouterProvider) {
    console.log("HEY");
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
        .state(
            'index',
            {
                url: '/',
                views: {
                    'navbar': {
                        templateUrl: 'partials/navbar.html'
                    },
                    'main': {
                        templateUrl: 'partials/indexpage.html',
                        controller: 'SimulationCtrl'
                    }
                }
            });
});
