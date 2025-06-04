<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Actions\FriendRequest\AcceptFriendRequestAction;
use App\Actions\FriendRequest\CancelFriendRequestAction;
use App\Actions\FriendRequest\GetReceivedRequestsAction;
use App\Actions\FriendRequest\GetSentRequestsAction;
use App\Actions\FriendRequest\RejectFriendRequestAction;
use App\Actions\FriendRequest\SendFriendRequestAction;

use App\Models\Usuario;

class FriendRequestController extends Controller
{
    public function sendFriendRequest (Request $request, Usuario $usuario)
    {
        $from = $request->user();
        return app(SendFriendRequestAction::class)->execute($from,$usuario);
    }
    public function acceptFriendRequest (Request $request, Usuario $usuario)
    {
        $me = $request->user();
        return app(AcceptFriendRequestAction::class)->execute($me,$usuario);
    }
    public function rejectFriendRequest (Request $request, Usuario $usuario)
    {
        $me = $request->user();
        return app(RejectFriendRequestAction::class)->execute($me,$usuario);
    }
    public function cancelFriendRequest (Request $request, Usuario $usuario)
    {
        $me = $request->user();
        return app(CancelFriendRequestAction::class)->execute($me,$usuario);
    }
    public function getSentFriendRequests (Request $request)
    {
        return app(GetSentRequestsAction::class)->execute($request->user());
    }
    public function getReceivedFriendRequests (Request $request)
    {
        return app(GetReceivedRequestsAction::class)->execute($request->user());
    }
}
