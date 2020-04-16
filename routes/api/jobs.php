<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/', 'JobsController@store')->name('jobs.store');
    Route::get('/', 'JobsController@index')->name('jobs.index');
    Route::get('/{id}', 'JobsController@show')->name('jobs.show');
    Route::match(['put', 'patch'], '/{id}', 'JobsController@update')->name('jobs.update');
    Route::delete('/{id}', 'JobsController@delete')->name('jobs.delete');
});