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
        Schema::create('frame', function (Blueprint $table) {
            $table->unsignedBigInteger('frame_id')->primary();
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->enum('tipo_contenido', ['pelicula', 'serie']);
            $table->date('fecha_lanzamiento')->nullable();
            $table->integer('duracion')->nullable();
            $table->integer('numero_episodios')->nullable();
            $table->string('poster_url')->nullable();
            $table->json('puntuacion_dbs')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('frame');
    }
};
