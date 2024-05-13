<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'enemy',
        'defence',
        'strength',
        'accuracy',
        'magic',
        'user_id'
    ];

    public function contests(): BelongsToMany
    {
        return $this->belongsToMany(Contest::class)->withPivot('hero_hp')->withPivot('enemy_hp')->withPivot('id');
    }
}
