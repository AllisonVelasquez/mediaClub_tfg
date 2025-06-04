<?php

namespace App\Repositories\Review;

use App\Models\Resena;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function getReviewsByUser(int $userId): LengthAwarePaginator
    {
        return Resena::with('frame')
            ->where('usuario_id', $userId)
            ->orderBy('fecha', 'desc')
            ->paginate(15);
    }

    public function getReview(int $resenaId):Resena
    {
        return Resena::with('frame')->findOrFail($resenaId);
    }

    public function addReview(array $data): Resena
    {
        return Resena::create($data);
    }

    public function deleteReview(int $userId, int $resenaId):bool
    {
        $lista = Resena::where('id', $resenaId)
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

}
