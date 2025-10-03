<?php

use App\Http\Enum\CameraStatus;
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
        Schema::create('cameras', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('url_stream');
            $table->string('status')->default(CameraStatus::ACTIVE->value);
            $table->foreignUuid('node_id')->constrained('nodes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cameras');
    }
};
