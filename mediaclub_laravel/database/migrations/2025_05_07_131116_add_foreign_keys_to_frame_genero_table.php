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
        Schema::table('frame_genero', function (Blueprint $table) {
            $table->foreign(['frame_id'], 'frame_genero_ibfk_1')->references(['frame_id'])->on('frame')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['genero_id'], 'frame_genero_ibfk_2')->references(['genero_id'])->on('genero')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('frame_genero', function (Blueprint $table) {
            $table->dropForeign('frame_genero_ibfk_1');
            $table->dropForeign('frame_genero_ibfk_2');
        });
    }
};
