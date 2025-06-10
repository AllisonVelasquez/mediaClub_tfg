<?php

namespace App\Http\Controllers;

use App\Actions\Like\AddLikeAction;
use App\Actions\Like\GetLikesAction;
use App\Actions\Like\RemoveLikeAction;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function showLikes(string $model, int $id,Request $request)
    {
        $me = $request->user();
        return app(GetLikesAction::class)->execute($model, $id, $me);
    }
    public function addLike(string $model, int $id, Request $request)
    {
        $me = $request->user();
        return app(AddLikeAction::class)->execute($model, $id, $me);
    }
    public function removeLike(string $model, int $id, Request $request)
    {
        $me = $request->user();
        return app(RemoveLikeAction::class)->execute($model, $id, $me);
    }
}
