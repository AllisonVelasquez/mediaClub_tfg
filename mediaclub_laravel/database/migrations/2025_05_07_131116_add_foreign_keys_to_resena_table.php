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
        Schema::table('resena', function (Blueprint $table) {
            $table->foreign(['usuario_id'], 'resena_ibfk_1')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['frame_id'], 'resena_ibfk_2')->references(['frame_id'])->on('frame')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resena', function (Blueprint $table) {
            $table->dropForeign('resena_ibfk_1');
            $table->dropForeign('resena_ibfk_2');
        });
    }
};
