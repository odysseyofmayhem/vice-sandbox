
angular.module('viceSandboxApp')
  .controller('cropCtrl', function ($scope, $http) {
    

    $scope.working = 'yep';
    $scope.uploadedFile = null;
    $scope.imageUrl = null;
    $scope.zoomLevel = 0;

    $scope.croppedImage = null;


    $scope.doneUploading = function( file ){

    	console.log('Done uploading file to S3');
    	console.log(file);

    	$scope.imageUrl = file[0].url;
    	$scope.uploadedFile = file[0];


    	$('#profile-img').attr('src', $scope.imageUrl).cropsy();
    }

    $scope.doCrop = function doCrop(url, params){
        console.log('doCrop', params);

        //$scope.croppedImage = '';

        filepicker.setKey('AvLdHzmzaQaJHo0UiyxQwz');
        filepicker.convert( $scope.uploadedFile, 
                            {crop: [params.top, params.left, params.cropWidth, params.cropHeight]},
                            function(blob){
                                console.log('completed crop', blob);
                                $scope.croppedImage = blob.url;
                            });
    }
  });



