<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;

class RejectFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository)
    {
        $this->requestRepository = $requestRepository;
    }

    public function execute(Usuario $me, Usuario $from)
    {
        return $this->requestRepository->rejectRequest($me->usuario_id, $from->usuario_id);
    }
}
