<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Contest extends Model
{
    use HasFactory;

    protected $fillable = [
        'win',
        'history',
        'user_id'
    ];

    public function characters(): BelongsToMany
    {
        return $this->belongsToMany(Character::class);
    }

}
