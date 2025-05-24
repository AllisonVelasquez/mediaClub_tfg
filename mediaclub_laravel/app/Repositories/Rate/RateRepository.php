<?php

namespace App\Repositories\Rate;

use App\Models\Puntuacion;
use Illuminate\Database\Eloquent\Collection;

class RateRepository
{
    public function getMyRates(int $userId): Collection
    {
        return Puntuacion::where('user_id', $userId)->get();
    }

    public function addRate(array $data): Puntuacion
    {
        return Puntuacion::create($data);
    }

    public function editPuntuacion(int $rateId, array $data): bool
    {
        $rate = Puntuacion::find($rateId);
        return $rate->update($data);
    }

    public function deletePuntuacion(int $userId, int $rateId): bool
    {
        $lista = Puntuacion::where('puntuacion_id', $rateId)
            ->where('usuario_id', $userId)
            ->firstOrFail();

        return $lista->delete();
    }

    public function getPuntuacionAverage(int $frameId): float
    {
        return (float) Puntuacion::where('frame_id', $frameId)->avg('rate_value');
    }
}
