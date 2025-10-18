<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CameraLog extends Model
{
    use HasFactory;

    protected $table = 'camera_log';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'camera_id',
        'serial_log',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $log) {
            if (empty($log->{$log->getKeyName()})) {
                $log->{$log->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function camera()
    {
        return $this->belongsTo(Camera::class, 'camera_id');
    }
}
