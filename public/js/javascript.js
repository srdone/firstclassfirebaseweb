var scoutApp = angular.module('scoutApp', ["firebase"]);
var scout;


//var fb = new Firebase("https://blazing-heat-189.firebaseio.com/scout/");
//fb.on("value", function(data) {
//  scout = data.val();
//  alert(scout.firstName);
//  
//});


scoutApp.controller('ScoutCtrl', ["$scope", "$firebase", 
  function ($scope, $firebase) {
    var scoutFb = new Firebase("https://blazing-heat-189.firebaseio.com/scouts/0/");
    var awardsFb = new Firebase("https://blazing-heat-189.firebaseio.com/awards/");
    
    var scoutSync = $firebase(scoutFb);
    var awards = $firebase(awardsFb).$asObject;
    
    $scope.scout = scoutSync.$asObject();
    
    // This function is not currently working - why?
    $scope.scout.currentRank = function() {
      function getAwardReqs(awardId) {
        awards.forEach(function(current) {
          if (current.awardId === awardId) {
            return current.reqId; 
          }
        });
      }
      
      function isComplete(award) {
        var awardId = award.awardId;
        var awardReqs = getAwardReqs(awardId);
        var competedReqs = getCompletedReqs(awardId);
        
        for (var i = 0; i < awardReqs.length; i++) {
           if (competedReqs.indexOf(awardReqs[i]) === -1) {
             return false;
           }
        }
        return true;
      }
      
      var awardsStarted = this.requirementsCompleted.map(function(current) {
        var getAwardObj = function(awardId) {
          for (var i = 0; i < awards.length; i++) {
            if (awards[i].awardId === awardId) {
              return awards[i]; 
            }
          }
        }
        
        var award = getAwardObj(current.awardId);
        alert(award.awardName);
        return award; 
      });
      
      var awardsCompleted = awardsStarted.forEach(function(current) {
        if(isComplete(current)) {
          return current;  
        }
      });
        
      //This would work much better if the award data were structured as an array of requirements
      // right now we will just return the first one in the array. we need to define an order somehow
      return awardsCompleted[0];
    }
  }
]);