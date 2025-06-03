<?php

namespace App\UseCases\Post;

use App\Models\Post;
use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;
use App\Repositories\Activity\ActivityRepositoryInterface;


class CreatePostUseCase
{
    protected $postRepository;
    protected $activityRepository;


    public function __construct(PostRepositoryInterface $postRepository, ActivityRepositoryInterface $activityRepository)
    {
        $this->postRepository = $postRepository;
        $this->activityRepository = $activityRepository;
    }
    public function execute(Usuario $me, array $data): Post
    {
        $data['usuario_id'] = $me->id;

        $post = $this->postRepository->create($data);

        $this->activityRepository->registrarActividad(
            usuario: $me,
            activitable: $post,
            tipo: 'crear_post',
            descripcion: $me->alias .' creó un post',
        );

        return $post;
    }
}
