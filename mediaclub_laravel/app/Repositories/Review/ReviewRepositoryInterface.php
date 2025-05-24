<?php

namespace App\Repositories\Review;

use App\Models\Resena;
use Illuminate\Database\Eloquent\Collection;

interface ReviewRepositoryInterface
{
    public function getReviewsByUser(int $userId):Collection;
    public function getReview(int $resenaId):Resena;
    public function addReview(array $data):Resena;
    public function deleteReview(int $userId, int $resenaId):bool;
    public function getMyReviewsByFrame(int $userId, int $frameId):Collection;
    public function getReviewsByFrame(int $frameId):Collection;

}

