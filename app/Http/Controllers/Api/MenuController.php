<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    // GET /api/menu
    public function index()
    {
        return DB::table('menu')
            ->select('nama_menu', 'kategori', 'harga_jual', 'stok')
            ->orderBy('id_menu')
            ->get();
    }

    // POST /api/menu/update-stok
    public function setStok(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'stok' => 'required|integer|min:0'
        ]);

        \DB::table('menu')
            ->where('nama_menu', $request->nama)
            ->update([
                'stok' => $request->stok,
                'updated_at' => now()
            ]);

        return response()->json(['status' => 'stok set']);
    }
    public function decreaseStok(Request $request)
{
    $items = $request->json()->all();

    if (!is_array($items)) {
        return response()->json(['message' => 'Invalid payload'], 400);
    }

    foreach ($items as $item) {
        if (!isset($item['nama'], $item['qty'])) continue;

        DB::table('menu')
            ->where('nama_menu', $item['nama'])
            ->decrement('stok', (int) $item['qty'], [
                'updated_at' => now()
            ]);
    }

    return response()->json(['status' => 'stok decreased']);
}


    // GET /api/menu/last-update
    public function lastUpdate()
    {
        $last = DB::table('menu')->max('updated_at');

        return response()->json([
            'last_update' => $last
        ]);
    }
}
