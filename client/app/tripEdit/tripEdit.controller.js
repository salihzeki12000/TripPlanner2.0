'use strict';

angular.module('tripPlannerApp')
  .controller('TripeditCtrl', function ($scope, $rootScope, $http, planData, $stateParams, $interval) {
    var tripId = $stateParams.id;

  	$scope.currentTrip = planData.getCurrentTrip();
    if(!planData.getCurrentTrip()) {
      $http.get('/api/trips/' + tripId).success(function(trip) {
        $scope.currentTrip = trip;
        $scope.autocomplete.options.bounds = new google.maps.LatLng(
          $scope.currentTrip.latLng.k,
          $scope.currentTrip.latLng.B
        );
        planData.setCurrentTrip(trip);
      })
    }

    $rootScope.$on('newCurrentTrip', function() {
    	$scope.currentTrip = planData.getCurrentTrip();
    });

    $scope.updateTrip = function(updatedTrip) {
      if($scope.currentTrip) {
      	$http.put('/api/trips/' + $scope.currentTrip._id, {
      		// Send trip to backend, update with newly changed trip
      	})
      }
    };

    $scope.$watch('currentTrip', function(newVal, oldVal) {
    	$scope.updateTrip(newVal);
    }, true);

    $scope.closed = true;

    $scope.showDatePicker = function(index) {
      $scope.closed = !$scope.closed;
      $scope.currentWish = $scope.currentTrip.wishlist[index]
    }

    $scope.autocomplete = {
      options:{}
    };

    $scope.addToWishlist = function() {
      var checkForDetails = $interval(function() {
          if ($scope.autocomplete.details !== undefined) {
              $interval.cancel(checkForDetails);
              $scope.currentTrip.wishlist.push($scope.autocomplete.details);
              console.log("details: ", $scope.autocomplete.details)
              $scope.autocomplete.details = undefined;
          }
      }, 50, 10);
    };


    $scope.currentWish;
    $scope.start;
    $scope.selectActivityTime = function() {
      // pop up date and time selector
      if($scope.start !== undefined) {
        console.log('wish: ', $scope.currentWish);
        console.log('Time selected for wish: ', $scope.start);
        $scope.addToCal();
      }
    }

    $scope.addToCal = function() {
      // push into trip schema
      $http.put('/api/trips/' + $scope.currentTrip._id + '/addActivity', {title: $scope.currentWish.name, googleDetails: $scope.currentWish, start: $scope.start})
      .success(function(data){
        console.log("wish saved to the server: ", $scope.currentTrip);
        $scope.closed = true;
        $rootScope.$broadcast('addToCal');
      })
      // push into event array from plan data factory
    }
  })
  // .contoller('PickerCtrl', function() {})
  ;
