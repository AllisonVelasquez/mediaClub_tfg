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
        Schema::create('solicitud', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('remitente_id')->index('remitente_id');
            $table->integer('destinatario_id')->index('destinatario_id');
            $table->enum('estado', ['pendiente', 'aceptada', 'rechazada'])->default('pendiente');
            $table->dateTime('fecha_solicitud')->nullable()->useCurrent();

            $table->unique(['remitente_id', 'destinatario_id'], 'unique_solicitud');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitud');
    }
};
