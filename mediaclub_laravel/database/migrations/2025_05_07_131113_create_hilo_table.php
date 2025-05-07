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
        Schema::create('hilo', function (Blueprint $table) {
            $table->integer('hilo_id', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->integer('frame_id')->index('frame_id');
            $table->string('titulo');
            $table->text('contenido');
            $table->dateTime('fecha_creacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hilo');
    }
};
