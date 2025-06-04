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
        Schema::table('amistad', function (Blueprint $table) {
            $table->foreign('amigo_id', 'amistad_amigo_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign('usuario_id', 'amistad_usuario_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('amistad', function (Blueprint $table) {
            $table->dropForeign('amistad_amigo_id_fk');
            $table->dropForeign('amistad_usuario_id_fk');
        });
    }
};
