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
            $table->foreign('hilo_id', 'respuesta_hilo_hilo_id_fk')->references('id')->on('hilo')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign('usuario_id', 'respuesta_hilo_usuario_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign('respuesta_a', 'respuesta_hilo_respuesta_a_id_fk')->references('id')->on('respuesta_hilo')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('respuesta_hilo', function (Blueprint $table) {
            $table->dropForeign('respuesta_hilo_hilo_id_fk');
            $table->dropForeign('respuesta_hilo_usuario_id_fk');
            $table->dropForeign('respuesta_hilo_respuesta_a_id_fk');
        });
    }
};
