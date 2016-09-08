var global_var=0;

app.controller('AdminController',function($scope,$http){
	$scope.pools=[];
});

app.controller('ItemController',function(dataFactory,$log,$scope,$window,$http){
//	global_var=1;

  
  $scope.loading=true;

  //items per page
  $scope.itemsperpage=5;


  $scope.setPage = function (pageNo) {
    $scope.bigCurrentPage = pageNo;
    $scope.loading=true;

    dataFactory.httpRequest("/items?sortby='desc'&page="+pageNo+" ").then(function(data){
     
      $scope.loading=false;
      $scope.data={};
      $scope.data=data;

    });


  };

  $scope.pageChanged = function() {
    //$log.log('Page changed to: ' + $scope.currentPage);
  };

  
  dataFactory.httpRequest("/countingitems").then(function(data){
    //total number of items
    $scope.bigTotalItems=data;

  }).catch(function(){
    $log.log("something went wrong on counting items");
  });
  


  // total items
  (() => {  
      // ?sortby='desc'
    dataFactory.httpRequest("/items?sortby='desc'").then(function(data){
      $scope.loading=false;
      $scope.data=data;
    });

  })();
  


  $scope.maxSize = 5;
  //number of page


  $scope.numPages= $scope.bigTotalItems/$scope.itemsperpage;
  if($scope.numPages % 1 != 0)
  {
      $scope.numPages=$scope.numPages+1;
  }

  $scope.bigCurrentPage = 1;
  


	// $scope.data=[];

 //  $scope.libraryTemp = {};
 //  $scope.totalItemsTemp = {};

 //  // $scope.sortBy = "id";   //set the sortBy to the param passed
 //  // $scope.reverse = true; //if true make it false and vice versa

 //  $scope.totalItems = 0;

 //  // $scope.pageChanged = function(newPage) {
 //  //   getResultsPage(newPage,'b');
 //  // };

 //  getResultsPage(2,"a");
  
 //  function getResultsPage(pageNumber,name) {
      

 //      if(! $.isEmptyObject($scope.libraryTemp)){
 //          dataFactory.httpRequest('/items?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
 //            $scope.data = data.data;
 //            $scope.totalItems = data.total;
 //          });
 //      }else{
        
 //        promise =dataFactory.httpRequest('/items');
 //        promise.then(function(data) {

 //          console.log(data);  
 //          $scope.data = data;
          
 //          // return data.length;
 //        });
        

 //      }
 //  }

  $scope.saveAdd=function(isvalid){
     $scope.minlength = 3;
    if(isvalid)
    {
     // console.log($scope.user);
       promise=dataFactory.httpRequest('items','POST',{},$scope.user).then(function(data){
          
          host=$window.location.host;
          $scope.data.push(data);
          
          $window.alert("Successfully Saved");
          $window.location.href="http://"+host+"/#/items";
          
       });
      

    }
    


  };





});
