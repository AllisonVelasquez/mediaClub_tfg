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
        Schema::create('lista', function (Blueprint $table) {
            $table->integer('lista_id', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->string('nombre_lista');
            $table->dateTime('fecha_creacion')->nullable()->useCurrent();
            $table->boolean('publica')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lista');
    }
};
