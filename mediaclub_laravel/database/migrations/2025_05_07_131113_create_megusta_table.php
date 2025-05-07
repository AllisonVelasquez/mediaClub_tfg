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
            $table->integer('megusta_id', true);
            $table->integer('usuario_id');
            $table->integer('entidad_id');
            $table->enum('tipo_entidad', ['resena', 'mensaje']);
            $table->dateTime('fecha')->nullable()->useCurrent();

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
