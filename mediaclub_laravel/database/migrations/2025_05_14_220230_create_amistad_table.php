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
        Schema::create('amistad', function (Blueprint $table) {
            $table->integer('usuario_id');
            $table->integer('amigo_id')->index('fk_friend');

            $table->primary(['usuario_id', 'amigo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amistad');
    }
};
