<?php

namespace App\Actions\Friendship;

use App\UseCases\Friendship\GetUserFriendsListUseCase;
use App\Traits\ApiResponse;

use function PHPUnit\Framework\isEmpty;

class GetUserFriendsListAction
{
    use ApiResponse;
    protected $getUserFriendsListUseCase;

    public function __construct(GetUserFriendsListUseCase $getUserFriendsListUseCase)
    {
        $this->getUserFriendsListUseCase = $getUserFriendsListUseCase;
    }

    public function execute(array $user) 
    {
        $alias = $user['alias'];
        $friends = $this->getUserFriendsListUseCase->execute($alias);

        if(isEmpty($friends)) return $this->success('Lista de amigos vacía',200);
        return $this->success('Lista de amigos cargada',200,$friends);
    }
}
