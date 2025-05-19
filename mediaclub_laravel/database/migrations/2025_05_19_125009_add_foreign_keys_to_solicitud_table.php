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
        Schema::table('solicitud', function (Blueprint $table) {
            $table->foreign(['remitente_id'], 'solicitud_ibfk_1')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['destinatario_id'], 'solicitud_ibfk_2')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solicitud', function (Blueprint $table) {
            $table->dropForeign('solicitud_ibfk_1');
            $table->dropForeign('solicitud_ibfk_2');
        });
    }
};
