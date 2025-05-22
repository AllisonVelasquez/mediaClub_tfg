<?php

namespace App\UseCases\FriendRequest;

use App\Models\Usuario;
use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Repositories\Friendship\FriendshipRepositoryInterface;

class AcceptFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;
    protected FriendshipRepositoryInterface $friendshipRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository,FriendshipRepositoryInterface $friendshipRepository)
    {
        $this->requestRepository = $requestRepository;
        $this->friendshipRepository = $friendshipRepository;
    }

    public function execute(Usuario $me, Usuario $from)
    {
        if($this->requestRepository->acceptRequest($me->usuario_id, $from->usuario_id)){
            $this->friendshipRepository->create($me->usuario_id,$from->usuario_id);
        }
        return true;
    }
}
