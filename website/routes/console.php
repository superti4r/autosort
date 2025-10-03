<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $quotes = [
        ['message' => 'Habis gelap terbitlah terang.', 'author' => 'Raden Adjeng Kartini'],
        ['message' => 'Bangsa yang besar adalah bangsa yang menghormati jasa pahlawannya.', 'author' => 'Ir. Soekarno'],
        ['message' => 'Jangan sekali-kali meninggalkan sejarah.', 'author' => 'Ir. Soekarno'],
        ['message' => 'Setiap orang menjadi guru, setiap rumah menjadi sekolah.', 'author' => 'Ki Hajar Dewantara'],
        ['message' => 'Tak ada kemerdekaan tanpa pengorbanan.', 'author' => 'Mohammad Hatta'],
        ['message' => 'Cinta tanah air adalah sebagian dari iman.', 'author' => 'KH. Hasyim Asy’ari'],
    ];

    $quote = $quotes[array_rand($quotes)];

    $this->newLine();
    $this->line('“' . $quote['message'] . '”');
    $this->comment($quote['author']);
    $this->newLine();
})->purpose('Display an inspiring quote');
