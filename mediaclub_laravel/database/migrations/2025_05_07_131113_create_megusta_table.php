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
        Schema::create('megusta', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('usuario_id');
            $table->unsignedBigInteger('entidad_id');
            $table->enum('tipo_entidad', ['resena', 'mensaje']);
            $table->dateTime('fecha')->useCurrent();

            $table->unique(['usuario_id', 'entidad_id', 'tipo_entidad'], 'usuario_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('megusta');
    }
};
