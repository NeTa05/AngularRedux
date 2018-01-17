<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//group for all the urls /services/here_the_route
Route::group( [ 'prefix' => 'services' ], function(){

	//check basic authentication before call endpoints
	Route::group(['middleware' => 'basic.auth'], function () {
		//Routes for stores
		Route::get('stores', 'StoreController@index');
		Route::get('stores/{storeId}', 'StoreController@show');
		Route::post('stores', 'StoreController@store');
		Route::put('stores/{storeId}', 'StoreController@update');
		Route::delete('stores/{storeId}', 'StoreController@destroy');

		//Routes for articles
		Route::get('articles', 'ArticleController@index');
		Route::get('articles/{articleId}', 'ArticleController@show');
		Route::post('articles', 'ArticleController@store');
		Route::put('articles/{articleId}', 'ArticleController@update');
		Route::delete('articles/{articleId}', 'ArticleController@destroy');
		Route::get('articles/stores/{storeId}/','ArticleController@getArticlesFromStore');
	});
});