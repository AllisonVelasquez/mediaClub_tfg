<?php

namespace App\Repositories\Review;

use App\Models\Resena;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface ReviewRepositoryInterface
{
    public function getReviewsByUser(int $userId): LengthAwarePaginator;
    public function getReview(int $resenaId):Resena;
    public function addReview(array $data):Resena;
    public function deleteReview(int $userId, int $resenaId):bool;
    public function getMyReviewsByFrame(int $userId, int $frameId):Collection;
}

