<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransaksiController extends Controller
{
    // GET /api/transaksi
    public function index()
    {
        $data = DB::table('transaksi')
            ->orderBy('tanggal', 'desc')
            ->get();

        return response()->json($data);
    }

    // POST /api/transaksi
    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'tipe' => 'required|in:income,expense',
            'jumlah' => 'required|numeric|min:1',
            'deskripsi' => 'nullable|string'
        ]);


        DB::table('transaksi')->insert([
            'tanggal' => $request->tanggal,
            'tipe' => $request->tipe,
            'deskripsi' => $request->deskripsi,
            'jumlah' => $request->jumlah,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Transaksi berhasil disimpan'
        ], 201);
    }

    // DELETE /api/transaksi/{id}
    public function destroy($id)
    {
        DB::table('transaksi')->where('id_transaksi', $id)->delete();

        return response()->json([
            'message' => 'Transaksi berhasil dihapus'
        ]);
    }
}
