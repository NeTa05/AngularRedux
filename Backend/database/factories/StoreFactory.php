<?php

use Faker\Generator;

$factory->define(App\Store::class, function (Generator $faker) {
    return [
        'name' => $faker->company,
        'address' => $faker->address
    ];
});
