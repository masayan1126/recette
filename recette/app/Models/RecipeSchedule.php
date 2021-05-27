<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'start','title'
    ];

    public function recipe_schedule()
    {
        return $this->belongsTo(User::class);
    }
}
