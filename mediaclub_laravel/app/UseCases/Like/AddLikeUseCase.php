<?php
namespace App\UseCases\Like;


use App\Repositories\Like\LikeRepositoryInterface;
use App\Models\Usuario;

class AddLikeUseCase
{
    protected $likeRepository;

    public function __construct(LikeRepositoryInterface $likeRepository) {
        $this->likeRepository = $likeRepository;
    }
    public function execute(string $model, int $id, Usuario $me)
    {
        return $this->likeRepository->addLike(strtolower($model),$id,$me->id);
    }
}
