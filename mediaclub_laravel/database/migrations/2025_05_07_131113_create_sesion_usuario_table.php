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
        Schema::create('sesion_usuario', function (Blueprint $table) {
            $table->integer('sesion_usuario_id', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->dateTime('fecha_inicio')->nullable()->useCurrent();
            $table->dateTime('fecha_fin')->nullable();
            $table->string('token');
            $table->string('navegador')->nullable();
            $table->boolean('activa')->nullable()->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesion_usuario');
    }
};
