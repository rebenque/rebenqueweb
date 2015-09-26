
var angular = require('angular');
var angularBoostrap = require('angular-bootstrap');
var angularUIRouter = require('angular-ui-router');

var services = require('./services');
var directives = require('./directives');
var controllers = require('./controllers');


var wa = angular.module('wa', [
    'ui.bootstrap',
	'ui.router',
	'wa.services',
	'wa.directives',
	'wa.controllers'
]);

module.exports = wa;

// Routes
require('./routes');
