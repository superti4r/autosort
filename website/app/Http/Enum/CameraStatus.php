<?php

namespace App\Http\Enum;

enum CameraStatus: string
{
    case INITIALIZING = 'INITIALIZING';
    case NOT_CONNECTED = 'NOT_CONNECTED';
    case ACTIVE = 'ACTIVE';
    case INACTIVE = 'INACTIVE';
}
