app
	.directive('minionCrop', [ '$rootScope', function ($rootScope) {

		var _item = null,
			_scope = null,
			$mouse_x = 0,
			$mouse_y = 0,
			$elem_x = 0,
			$elem_y = 0,
			$image = null,
			$imageData = {},
			$viewport = null,
			$maskSize = null;

		var settings = {mask_padding:0};

		var _startMove = function startMove(e){
			//console.log('Start move:', e.x, e.y);

			// Setup initial mouse position
			$mouse_x = e.x-$elem_x;
			$mouse_y = e.y-$elem_y;

			$viewport.bind('mousemove', _doMove);
		}

		var _doMove = function updateMove(e){
			//console.log('Do move:', e.x, e.y);
			//console.log('Do move - diff:', $mouse_x-e.x, $mouse_y-e.y);
			
			// Move the image
			$elem_x = e.x-$mouse_x,
			$elem_y = e.y-$mouse_y;

			$image.css({top: $elem_y+'px', left: $elem_x+'px'});
		}

		var _endMove = function endMove(e){
			//console.log('End move:', e.x, e.y);
			$viewport.unbind('mousemove', _doMove);
		}

		var _zoomy = function zoomy( factor ){
			//console.log('Zoooooomy...', factor, $imageData);
			newHeight = Math.round($imageData.originalHeight * (factor/100)),
			newWidth  = Math.round($imageData.originalWidth * (factor/100));

			newHeight = (newHeight % 2) ? newHeight += 1 : newHeight;
            newWidth  = (newWidth % 2) ? newWidth += 1 : newWidth;

			//console.log('newHeight: ', newHeight, 'newWidth: ', newWidth);
			$image.height(newHeight);
			$image.width(newWidth);

			_centerImage(false);
		}

		var _imageLoad = function imageLoad(e){
			//console.log('image loaded', e);
			$imageData = {
	          	width: $image.width(),
	          	height: $image.height(),
	          	originalWidth: $image.width(),
	          	originalHeight: $image.height()
	          };

	        _centerImage(true);
		}

		var _centerImage = function centerImage( modifySize ){
			//console.log('Centre image, modifySize:', modifySize);

			var image_width   = $image.width(),
                image_height  = $image.height(),
                actual_ratio  = image_width / image_height,
                mask_width    = $viewport.width(),
                mask_height   = $viewport.height(),
                crop_width    = $viewport.width() - 2 * settings.mask_padding,
                crop_height   = $viewport.height() - 2 * settings.mask_padding;

            // Change the size of the image to make it fit in the viewport
            if(modifySize){
	            if(image_width > image_height) {
					image_height = crop_height;
					$image.height(image_height);
					image_width = $image.width();
	            }
	            else {
					image_width = crop_width;
					$image.width(image_width);
					image_height = $image.height();
	            }
	        }

	        // Centre the image in the viewport
			$elem_x = mask_width / 2 - image_width / 2;
			$elem_y = mask_height / 2 - image_height / 2
			$image.css({top: $elem_y+'px', left: $elem_x+'px'});
		}

		var _cropMe = function cropMe(){
			console.log('I\'m gonna crop it...');

			var serverData = {
				img_src: _scope.imgSrc,
				top: $elem_y, // + settings.mask_padding
				left: $elem_x, // + settings.mask_padding 
				cropHeight: $image.height(),
				cropWidth: $image.width(),
				maskSize: $maskSize
			}

			//console.log('Crop result:', serverData);
			_scope.cropAction({imageUrl:_scope.imgSrc, params:serverData});
		}


		return {
	       restrict: 'A',
	       replace: true,
	       transclude: true,
	       templateUrl: 'views/minion-crop.tpl.html',
	       scope: {
	        imgSrc: '@',
	        maskSize: '@',
	        width: '@',
	        height: '@',
	        cropAction: '&'
	       },
	       link: function ($scope, $element, attrs) {
	       		_scope = $scope;
				$viewport = $('.viewport');
				$image = $('.profile-img');

				$image.bind('load', _imageLoad);


				// Bind the mouse events
				$viewport.bind('mousedown', _startMove);
				$viewport.bind('mouseup', _endMove);
				$viewport.bind('mouseleave', _endMove);

				$scope.zoomy = _zoomy;
				$scope.cropIt = _cropMe;
				$maskSize = $scope.maskSize;
	        }

	    }
	    
	  
	}]);

