<?php

namespace App\Http\Controllers;

use App\Actions\Post\CreatePostAction;
use App\Actions\Post\DeletePostAction;
use App\Actions\Post\EditPostAction;
use App\Actions\Post\GetUserPostsAction;
use App\Actions\Post\GetMyPostsAction;
use App\Actions\Post\GetPostAction;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Post;

class PostController extends Controller
{
    public function showMyPosts(Request $request) 
    {
        $me = $request->user();
        return app(GetMyPostsAction::class)->execute($me);
    }

    public function showUserPosts(Usuario $usuario)
    {
        return app(GetUserPostsAction::class)->execute($usuario);
    }

    public function showPost(Usuario $usuario, Post $post)
    {
        return app(GetPostAction::class)->execute($usuario, $post);
    }

    public function showMyPost(Request $request, Post $post)
    {
        $me = $request->user();
        return app(GetPostAction::class)->execute($me, $post);
    }

    public function createPost(CreatePostRequest $request)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(CreatePostAction::class)->execute($me, $data);
    }

    public function editPost(Post $post, UpdatePostRequest $request)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(EditPostAction::class)->execute($me, $post, $data);
    }

    public function deletePost(Post $post, Request $request)
    {
        $me = $request->user();
        return app(DeletePostAction::class)->execute($me, $post);

    }
}
