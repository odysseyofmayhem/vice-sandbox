app.directive('cropsyArea', function (){
   return function(scope, elem) {
      elem.cropsy({
			  max_scale: 2,
			  mask_padding: 40
			});
   }
});