<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\Application\UseCases\FriendRequest\AcceptFriendRequestUseCase;
use App\Models\Usuario;

class AcceptFriendRequestAction
{
    use ApiResponse;
    protected $acceptFriendRequestUseCase;

    public function __construct(AcceptFriendRequestUseCase $acceptFriendRequestUseCase) {
        $this->acceptFriendRequestUseCase = $acceptFriendRequestUseCase;
    }
    public function execute(Usuario $user,array $data)
    {
        //falta crear la amistad
        $request = $this->acceptFriendRequestUseCase->execute($user, $data);
        return $this->success('Solicitud de amistad aceptada', 201, $request);
    }
}
