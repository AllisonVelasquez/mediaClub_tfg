<?php

namespace App\Repositories\Frame;

use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

Interface FrameRepositoryInterface
{
    public function searchByTitle(string $title): LengthAwarePaginator;
    public function getDetails(int $id);
    public function filter(array $filters): LengthAwarePaginator;
    public function getPopular(): LengthAwarePaginator;
    public function getTop10(): Collection;
    public function getNowPlaying(): LengthAwarePaginator;
    public function getSimilar(int $id): Collection;
    public function getReviews(int $id) : LengthAwarePaginator;
}
