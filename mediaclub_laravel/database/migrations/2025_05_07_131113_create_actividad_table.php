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
        Schema::create('actividad', function (Blueprint $table) {
            $table->integer('actividad_id', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->unsignedBigInteger('frame_id')->index('frame_id');
            $table->dateTime('fecha');
            $table->enum('tipo', ['pendiente', 'en_curso', 'visto', 'resenar', 'megusta']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actividad');
    }
};
