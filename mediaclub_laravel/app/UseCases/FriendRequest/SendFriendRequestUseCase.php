<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;

class SendFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository)
    {
        $this->requestRepository = $requestRepository;
    }

    public function execute(Usuario $from, Usuario $to)
    {
        return $this->requestRepository->createRequest($from->id,$to->id);
    }
}

