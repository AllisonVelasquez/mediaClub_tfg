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

    public function showFriends(Usuario $user){
        return app(GetUserFriendsListAction::class)->execute($user);
    }
    
    public function deleteFriend(Request $request, Usuario $friend){
        $user = $request->user();
        return app(DeleteFriendAction::class)->execute($user,$friend);
    }
}
