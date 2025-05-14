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
            $table->foreign(['amigo_id'], 'fk_friend')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['usuario_id'], 'fk_user')->references(['usuario_id'])->on('usuario')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('amistad', function (Blueprint $table) {
            $table->dropForeign('fk_friend');
            $table->dropForeign('fk_user');
        });
    }
};
