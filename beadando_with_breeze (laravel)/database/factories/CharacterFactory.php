<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Character>
 */
class CharacterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $v1 = fake()->numberBetween(0, 20);
        $v2 = fake()->numberBetween(0, 20 - $v1);
        $v3 = fake()->numberBetween(0, 20 - $v1 - $v2);

        return [
            // TODO max 20 total of props
            'name' => fake()->name(),
            'enemy' => false,
            'defence' => fake()->numberBetween(0,3),
            'strength' => $v1,
            'accuracy' => $v2,
            'magic' => $v3,
            'user_id' => User::factory()
        ];
    }
}
