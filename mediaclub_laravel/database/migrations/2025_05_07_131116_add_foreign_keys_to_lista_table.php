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
        Schema::table('lista', function (Blueprint $table) {
            $table->foreign(['usuario_id'], 'lista_ibfk_1')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lista', function (Blueprint $table) {
            $table->dropForeign('lista_ibfk_1');
        });
    }
};
