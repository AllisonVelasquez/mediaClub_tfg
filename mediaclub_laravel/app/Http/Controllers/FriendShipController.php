<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Actions\Friendship\GetUserFriendsListAction;
use App\Actions\Friendship\DeleteFriendAction;

use App\Models\Usuario;

class FriendShipController extends Controller
{
    public function myFriends(Request $request){
        return app(GetUserFriendsListAction::class)->execute($request->user());
    }

    public function showFriends(Usuario $usuario){
        return app(GetUserFriendsListAction::class)->execute($usuario);
    }
    
    public function deleteFriend(Request $request, Usuario $usuario){
        $me = $request->user();
        return app(DeleteFriendAction::class)->execute($me,$usuario);
    }
}
