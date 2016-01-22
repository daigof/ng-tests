'use strict';

angular.module( 'myApp', [  ] )
  .run( [ '$rootScope', function( $rootScope ) {
    $rootScope.prop1 = 'Diego';
  } ] );
