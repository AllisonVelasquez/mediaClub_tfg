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
        Schema::table('respuesta_post', function (Blueprint $table) {
            $table->foreign('post_id', 'respuesta_post_post_id_fk')->references('id')->on('post')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign('usuario_id', 'respuesta_post_usuario_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign('respuesta_a', 'respuesta_post_respuesta_a_id_fk')->references('id')->on('respuesta_post')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('respuesta_post', function (Blueprint $table) {
            $table->dropForeign('respuesta_post_post_id_fk');
            $table->dropForeign('respuesta_post_usuario_id_fk');
            $table->dropForeign('respuesta_post_respuesta_a_id_fk');
        });
    }
};
