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
        Schema::table('actividad', function (Blueprint $table) {
            $table->foreign('usuario_id', 'actividad_usuario_id_fk')->references('id')->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign('frame_id', 'actividad_frame_id_fk')->references('id')->on('frame')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('actividad', function (Blueprint $table) {
            $table->dropForeign('actividad_usuario_id_fk');
            $table->dropForeign('actividad_frame_id_fk');
        });
    }
};
