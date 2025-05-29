<?php
namespace App\UseCases\Genre;

use App\Repositories\Genre\GenreRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetAllGenresUseCase
{
    protected GenreRepositoryInterface $genreRepository;

    public function __construct(GenreRepositoryInterface $genreRepository)
    {
        $this->genreRepository = $genreRepository;
    }

    public function execute(): LengthAwarePaginator
    {
        return $this->genreRepository->getAll();
    }
}
