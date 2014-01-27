$.fn.cropsy = function(options) {
          var settings = {
            mask_padding: 40,
          }

          if ( typeof(options) == 'object' ) {
            $.extend( settings, options );
          }

          var $image = $('#profile-img'),
              $loading = $('.loading-indicator'),
              $viewport = $image.parent(),
              $container = $viewport.parent()
              $overlay = $('#cropper-overlay');

          $viewport.css({
            height: "+=" + settings.mask_padding * 2,
            width: "+=" + settings.mask_padding * 2
          });
          $image.hide();

          // attach on image load
          $image.bind('load', function() {

            centerImage();

            $.extend($image, {
              originalWidth: $image.width(),
              originalHeight: $image.height()
            });

            var onStartDragPosition;
            $overlay.draggable({
              start: function(event, ui) {
                onStartDragPosition = $image.position();
              },
              drag: function(event, ui) {
                console.log("before: ", $image.position().left, $image.position().top);
                $image.offset({
                  'top': onStartDragPosition.top + ui.offset.top,
                  'left': onStartDragPosition.left + ui.offset.left
                });
                console.log("after: ", $image.position().left, $image.position().top);
              },
              stop: function() {
                $overlay.css({'left': 0, 'top': 0});
              }
            });

            /*
            var $zoom_widget = $('.zoom-slider')
              .width($viewport.width())
              .slider({
                value: 0,
                min: 0,
                max: 100,
                slide: function(event, ui) {

                  var imgOffset = $image.offset(),
                      centerX = Math.round(imgOffset.left + $image.width() / 2),
                      centerY = Math.round(imgOffset.top + $image.height() / 2),
                      newHeight = Math.round($image.originalHeight * (1 + ui.value / 100)),
                      newWidth  = Math.round($image.originalWidth * (1 + ui.value / 100));

                      newHeight = (newHeight % 2) ? newHeight += 1 : newHeight;
                      newWidth  = (newWidth % 2) ? newWidth += 1 : newWidth;

                      $image.height(newHeight);
                      $image.width(newWidth);

                      $image.offset({
                        top: Math.round(centerY - newHeight / 2),
                        left: Math.round(centerX - newWidth / 2)
                      });
                }
              });*/

            // remove loader and show image
            $loading.hide();
            $loading.remove();
            $image.show();
          });

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
        }


        /*
        $('.container').hide();
        var uploader = new qq.FileUploader({
          element: document.getElementById('file-uploader'),
          multiple: false,
          allowedExtensions: ['jpg', 'jpeg', 'png'],
          acceptFiles: 'image/*',
          action: 'server.json',
          forceMultipart: true,
          inputName: 'Project[cover_image]',
          params: {
            type: 'Project'
          },
          onComplete: function(id, filename, response) {
            $('.container').show();
            $('#profile-img').attr('src', response.img_src).cropsy();
          }
        });
*/


        $('a#done').button().click( function(evt){
          evt.preventDefault();

          var $image = $('#profile-img'),
              offset = $image.offset(),
              src    = $image.attr('src');

          var serverData = {
            img_src: src,
            top: offset.top, // + settings.mask_padding
            left: offset.left, // + settings.mask_padding 
            cropHeight: $image.height(),
            cropWidth: $image.width()
          } 

          console.log(serverData);
          alert(serverData.top + ", " + serverData.left);
        });

      