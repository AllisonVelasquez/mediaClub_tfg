<?php

namespace App\Repositories\Rate;

use App\Models\Puntuacion;
use Illuminate\Pagination\LengthAwarePaginator;

class RateRepository implements RateRepositoryInterface
{
    public function getMyRates(int $userId): LengthAwarePaginator
    {
        return Puntuacion::with('frame')
            ->where('usuario_id', $userId)
            ->paginate(15);
    }

    public function addRate(array $data): Puntuacion
    {
        $exists = Puntuacion::where('usuario_id', $data['usuario_id'])
            ->where('frame_id', $data['frame_id'])
            ->exists();

        if ($exists) {
            throw new \Exception('Ya existe una puntuación para este usuario y frame. Solo se puede actualizar.',409);
        }
        return Puntuacion::create($data);
    }

    public function editRate(int $rateId, int $userId, float $newRate): bool
    {
        $rate = Puntuacion::where('usuario_id', $userId)
            ->findOrFail($rateId);
        return $rate->update(['puntuacion' => round($newRate, 1)]);
    }

    public function deleteRate(int $userId, int $rateId): bool
    {
        $lista = Puntuacion::where('id', $rateId)
            ->where('usuario_id', $userId)
            ->firstOrFail();

        return $lista->delete();
    }
}
