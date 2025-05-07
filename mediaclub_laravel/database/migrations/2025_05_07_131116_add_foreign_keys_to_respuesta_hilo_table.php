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
        Schema::table('respuesta_hilo', function (Blueprint $table) {
            $table->foreign(['hilo_id'], 'respuesta_hilo_ibfk_1')->references(['hilo_id'])->on('hilo')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['usuario_id'], 'respuesta_hilo_ibfk_2')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['respuesta_a'], 'respuesta_hilo_ibfk_3')->references(['respuesta_hilo_id'])->on('respuesta_hilo')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('respuesta_hilo', function (Blueprint $table) {
            $table->dropForeign('respuesta_hilo_ibfk_1');
            $table->dropForeign('respuesta_hilo_ibfk_2');
            $table->dropForeign('respuesta_hilo_ibfk_3');
        });
    }
};
