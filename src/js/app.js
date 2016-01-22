'use strict';

angular.module( 'myApp', [] )
  .run( [ '$rootScope', function( $rootScope ) {
    $rootScope.prop1 = 'Diego';
    $rootScope.prop2 = 'Ana';
    $rootScope.format = 'M/d/yy h:mm:ss a';
    $rootScope.diagName = 'DoctorXXX';
  } ] )
  .directive( 'myDir', function() {
    return {
      scope: {
        info: '='
      },
      template: '<input type="text" ng-model="info" />',
      link: function( scope, element, attrs ) {
        console.dir( scope.info );
        // console.dir( element );
        // console.dir( attrs );
        // console.log( attrs[ 0 ] );
      }
    };
  } )
  .directive( 'myDialog', function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div ng-transclude></div>',
      link: function( scope, element, attrs ) {
        console.dir( scope.info );
        // console.dir( element );
        // console.dir( attrs );
        // console.log( attrs[ 0 ] );
      }
    };
  } )
  .directive( 'curTime', [ '$interval', 'dateFilter', function( $interval, dateFilter ) {
    return {
      scope: {
        format: '='
      },
      link: function( scope, element, attrs ) {
        var timeoutId;

        console.log( scope.format );

        function updateTime() {
          element.text( dateFilter( new Date(), scope.format ) );
        }

        scope.$watch( attrs.format, function( value ) {
          // format = value;
          console.log( value );
          updateTime();
        } );

        element.on( '$destroy', function() {
          $interval.cancel( timeoutId );
        } );

        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval( function() {
          updateTime(); // update DOM
        }, 1000 );
      }
    };

  } ] )
  .directive( 'myDraggable', [ '$document', function( $document ) {
    return {
      // template:'<div>YYYYYY</div>',
      link: function( scope, element, attr ) {
        var startX = 0,
          startY = 0,
          x = 0,
          y = 0;

        element.css( {
          position: 'relative',
          border: '1px solid red',
          backgroundColor: 'lightgrey',
          cursor: 'pointer'
        } );

        element.on( 'mousedown', function( event ) {
          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on( 'mousemove', mousemove );
          $document.on( 'mouseup', mouseup );
        } );

        function mousemove( event ) {
          y = event.pageY - startY;
          x = event.pageX - startX;
          element.css( {
            top: y + 'px',
            left: x + 'px'
          } );
        }

        function mouseup() {
          $document.off( 'mousemove', mousemove );
          $document.off( 'mouseup', mouseup );
        }
      }
    };
  } ] );
