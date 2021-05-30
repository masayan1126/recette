<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeScheduleController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/calendar', [RecipeScheduleController::class,'store']);
Route::get('/calendar', [RecipeScheduleController::class,'index']);

Route::group(['middleware' => 'api'], function() {
    Route::put('/calendar/{id?}', [RecipeScheduleController::class, 'update']);
});

Route::group(['middleware' => 'api'], function() {
    Route::get('/calendar', [RecipeScheduleController::class, 'index']);
});
Route::group(['middleware' => 'api'], function() {
    Route::post('/calendar', [RecipeScheduleController::class, 'store']);
});
