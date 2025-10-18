<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Http\Enum\CameraStatus;

class Camera extends Model
{
    use HasFactory;
    
    protected $table = 'camera';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'device_id',
        'ip_address',
        'status',
    ];

    protected $casts = [
        'status' => CameraStatus::class,
    ];

    protected static function booted(): void
    {
        static::creating(function (self $camera) {
            if (empty($camera->{$camera->getKeyName()})) {
                $camera->{$camera->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function logs()
    {
        return $this->hasMany(CameraLog::class, 'camera_id');
    }
}
