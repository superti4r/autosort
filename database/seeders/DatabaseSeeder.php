<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Bachtiar Dwi Pramudi',
            'email' => 'bchtrrprmd@gmail.com',
            'password' => Hash::make('bachtiar378155'),
        ]);

        User::factory(49)->create();
    }
}
