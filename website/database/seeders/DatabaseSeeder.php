<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'user@mail.com'],
            [
                'id' => Str::uuid(),
                'name' => 'Bachtiar Dwi Pramudi',
                'password' => Hash::make('123123'),
                'email_verified_at' => now(),
            ]
        );
    }
}
