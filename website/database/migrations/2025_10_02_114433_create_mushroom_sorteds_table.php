<?php

use App\Enum\MushroomGrade;
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
        Schema::create('mushroom_sorteds', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('camera_log_id')->constrained('camera_logs')->onDelete('cascade');
            $table->string('grade')->default(MushroomGrade::UNDEFINED->value);
            $table->integer('count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mushroom_sorteds');
    }
};
