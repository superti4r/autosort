<?php

namespace App\Http\Enum;

enum CameraStatus: string
{
    case ONLINE = 'ONLINE';
    case OFFLINE = 'OFFLINE';
    case ERROR = 'ERROR';
}
