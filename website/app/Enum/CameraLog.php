<?php

namespace App\Enum;

enum CameraLog: string
{
    case CAMERA_ONLINE = 'LOG - CAMERA ONLINE';
    case CAMERA_OFFLINE = 'LOG - CAMERA OFFLINE';
    case CAMERA_OBJECT_DETECTED = 'LOG - OBJECT DETECTED';
    case CAMERA_NO_OBJECT = 'LOG - NO OBJECT DETECTED';
    case CAMERA_ERROR = 'LOG - CAMERA ERROR';
}
