<?php

namespace App\Repositories\Review;

use App\Models\Resena;
use Illuminate\Database\Eloquent\Collection;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function getReviewsByUser(int $userId):Collection
    {
        return Resena::where('usuario_id', $userId)
            ->orderBy('fecha', 'desc')
            ->get();
    }

    public function getReview(int $resenaId):Resena
    {
        return Resena::with(['frame:frame_id,titulo'])->findOrFail($resenaId);
    }

    public function addReview(array $data): Resena
    {
        return Resena::create($data);
    }

    public function deleteReview(int $userId, int $resenaId):bool
    {
        $lista = Resena::where('resena_id', $resenaId)
            ->where('usuario_id', $userId)
            ->firstOrFail();

        return $lista->delete();
    }

    public function getMyReviewsByFrame(int $userId, int $frameId):Collection
    {
        return Resena::where('usuario_id', $userId)
            ->where('frame_id', $frameId)
            ->orderBy('fecha', 'desc')
            ->get();
    }

    public function getReviewsByFrame(int $frameId): Collection
    {
        return Resena::where('frame_id', $frameId)
            ->orderBy('fecha', 'desc')
            ->get();
    }
}
