'use strict';

var angular = require('angular');
var controllers = require('../controllers');

// WA API
var WaApp = require('../../src/app');

controllers
    .controller('SimulationCtrl',
    function ($scope, $http, $location) {

        $scope.states = [];
        $scope.result = undefined;
        $scope.execute = function() {
            $scope.states = [];
            WaApp.exec(
                {
                    targetSpeed: $scope.targetSpeed? $scope.targetSpeed: undefined,
                    changeGear: $scope.changeGear? $scope.changeGear: undefined
                },
                $scope.states,
                function (err, result) {
                    $scope.result = result;
                }
            );
        };

    });
