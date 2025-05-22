<?php
namespace App\UseCases\Friendship;

use App\Repositories\Friendship\FriendshipRepositoryInterface;
use App\Models\Usuario;

class DeleteFriendUseCase
{
    protected $friendshipRepository;

    public function __construct( FriendshipRepositoryInterface $friendshipRepository)
    {
        $this->friendshipRepository = $friendshipRepository;
    }

    public function execute(Usuario $user, Usuario $friend): bool
    {
        $userid = $user->usuario_id;
        $friendid = $friend->usuario_id;
        $this->friendshipRepository->delete($userid, $friendid);
        return true;
    }
}

