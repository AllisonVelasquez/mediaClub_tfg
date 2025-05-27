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
        Schema::create('resena', function (Blueprint $table) {
            $table->integer('resena_id', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->unsignedBigInteger('frame_id')->index('frame_id');
            $table->dateTime('fecha')->nullable()->useCurrent();
            $table->text('contenido');
            $table->boolean('spoiler')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resena');
    }
};
