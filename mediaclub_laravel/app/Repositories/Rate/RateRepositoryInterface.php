<?php

namespace App\Repositories\Rate;

use App\Models\Puntuacion;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface RateRepositoryInterface
{
    public function getMyRates(int $userId): LengthAwarePaginator;
    public function addRate(array $data): Puntuacion;
    public function editRate(int $rateId, int $userId, float $rate): bool;
    public function deleteRate(int $userId, int $rateId): bool;
    public function getRateAverage(int $frameId): float;
}
