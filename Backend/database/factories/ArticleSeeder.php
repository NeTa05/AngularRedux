<?php

use Faker\Generator;

$factory->define(App\Article::class, function (Generator $faker) {
    return [
        'name' => $faker->word,
        'description' => $faker->word,
        'price' => $faker->randomFloat,
        'total_in_shelf' => $faker->randomFloat,
        'total_in_vault' => $faker->randomFloat,
        'store_id' => $faker->numberBetween(1, 10)
    ];
});
