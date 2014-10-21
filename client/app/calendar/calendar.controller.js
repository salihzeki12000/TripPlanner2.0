'use strict';

angular.module('tripPlannerApp')
  .controller('CalendarCtrl', function($scope, planData, $http, $stateParams) {

    $scope.init = function() {
      $scope.updatePlanData();
    }

    // set the current trip and the populate events array
    var tripId = $stateParams.id;
    $scope.currentTrip = planData.getCurrentTrip();
    $scope.events = [];

    $scope.updatePlanData = function() {
      $http.get('/api/trips/' + tripId).success(function(trip) {
        planData.setCurrentTrip(trip);
        $scope.currentTrip = planData.getCurrentTrip();
        $scope.events = $scope.currentTrip.activities;
        $scope.eventSources[0] = $scope.events.map(function(event) {
          var start = new Date(event.start);
          var end = new Date(start.setHours(start.getHours() + 1));
          var obj = {
            title: event.title,
            start: start.toISOString(),
            end: end.toISOString(),
            allDay: false,
            id: event.googleDetails.place_id
          };
          return obj;
        });
      });
    };

    if (!planData.getCurrentTrip()) {
      $scope.updatePlanData();
    }

    $scope.$on('addToCal', function() {
      $scope.updatePlanData();
    });

    $scope.updateActivities = function(event) {
      for(var i=0, n=$scope.events.length; i<n; i++) {
        if($scope.events[i].googleDetails.place_id == event.id) {
          $scope.events[i].start = event.start.toISOString();
          if(event.end) {
            $scope.events[i].end = event.end.toISOString();
            console.log("end", $scope.events[i].end)
          }
        }
      }

      $http.post('/api/trips/' + tripId, {
        activities: $scope.events
      }).success(function(updatedTrip) {
        console.log("updatedTrip", updatedTrip);
        planData.setCurrentTrip(updatedTrip);
      })
    }

    //with this you can handle the events that generated by clicking the day(empty spot) in the calendar
    $scope.dayClick = function(date, allDay) {
      $scope.$apply(function() {
        console.log('Day Clicked ' + date);
      });
    };


    //with this you can handle the events that generated by droping any event to different position in the calendar
    $scope.alertOnDrop = function(event) {
      $scope.$apply(function() {
        $scope.updateActivities(event);
      });
    };


    //with this you can handle the events that generated by resizing any event to different position in the calendar
    $scope.alertOnResize = function(event) {
      $scope.$apply(function() {
        $scope.updateActivities(event);
      });
    };

    //with this you can handle the click on the events
    $scope.eventClick = function(event) {
      $scope.$apply(function() {
        console.log(event.title + ' is clicked');
      });
    };

    /* config object */
    $scope.uiConfig = {
      calendar: {
        // height: 450,
        editable: true,
        header: {
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.dayClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventClick: $scope.eventClick,
        viewRender: $scope.renderView
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];

    $scope.init();
  });


// /* Change View */
// this.changeView = function(view,calendar) {
//   calendar.fullCalendar('changeView',view);
// };

// /* Change View */
// this.renderCalender = function(calendar) {
//   if(calendar){
//     calendar.fullCalendar('render');
//   }
// };

