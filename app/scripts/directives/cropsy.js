app.directive('cropsyArea', [ '$rootScope', function ($rootScope) {
    var $overlay, $viewport, $container, $image, startDragPosition;
    var settings = {
            mask_padding: 40,
          };

    var centerImage = function() {
            var image_width   = $image.width(),
                image_height  = $image.height(),
                actual_ratio  = image_width / image_height,
                mask_width    = $viewport.width(),
                mask_height   = $viewport.height(),
                crop_width    = $viewport.width() - 2 * settings.mask_padding,
                crop_height   = $viewport.height() - 2 * settings.mask_padding;

            if (image_width > image_height) {
              image_height = crop_height;
              $image.height(image_height);
              image_width = $image.width();
            } else {
              image_width = crop_width;
              $image.width(image_width);
              image_height = $image.height();
            }

            $image.offset({
              top: mask_height / 2 - image_height / 2,
              left: mask_width / 2 - image_width / 2
            });
          }
          


    return {
       restrict: 'A',
       replace: true,
       transclude: true,
       controller: 'CropsyCtrl',
       templateUrl: 'views/cropsy.tpl.html',
       scope: {
        imgSrc: '@'
       },
       link: function ($scope, $element, attrs) {
          console.log($scope);

          $container = $element;
          $overlay = $('#cropper-overlay');
          $viewport = $('.cropper-viewport');
          $image = $('#profile-img');

          $overlay[0].draggable = true;
          $overlay[0].addEventListener(
            'dragstart',
            function(e){
              e.dataTransfer.effectAllowed = 'move';
                
                startDragPosition = $image.position();
                console.log('START: '+$image.position().left, $image.position().top);
                return false;
            },
            false
          );

          $overlay[0].addEventListener(
            'drag',
            function(e){
                console.log('Before: '+$image.position().left, $image.position().top);
                console.log('Overlay: '+e.offsetX, e.offsetY);
                $image.offset({
                  top: startDragPosition.top + e.offsetY,
                  left: startDragPosition.left + e.offsetX
                });
                console.log('After: '+$image.position().left, $image.position().top);

                return false;
            },
            false
          );

          $overlay[0].addEventListener(
            'dragend',
            function(e){
                $overlay.css({left:0, right:0});
            },
            false
          );

          centerImage();



        }

       }
    
  }]);


app.controller('CropsyCtrl', function ($scope) {
    $scope.what = 'this';

   
});

