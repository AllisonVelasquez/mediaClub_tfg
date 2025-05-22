<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\UseCases\FriendRequest\CancelFriendRequestUseCase;
use App\Models\Usuario;

class CancelFriendRequestAction
{
    use ApiResponse;
    protected $cancelFriendRequestUseCase;

    public function __construct(CancelFriendRequestUseCase $cancelFriendRequestUseCase) {
        $this->cancelFriendRequestUseCase = $cancelFriendRequestUseCase;
    }
    public function execute(Usuario $user,Usuario $to)
    {
        $request = $this->cancelFriendRequestUseCase->execute($user, $to);
        return $this->success('Solicitud de amistad cancelada', 200, $request);
    }
}
