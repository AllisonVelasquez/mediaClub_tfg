<?php

namespace App\Actions\Friendship;

use App\UseCases\Friendship\GetUserFriendsListUseCase;
use App\Traits\ApiResponse;
use App\Models\Usuario;
use function PHPUnit\Framework\isEmpty;

class GetUserFriendsListAction
{
    use ApiResponse;
    protected $getUserFriendsListUseCase;

    public function __construct(GetUserFriendsListUseCase $getUserFriendsListUseCase)
    {
        $this->getUserFriendsListUseCase = $getUserFriendsListUseCase;
    }

    public function execute(Usuario $user) 
    {
        $friends = $this->getUserFriendsListUseCase->execute($user);

        if(isEmpty($friends)) return $this->success('Lista de amigos vacía',200);
        return $this->success('Lista de amigos cargada',200,$friends);
    }
}
