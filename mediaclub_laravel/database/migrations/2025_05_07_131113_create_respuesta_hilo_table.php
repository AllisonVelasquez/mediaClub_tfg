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
        Schema::create('respuesta_hilo', function (Blueprint $table) {
            $table->integer('respuesta_hilo_id', true);
            $table->integer('hilo_id')->index('hilo_id');
            $table->integer('usuario_id')->index('usuario_id');
            $table->text('contenido');
            $table->dateTime('fecha');
            $table->integer('respuesta_a')->nullable()->index('respuesta_a');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respuesta_hilo');
    }
};
