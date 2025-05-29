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
            $table->foreign('remitente_id', 'solicitud_remitente_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign('destinatario_id', 'solicitud_destinatario_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solicitud', function (Blueprint $table) {
            $table->dropForeign('solicitud_remitente_id_fk');
            $table->dropForeign('solicitud_destinatario_id_fk');
        });
    }
};
