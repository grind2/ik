<?php

use App\Models\Character;
use App\Models\Contest;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('enemy')->default(false);
            $table->integer('defence');
            $table->integer('strength');
            $table->integer('accuracy');
            $table->integer('magic');
            $table->timestamps();

            $table->foreignIdFor(User::class)->nullable();
        });

        Schema::create('character_contest', function (Blueprint $table) {
            $table->id();
            // ->update pivot table
            $table->foreignIdFor(Character::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Contest::class)->constrained()->cascadeOnDelete();

            $table->float('hero_hp')->default(20);
            $table->float('enemy_hp')->default(20);

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
        Schema::dropIfExists('character_contest');
    }
};
