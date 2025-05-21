<?php

namespace App\Actions\Friendship;

use App\UseCases\Friendship\GetMyFriendsListUseCase;
use App\Traits\ApiResponse;
use App\Models\Usuario;

use function PHPUnit\Framework\isEmpty;

class GetMyFriendsListAction
{
    use ApiResponse;
    protected $getMyFriendsListUseCase;

    public function __construct(GetMyFriendsListUseCase $getMyFriendsListUseCase)
    {
        $this->getMyFriendsListUseCase = $getMyFriendsListUseCase;
    }

    public function execute(Usuario $user) 
    {
        $userid = $user->usuario_id;
        $friends = $this->getMyFriendsListUseCase->execute($userid);
        if(isEmpty($friends)) return $this->success('Lista de amigos vacía',200);
        return $this->success('Lista de amigos cargada',200,$friends);
    }
}
