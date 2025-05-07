<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('frame_lista', function (Blueprint $table) {
            $table->foreign(['lista_id'], 'frame_lista_ibfk_1')->references(['lista_id'])->on('lista')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['frame_id'], 'frame_lista_ibfk_2')->references(['frame_id'])->on('frame')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('frame_lista', function (Blueprint $table) {
            $table->dropForeign('frame_lista_ibfk_1');
            $table->dropForeign('frame_lista_ibfk_2');
        });
    }
};
