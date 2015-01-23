var scoutApp = angular.module('scoutApp', ["firebase"]);
var scout;


//var fb = new Firebase("https://blazing-heat-189.firebaseio.com/scout/");
//fb.on("value", function(data) {
//  scout = data.val();
//  alert(scout.firstName);
//  
//});


scoutApp.controller('ScoutCtrl', ["$scope", "$firebase", 
  function($scope, $firebase) {
    var scoutFb = new Firebase("https://blazing-heat-189.firebaseio.com/scout/");
    
    var scoutSync = $firebase(scoutFb);
    
    $scope.scout = scoutSync.$asObject();
  }
]);