<?php

namespace App\Http\Controllers;

use App\Actions\FriendRequest\AcceptFriendRequestAction;
use App\Actions\FriendRequest\CancelFriendRequestAction;
use App\Actions\FriendRequest\GetReceivedRequestsAction;
use App\Actions\FriendRequest\GetSentRequestsAction;
use App\Actions\FriendRequest\RejectFriendRequestAction;
use App\Actions\FriendRequest\SendFriendRequestAction;
use App\Http\Requests\FriendRequestRequest;
use Illuminate\Http\Request;

class FriendRequestController extends Controller
{
    public function sendFriendRequest (FriendRequestRequest $request)
    {
        $from = $request->user();
        $to = $request->validated();
        return app(SendFriendRequestAction::class)->execute($from,$to);
    }
    public function acceptFriendRequest (FriendRequestRequest $request)
    {
        $from = $request->user();
        $to = $request->validated();
        return app(AcceptFriendRequestAction::class)->execute($from,$to);
    }
    public function rejectFriendRequest (FriendRequestRequest $request)
    {
        $from = $request->user();
        $to = $request->validated();
        return app(RejectFriendRequestAction::class)->execute($from,$to);
    }
    public function cancelFriendRequest (FriendRequestRequest $request)
    {
        $from = $request->user();
        $to = $request->validated();
        return app(CancelFriendRequestAction::class)->execute($from,$to);
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
