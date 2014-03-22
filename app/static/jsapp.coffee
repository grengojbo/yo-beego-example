###global app, prettyparams, ###
'use strict'

window.app = angular.module('myapp', [
  'ngRoute',
  'ngMockE2E',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  # 'ui.bootstrap',
  # 'ui.router',
  # 'ngRoute',
  'chieffancypants.loadingBar',
  # 'ngAnimate',
  'ui.date'
])


app.config(['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when '/aaa',
    redirectTo: '/'
    .otherwise redirectTo: '/'
  return false
])

#VideoController.$inject = ['$scope', 'Video'];