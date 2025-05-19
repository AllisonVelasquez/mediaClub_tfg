<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\Application\UseCases\FriendRequest\SendFriendRequestUseCase;
use App\Models\Usuario;

class SendFriendRequestAction
{
    use ApiResponse;
    protected $sendRequestUseCase;

    public function __construct(SendFriendRequestUseCase $sendRequestUseCase) {
        $this->sendRequestUseCase = $sendRequestUseCase;
    }
    public function execute(Usuario $user,array $data)
    {
        $request = $this->sendRequestUseCase->execute($user, $data);
        return $this->success('Solicitud de amistad enviada', 200, $request);
    }
}
