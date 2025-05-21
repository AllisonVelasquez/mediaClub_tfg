<?php
namespace App\UseCases\Friendship;

use App\Repositories\Friendship\FriendshipRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;


class DeleteFriendUseCase
{
    protected $friendshipRepository;
    protected $userRepository;

    public function __construct( UserRepositoryInterface $userRepository,FriendshipRepositoryInterface $friendshipRepository)
    {
        $this->userRepository = $userRepository;
        $this->friendshipRepository = $friendshipRepository;
    }

    public function execute(int $userId, string $friendalias): bool
    {
        $friendid= $this->userRepository->findByAlias($friendalias)->usuario_id;
        $this->friendshipRepository->delete($userId, $friendid);
        return true;
    }
}

