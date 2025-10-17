<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserManageController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('user-manage');
    }
}
