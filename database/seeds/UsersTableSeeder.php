<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 50)->create();

        \App\User::create([
            'name' => 'Phil Collins',
            'email' => 'phil@pcollins.tech',
            'password' => bcrypt('123456789'),
            'is_admin' => true,
            'remember_token' => Str::random(10),
        ]);
    }
}
