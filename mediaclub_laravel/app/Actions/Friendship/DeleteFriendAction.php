<?php
namespace App\Actions\Friendship;

use App\UseCases\Friendship\DeleteFriendUseCase;
use App\Traits\ApiResponse;
use App\Models\Usuario;

class DeleteFriendAction{
use ApiResponse;
    protected $deleteFriendUseCase;

    public function __construct(DeleteFriendUseCase $deleteFriendUseCase) {
        $this->deleteFriendUseCase = $deleteFriendUseCase;
    }

    public function execute(Usuario $user,Usuario $friend){
        $this->deleteFriendUseCase->execute($user,$friend);
        return $this->success('Usuario eliminado de lista de amigos',200);
    }
   
}