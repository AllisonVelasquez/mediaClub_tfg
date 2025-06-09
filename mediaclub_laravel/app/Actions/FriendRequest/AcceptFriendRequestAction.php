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
        $frequest =$this->acceptFriendRequestUseCase->execute($me, $from);
        if(!$frequest) return $this->error('No se ha podido aceptar la solicitud', 400);
        return $this->success('Solicitud de amistad aceptada', 201, $frequest);
    }
}
