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
        Schema::create('frame_genero', function (Blueprint $table) {
            $table->unsignedBigInteger('frame_id')->index('frame_id');
            $table->unsignedBigInteger('genero_id')->index('genero_id');

            $table->primary(['frame_id', 'genero_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('frame_genero');
    }
};
