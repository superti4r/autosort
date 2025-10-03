<?php

use App\Http\Enum\CameraLog;
use App\Http\Enum\MushroomGrade;
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
        Schema::create('camera_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('camera_id')->constrained('cameras')->onDelete('cascade');
            $table->string('log')->default(CameraLog::CAMERA_ONLINE->value);
            $table->string('grade')->default(MushroomGrade::UNDEFINED->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('camera_logs');
    }
};
