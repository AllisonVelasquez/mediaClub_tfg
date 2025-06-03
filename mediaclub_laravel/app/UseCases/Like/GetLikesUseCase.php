<?php
namespace App\UseCases\Like;


use App\Repositories\Like\LikeRepositoryInterface;
use App\Models\Frame;

class GetLikesUseCase
{
    protected $likeRepository;

    public function __construct(LikeRepositoryInterface $likeRepository) {
        $this->likeRepository = $likeRepository;
    }
    public function execute(string $model, int $id)
    {
        return $this->likeRepository->getLikes(strtolower($model),$id);
    }
}
