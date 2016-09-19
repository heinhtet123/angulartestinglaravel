var global_var=0;

app.controller('AdminController',function($scope,$http){
	$scope.pools=[];
});

app.controller('ItemController',function(dataFactory,$log,$scope,$window,$http){
//	global_var=1;
  $scope.sortField="id";
  $scope.reverse=true;
  $scope.params="?sortby='desc'&";
  $scope.loading=true;
  //items per page
  $scope.itemsperpage=5;
  
  $scope.maxSize = 5;
  //number of page
  $scope.bigCurrentPage = 1;
  $scope.numPages= $scope.bigTotalItems/$scope.itemsperpage;
  
  if($scope.numPages % 1 != 0)
  {
      $scope.numPages=$scope.numPages+1;
  }

  
  $scope.select=function (){
      if($scope.selected)
      {
        // added the selected
        angular.forEach($scope.data, function(data){
          // $scope.data.push({selected:true});
          data.selected = true;
        });


      }else{
        
         angular.forEach($scope.data, function(data){
            if(data.selected)
            {
              delete data.selected;
            }
         });

      }

   };

   
   $scope.deleteall=function (){
      var ids=new Array();
      count=0;
      angular.forEach($scope.data,function(data){
        if(data.selected==true)
        {
          ids[count]=data.id;
          count=count+1;
        }
      });
     

      if(ids.length>0){
            ids=JSON.stringify(ids);
         
            ids={ids:ids,reverse:$scope.reverse,page:$scope.bigCurrentPage};
            if(confirm("Are you sure you want to delete those items?")){

              $scope.loading=true;
              dataFactory.httpRequest('/multipledelete','DELETE',{},ids).then(function(data){
                  $scope.data=data.data;
                  $scope.numPages= data.totalcount/$scope.itemsperpage;
                  if($scope.numPages % 1 != 0)
                  {
                       $scope.numPages=$scope.numPages+1;
                  }
                  $scope.bigTotalItems=data.totalcount;
                  $scope.loading=false;
                  $scope.selected=false;
              });

              }
            //end of confirm box
         

      }
       
   
   };

  
  $scope.sort=function (sortname){
    $scope.sortField=sortname;
    $scope.reverse=!$scope.reverse;
    $scope.loading=true;
    // if true reverse=true if reverse=false

      if($scope.reverse==true)
      { 
       $scope.params="?sortby='desc'&";
       
      }else
      {
        $scope.params="?";
      }

     dataFactory.httpRequest("/items"+$scope.params+"page="+$scope.bigCurrentPage+" ").then(function(data){
        $scope.loading=false;
        $scope.data=data;
      });   

  };


  // set page function
  $scope.setPage = function (pageNo) {
    $scope.bigCurrentPage = pageNo;
    $scope.loading=true;
    $scope.selected=false;
    // ajax call to page

    dataFactory.httpRequest("/items"+$scope.params+"page="+pageNo+" ").then(function(data){
      $scope.loading=false;
      

      $scope.data=data;
      
    }).catch(function(){
        $scope.loading=false;
        console.log("something went wrong in setpage of ajax");
    });


  };


  // counting items
  dataFactory.httpRequest("/countingitems").then(function(data){
    //total number of items
    $scope.bigTotalItems=data;

  }).catch(function(){
    $log.log("something went wrong on counting items");
  });
  


  // total items first time 
  (() => {  
      // ?sortby='desc'
    dataFactory.httpRequest("/items?sortby='desc'").then(function(data){
      $scope.loading=false;
      $scope.selected=false;

      $scope.data=data;
    });

  })();


  $scope.saveAdd=function(isvalid){
     $scope.minlength = 3;
    if(isvalid)
    {
      console.log($scope.user);
       promise=dataFactory.httpRequest('items','POST',{},$scope.user).then(function(data){
          
          host=$window.location.host;
          $scope.data.push(data);
          $window.alert("Successfully Saved");
          $window.location.href="http://"+host+"/#/items";
       });
      

    }
    


  };





});