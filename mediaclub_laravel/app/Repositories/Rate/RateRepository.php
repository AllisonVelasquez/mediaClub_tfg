<?php

namespace App\Repositories\Rate;

use App\Models\Puntuacion;
use Illuminate\Pagination\LengthAwarePaginator;

class RateRepository implements RateRepositoryInterface
{
    public function getMyRates(int $userId): LengthAwarePaginator
    {
        return Puntuacion::with('frame')
            ->where('user_id', $userId)
            ->paginate(15);
    }

    public function addRate(array $data): Puntuacion
    {
        return Puntuacion::create($data);
    }

    public function editRate(int $rateId, int $userId, float $rate): bool
    {
        $rate = Puntuacion::where('usuario_id', $userId)
            ->findOrFail($rateId);
        return $rate->update(['puntuacion' => round($rate, 1)]);
    }

    public function deleteRate(int $userId, int $rateId): bool
    {
        $lista = Puntuacion::where('id', $rateId)
            ->where('usuario_id', $userId)
            ->firstOrFail();

        return $lista->delete();
    }

    //Incorporar los datos a cada peli
    public function getRateAverageMuvis(int $frameId): array
    {
        $result = Puntuacion::where('frame_id', $frameId)
            ->selectRaw('AVG(puntuacion) as average, COUNT(*) as votes')
            ->first();

        return [
            'average' => round($result->average, 1),
            'votes' => $result->votes ?? 0,
        ];
    }
}
