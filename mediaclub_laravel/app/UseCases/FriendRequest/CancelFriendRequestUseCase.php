<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;

class CancelFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository)
    {
        $this->requestRepository = $requestRepository;
    }

    public function execute(Usuario $me, Usuario $to)
    {
        return $this->requestRepository->cancelRequest($me->id, $to->id);
    }
}
