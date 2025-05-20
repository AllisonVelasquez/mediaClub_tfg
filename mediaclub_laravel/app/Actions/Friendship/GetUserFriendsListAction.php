<?php
namespace App\Actions\Friendship;

use App\Application\UseCases\Friendship\GetUserFriendsListUseCaseUse;
use App\Traits\ApiResponse;
use App\Models\Usuario;

class GetUserFriendsListAction{
use ApiResponse;
    protected $getUserFriendsListUseCase;

    public function __construct(GetUserFriendsListUseCaseUse $getUserFriendsListUseCase) {
        $this->getUserFriendsListUseCase = $getUserFriendsListUseCase;
    }
    //fatltaaaaaa
    public function execute(Usuario $user){
        $userid = $user->usuario_id;
        return response()->json($this->getUserFriendsListUseCase->execute($userid));

    }
   
}