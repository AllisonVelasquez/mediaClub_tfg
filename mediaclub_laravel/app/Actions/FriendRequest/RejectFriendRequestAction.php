<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\UseCases\FriendRequest\RejectFriendRequestUseCase;
use App\Models\Usuario;

class RejectFriendRequestAction
{
    use ApiResponse;
    protected $rejectFriendRequestUseCase;

    public function __construct(RejectFriendRequestUseCase $rejectFriendRequestUseCase) {
        $this->rejectFriendRequestUseCase = $rejectFriendRequestUseCase;
    }
    public function execute(Usuario $user,array $data)
    {
        $request = $this->rejectFriendRequestUseCase->execute($user, $data);
        return $this->success('Solicitud de amistad rechazada', 200, $request);
    }
}
