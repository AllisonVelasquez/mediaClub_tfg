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
            $table->string('titulo_original')->nullable();
            $table->text('descripcion')->nullable();
            $table->date('fecha_estreno')->nullable();
            $table->string('poster_url')->nullable();
            $table->string('fondo_url')->nullable();
            $table->integer('duracion')->unsigned()->nullable();
            $table->decimal('promedio_votos_tmdb', 3, 1)->nullable();
            $table->unsignedInteger('cantidad_votos')->nullable();
            $table->decimal('popularidad', 6, 2)->nullable();
            $table->string('estado')->nullable();
            $table->bigInteger('presupuesto')->nullable();
            $table->bigInteger('ingresos')->nullable();
            $table->string('eslogan')->nullable();
            $table->string('pagina_oficial')->nullable();
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
