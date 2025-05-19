<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\Application\UseCases\FriendRequest\CancelFriendRequestUseCase;
use App\Models\Usuario;

class CancelFriendRequestAction
{
    use ApiResponse;
    protected $cancelFriendRequestUseCase;

    public function __construct(CancelFriendRequestUseCase $cancelFriendRequestUseCase) {
        $this->cancelFriendRequestUseCase = $cancelFriendRequestUseCase;
    }
    public function execute(Usuario $user,array $data)
    {
        //falta crear la amistad
        $request = $this->cancelFriendRequestUseCase->execute($user, $data);
        return $this->success('Solicitud de amistad cancelada', 200, $request);
    }
}
