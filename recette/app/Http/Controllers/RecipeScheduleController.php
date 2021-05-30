<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RecipeSchedule;


class RecipeScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $recipeSchedule = RecipeSchedule::all();
        clock($recipeSchedule);
        return $recipeSchedule;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $arr=[];
        foreach ($request->all() as $request){
            $recipe_schedules = RecipeSchedule::create(
                $request
            );
            // clock($recipe_schedules);
            // return $recipe_schedules;

        }
        //
        // RecipeSchedule::create([
        //     'date' => $request->data->date,
        //     'user_id' => Auth::id(),
        //     'dinner' => $request->data->dinner,
        // ]);
        // dd($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        RecipeSchedule::find($request->id)->update($request->all());;
        // where('user_id', '==', $request->user_id)  // memo) user_idを条件に後でたす;
        // clock($update_target);
        // $update_target->fill($request->all());
        // $update_target->save();

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
    }
}
