<?php

namespace App\Repositories\Frame;

use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

Interface FrameRepositoryInterface
{
    public function searchByTitle(string $title): LengthAwarePaginator;
    public function getDetails(int $id);
    public function filter(array $filters): LengthAwarePaginator;
    public function getPopular(): LengthAwarePaginator;
    public function getTop10(): Collection;
    public function getNowPlaying(): LengthAwarePaginator;
    public function getSimilar(int $id): Collection;
    //se invoca en el use case para actualizar la puntuacion nuestra
    public function updateMuvisAverageRate(int $frameId, array $avgRates): bool;
   
}
