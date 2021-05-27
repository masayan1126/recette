<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipeSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipe_schedules', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id') // 「テーブル名の単数形」のスネークケース + '_id'
            // ->comment('ユーザーテーブルへの外部キー')
            // ->constrained('users') // 「複数形のテーブル名」
            // ->onDelete('cascade');

            $table->string("title")->comment('晩ごはん');
            $table->string("start")->comment('日付');
            // $table->integer("is_favorite")->comment('お気に入りレシピかどうか')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe_schedules');
    }
}
