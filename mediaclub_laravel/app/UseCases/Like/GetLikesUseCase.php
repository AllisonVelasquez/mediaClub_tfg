<?php
namespace App\UseCases\Like;


use App\Repositories\Like\LikeRepositoryInterface;

use App\Models\Usuario;

class GetLikesUseCase
{
    protected $likeRepository;

    public function __construct(LikeRepositoryInterface $likeRepository) {
        $this->likeRepository = $likeRepository;
    }
    public function execute(string $model, int $id,Usuario $user)
    {
        return $this->likeRepository->getLikes(strtolower($model),$id, $user->id);
    }
}
