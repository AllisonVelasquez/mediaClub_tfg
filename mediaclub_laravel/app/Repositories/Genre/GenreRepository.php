<?php

namespace App\Repositories\Genre;

use App\Models\Genero;
use Illuminate\Pagination\LengthAwarePaginator;

class GenreRepository implements GenreRepositoryInterface
{
    public function getAll(): LengthAwarePaginator 
    {
        return Genero::paginate(15);
    }
}
