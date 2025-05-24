<?php

namespace App\Repositories\Rate;

use App\Models\Puntuacion;
use Illuminate\Database\Eloquent\Collection;

interface RateRepositoryInterface
{
    public function getReviewsByUser(int $userId):Collection;
    public function getReview(int $resenaId):Puntuacion;
    public function addReview(array $data):Puntuacion;
    public function deleteReview(int $userId, int $resenaId):bool;
    public function getMyReviewsByFrame(int $userId, int $frameId):Collection;
    public function getReviewsByFrame(int $frameId):Collection;

}

