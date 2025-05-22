<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\UseCases\FriendRequest\AcceptFriendRequestUseCase;
use App\Models\Usuario;

class AcceptFriendRequestAction
{
    use ApiResponse;
    protected $acceptFriendRequestUseCase;

    public function __construct(AcceptFriendRequestUseCase $acceptFriendRequestUseCase) {
        $this->acceptFriendRequestUseCase = $acceptFriendRequestUseCase;
    }
    public function execute(Usuario $me,Usuario $from)
    {
        $this->acceptFriendRequestUseCase->execute($me, $from);
        return $this->success('Solicitud de amistad aceptada', 201);
    }
}
