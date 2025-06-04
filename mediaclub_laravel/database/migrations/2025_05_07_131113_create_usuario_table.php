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
        Schema::create('usuario', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('login_id', 100)->unique('login_id');
            $table->string('correo')->unique('correo');
            $table->string('contrasena');
            $table->string('alias', 100)->unique('alias');
            $table->text('bio')->nullable();
            $table->json('redes')->nullable();
            $table->string('foto_perfil')->default('/images/perfiles/default.png'); //Hay que cambiar la ruta por defecto
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario');
    }
};
