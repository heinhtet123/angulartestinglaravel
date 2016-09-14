<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });



// Route::resource('items', 'ItemController');


 Route::get('/', function(){
 	return view('app');
 });




Route::resource('items', 'ItemController');
Route::get('countingitems','ItemController@countingItems');
Route::delete("multipledelete/{ids}", "ItemController@multipledelete");
// Templates
Route::group(array('prefix'=>'/templates/'),function(){

    Route::get('{templates}', array( function($templates)
    {
        $templates = str_replace(".html","",$templates);
        View::addExtension('html','php');
        return View::make('templates.'.$templates);
    }));
});
