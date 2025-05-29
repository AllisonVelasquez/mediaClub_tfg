<?php

namespace App\Repositories\Genre;


use Illuminate\Pagination\LengthAwarePaginator;

interface GenreRepositoryInterface
{
    public function getAll() : LengthAwarePaginator ;
}