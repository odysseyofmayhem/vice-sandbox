'use strict';

angular.module('viceSandboxApp')
  .controller('PickerCtrl', function ($scope) {
    

    $scope.working = 'yep';
    $scope.uploadedFile = null;
    $scope.imageUrl = null;

    $scope.doneUploading = function( file ){

    	console.log('Done uploading file to S3');
    	console.log(file);

    	$scope.imageUrl = file[0].url;
    	$scope.uploadedFile = file;

    	$('#profile-img').attr('src', $scope.imageUrl).cropsy();
    }
  });
