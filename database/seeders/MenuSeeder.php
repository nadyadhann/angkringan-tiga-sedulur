<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('menu')->truncate();

        DB::table('menu')->insert([
            // ======================
            // MAKANAN
            // ======================
            ['nama_menu'=>'Nasi Kucing','kategori'=>'Makanan','harga_jual'=>3000,'stok'=>0],
            ['nama_menu'=>'Gorengan','kategori'=>'Makanan','harga_jual'=>1000,'stok'=>0],
            ['nama_menu'=>'Ati/Ampela','kategori'=>'Makanan','harga_jual'=>2000,'stok'=>0],
            ['nama_menu'=>'Usus','kategori'=>'Makanan','harga_jual'=>2000,'stok'=>0],
            ['nama_menu'=>'Kulit','kategori'=>'Makanan','harga_jual'=>2000,'stok'=>0],
            ['nama_menu'=>'Telur Puyuh','kategori'=>'Makanan','harga_jual'=>3000,'stok'=>0],
            ['nama_menu'=>'Kepala Ayam','kategori'=>'Makanan','harga_jual'=>6000,'stok'=>0],
            ['nama_menu'=>'Sayap','kategori'=>'Makanan','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Bakso','kategori'=>'Makanan','harga_jual'=>3000,'stok'=>0],
            ['nama_menu'=>'Kornet','kategori'=>'Makanan','harga_jual'=>5000,'stok'=>0],
            ['nama_menu'=>'Fishroll','kategori'=>'Makanan','harga_jual'=>4000,'stok'=>0],
            ['nama_menu'=>'Dumpling','kategori'=>'Makanan','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Sosis Kecil','kategori'=>'Makanan','harga_jual'=>3000,'stok'=>0],
            ['nama_menu'=>'Sosis Besar','kategori'=>'Makanan','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Scallop','kategori'=>'Makanan','harga_jual'=>5000,'stok'=>0],
            ['nama_menu'=>'Cikua','kategori'=>'Makanan','harga_jual'=>3000,'stok'=>0],
            ['nama_menu'=>'Otak-Otak','kategori'=>'Makanan','harga_jual'=>3000,'stok'=>0],

            // ======================
            // MINUMAN
            // ======================
            ['nama_menu'=>'Teh Tawar','kategori'=>'Minuman','harga_jual'=>2000,'stok'=>0],
            ['nama_menu'=>'Es Teh Manis','kategori'=>'Minuman','harga_jual'=>4000,'stok'=>0],
            ['nama_menu'=>'Teh Manis Hangat','kategori'=>'Minuman','harga_jual'=>3000,'stok'=>0],
            ['nama_menu'=>'Jeruk Peras','kategori'=>'Minuman','harga_jual'=>6000,'stok'=>0],
            ['nama_menu'=>'Nutrisari','kategori'=>'Minuman','harga_jual'=>5000,'stok'=>0],
            ['nama_menu'=>'Teh Tarik','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Good Day','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Kapal Api','kategori'=>'Minuman','harga_jual'=>5000,'stok'=>0],
            ['nama_menu'=>'ABC Kopi Susu','kategori'=>'Minuman','harga_jual'=>5000,'stok'=>0],
            ['nama_menu'=>'ABC Klepon','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Indocafe','kategori'=>'Minuman','harga_jual'=>4000,'stok'=>0],
            ['nama_menu'=>'Luwak White Koffie','kategori'=>'Minuman','harga_jual'=>4000,'stok'=>0],
            ['nama_menu'=>'Ovaltine','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Chocolatos','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Milo','kategori'=>'Minuman','harga_jual'=>6000,'stok'=>0],
            ['nama_menu'=>'Beng-Beng','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Frisian Flag Panas','kategori'=>'Minuman','harga_jual'=>4000,'stok'=>0],
            ['nama_menu'=>'Frisian Flag Dingin','kategori'=>'Minuman','harga_jual'=>6000,'stok'=>0],
            ['nama_menu'=>'Susu Jahe','kategori'=>'Minuman','harga_jual'=>7000,'stok'=>0],
            ['nama_menu'=>'Jahe Murni','kategori'=>'Minuman','harga_jual'=>5000,'stok'=>0],
        ]);
    }
}
