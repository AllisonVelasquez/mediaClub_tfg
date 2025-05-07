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
        Schema::create('puntuacion', function (Blueprint $table) {
            $table->integer('puntuacion_id', true);
            $table->integer('usuario_id');
            $table->integer('frame_id')->index('frame_id');
            $table->decimal('puntuacion', 3, 1);
            $table->dateTime('fecha')->nullable()->useCurrent();

            $table->unique(['usuario_id', 'frame_id'], 'usuario_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puntuacion');
    }
};
