<?php

namespace App\Enum;

enum UserRole: string
{
    case ADMINISTRATOR = 'ADMINISTRATOR';
    case DEVELOPER = 'DEVELOPER';
    case PEGAWAI = 'PEGAWAI';
}
