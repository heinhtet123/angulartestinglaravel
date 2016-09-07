app.factory('dataFactory',function($http){
	var myService= {
		httpRequest:function (url,method,params,dataPost,upload){
		var passParameters={};
		passParameters.url=url;

		  if (typeof method == 'undefined'){
	        passParameters.method = 'GET';
	      }else{
	        passParameters.method = method;
	      }

	      if (typeof params != 'undefined'){
	        passParameters.params = params;
	      }

	      if (typeof dataPost != 'undefined'){
	        passParameters.data = dataPost;
	      }

	      if (typeof upload != 'undefined'){
	         passParameters.upload = upload;
	      }

	      var promise=$http(passParameters).then(function(data){
	      	return data.data;
	      }).catch(function(){
	      	console.log("Something went wrong in promise response");
	      });

		  return promise;
	  }
	};

	return myService;
});