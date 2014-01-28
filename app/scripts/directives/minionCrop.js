app
	.directive('minionCrop', [ '$rootScope', function ($rootScope) {

		var _item = null,
			$mouse_x = 0,
			$mouse_y = 0,
			$elem_x = 0,
			$elem_y = 0,
			$image = null,
			$overlay = null;

		var _startMove = function startMove(e){
			console.log('Start move:', e.x, e.y);

			// Setup initial mouse position
			$mouse_x = e.x-$elem_x;
			$mouse_y = e.y-$elem_y;

			$viewport.bind('mousemove', _doMove);
		}

		var _doMove = function updateMove(e){
			console.log('Do move:', e.x, e.y);
			console.log('Do move - diff:', $mouse_x-e.x, $mouse_y-e.y);
			
			// Move the image
			$elem_x = e.x-$mouse_x,
			$elem_y = e.y-$mouse_y;

			$image.css({top: $elem_y+'px', left: $elem_x+'px'});
		}

		var _endMove = function endMove(e){
			console.log('End move:', e.x, e.y);
			$viewport.unbind('mousemove', _doMove);
		}



		return {
	       restrict: 'A',
	       replace: true,
	       transclude: true,
	       controller: 'minionCropCtrl',
	       templateUrl: 'views/minion-crop.tpl.html',
	       scope: {
	        imgSrc: '@'
	       },
	       link: function ($scope, $element, attrs) {
	          $viewport = $('.viewport');
	          $overlay = $('.overlay');
	          $image = $('.profile-img');

	          // Bind the mouse events
	          $viewport.bind('mousedown', _startMove);
	          $viewport.bind('mouseup', _endMove);
	          $viewport.bind('mouseleave', _endMove);
	        }

	    }
	    
	  
	}])

	.controller('minionCropCtrl', ['$scope', function ($scope) {
	    $scope.what = 'this';

	   
	}]);

