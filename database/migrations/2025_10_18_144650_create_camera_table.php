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
        Schema::create('camera', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('device_id')->unique();
            $table->string('ip_address')->nullable();
            $table->string('status')->default(CameraStatus::OFFLINE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('camera');
    }
};
