<?php
namespace App\UseCases\Genre;

use App\Repositories\Genre\GenreRepositoryInterface;
use Illuminate\Support\Collection;

class GetAllGenresUseCase
{
    protected GenreRepositoryInterface $genreRepository;

    public function __construct(GenreRepositoryInterface $genreRepository)
    {
        $this->genreRepository = $genreRepository;
    }

    public function execute(): Collection
    {
        return $this->genreRepository->getAll();
    }
}
