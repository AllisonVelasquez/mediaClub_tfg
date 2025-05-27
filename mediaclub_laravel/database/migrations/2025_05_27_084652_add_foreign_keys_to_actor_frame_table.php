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
        Schema::table('actor_frame', function (Blueprint $table) {
            $table->foreign(['actor_id'], 'actor_frame_ibfk_1')->references(['actor_id'])->on('actor')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['frame_id'], 'actor_frame_ibfk_2')->references(['frame_id'])->on('frame')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('actor_frame', function (Blueprint $table) {
            $table->dropForeign('actor_frame_ibfk_1');
            $table->dropForeign('actor_frame_ibfk_2');
        });
    }
};
