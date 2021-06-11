<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RecipeSchedule;
use App\Models\User;


class RecipeScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $recipe_schedules = User::with(['recipe_schedules'])->where('id', Auth::id())->get();
        clock($recipe_schedules);
        return $recipe_schedules;
    }

    public function store(Request $request)
    {
        foreach ($request->all() as $request){
            clock($request);
            // $requestは配列
            $recipe_schedules = RecipeSchedule::create(
                $request
            );
        }

        $recipe_schedules = User::with(['recipe_schedules'])->where('id', Auth::id())->get();
        clock($recipe_schedules);
        return $recipe_schedules;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // memo) updateじゃなくてsaveで部分的に更新した方が良い？(後で調べてみる)
        $recipe_schedule = RecipeSchedule::find($id)->update($request->all());
        // memo) 二回クエリ実行してしまっているので、下記は修正の余地あり(jsでObject.assignを使用して更新分だけストアーのデータを置換する)
        // $recipe_schedules = User::with(['recipe_schedules'])->where('id', Auth::id())->get();
        // clock($recipe_schedules);
        return $recipe_schedule;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if ($id) {
            $recipe_schedule = RecipeSchedule::where('id', $id)->delete();
            clock($recipe_schedule);
            return $recipe_schedule;
        }

        RecipeSchedule::where('user_id', Auth::id())->delete();

    }
}
