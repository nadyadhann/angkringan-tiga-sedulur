<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /**
         * =========================
         * 1. SEED USER ADMIN
         * =========================
         * (dipakai login API)
         */
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'admin',
                'email' => 'null',
                'password' => bcrypt('123'),
            ]
        );

        /**
         * =========================
         * 2. SEED MASTER MENU
         * =========================
         */
        $this->call(MenuSeeder::class);
    }
}
