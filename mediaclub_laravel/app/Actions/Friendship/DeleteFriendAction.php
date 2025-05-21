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

    public function execute(Usuario $user,array $friend){
        $userid = $user->usuario_id;
        $friendalias = $friend['alias'];
        $this->deleteFriendUseCase->execute($userid,$friendalias);
        return $this->success('Usuario eliminado de lista de amigos',200);
    }
   
}