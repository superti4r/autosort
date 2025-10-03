<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        $quotes = [
            ['message' => 'Habis gelap terbitlah terang.', 'author' => 'Raden Adjeng Kartini'],
            ['message' => 'Bangsa yang besar adalah bangsa yang menghormati jasa pahlawannya.', 'author' => 'Ir. Soekarno'],
            ['message' => 'Jangan sekali-kali meninggalkan sejarah.', 'author' => 'Ir. Soekarno'],
            ['message' => 'Setiap orang menjadi guru, setiap rumah menjadi sekolah.', 'author' => 'Ki Hajar Dewantara'],
            ['message' => 'Tak ada kemerdekaan tanpa pengorbanan.', 'author' => 'Mohammad Hatta'],
            ['message' => 'Cinta tanah air adalah sebagian dari iman.', 'author' => 'KH. Hasyim Asy’ari'],
            ['message' => 'Kesaktian Pancasila bukan sekedar kata-kata, tetapi pedoman hidup bangsa.', 'author' => 'Soepomo'],
        ];

        $quote = $quotes[array_rand($quotes)];

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => $quote,
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
