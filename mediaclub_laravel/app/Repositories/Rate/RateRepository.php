<?php

namespace App\Repositories\Rate;

use App\Models\Puntuacion;
use Illuminate\Database\Eloquent\Collection;

class RateRepository implements RateRepositoryInterface
{
    public function getMyRates(int $userId): Collection
    {
        return Puntuacion::with(['frame:titulo,poster_url'])
            ->where('user_id', $userId)
            ->get(['frame_id','puntuacion','fecha']);
    }

    public function addRate(array $data): Puntuacion
    {
        return Puntuacion::create($data);
    }

    public function editRate(int $rateId, int $userId, float $rate): bool
    {
        $rate = Puntuacion::where('usuario_id',$userId)
        ->findOrFail($rateId);
        return $rate->update(['puntuacion' => round($rate,1)]);
    }

    public function deleteRate(int $userId, int $rateId): bool
    {
        $lista = Puntuacion::where('puntuacion_id', $rateId)
            ->where('usuario_id', $userId)
            ->firstOrFail();

        return $lista->delete();
    }

    public function getRateAverage(int $frameId): float
    {
        $avg = Puntuacion::where('frame_id', $frameId)->avg('rate_value');
        return round($avg,1);
    }
}
