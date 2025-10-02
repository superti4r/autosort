<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Enum\CameraLog as CameraLogEnum;
use App\Enum\MushroomGrade;

class CameraLog extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     * @var list<string>
     */
    protected $fillable = [
        'camera_id',
        'log',
        'grade',
    ];

    /**
     * The attributes that should be cast.
     * @var array<string,string>
     */
    protected $casts = [
        'log' => CameraLogEnum::class,
        'grade' => MushroomGrade::class,
    ];

    protected static function booted(): void
    {
        static::creating(function ($model) {
            if (! $model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function camera()
    {
        return $this->belongsTo(Camera::class);
    }

    public function mushroomSorteds()
    {
        return $this->hasMany(MushroomSorted::class);
    }
}
