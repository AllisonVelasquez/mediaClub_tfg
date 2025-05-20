<?php

namespace App\Http\Controllers;

use App\Actions\User\DeleteUserAction;
use App\Actions\User\GetUserProfileAction;
use App\Actions\User\RegisterUserAction;
use App\Actions\User\LoginUserAction;
use App\Actions\User\LogoutUserAction;
use App\Actions\User\UpdateUserAction;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Requests\FindIdByAliasRequest;

use App\Actions\Friendship\GetMyFriendsListAction;
use App\Actions\Friendship\GetUserFriendsListAction;

use Illuminate\Http\Request;



class UserController extends Controller
{

    public function registerUser(RegisterUserRequest $request)
    {
        return app(RegisterUserAction::class)->execute($request->validated());
    }

    public function loginUser(LoginUserRequest $request)
    {
        return app(LoginUserAction::class)->execute($request->validated());
    }

    public function myProfile(Request $request) 
    {
        return $request->user()->makeHidden(['contrasena', 'usuario_id', 'login_id','confirmado']); 
    }

    public function showProfile(FindIdByAliasRequest $request)
    {
        return app(GetUserProfileAction::class)->execute($request->validated());
    }

    public function logoutUser(Request $request)
    {
        return app(LogoutUserAction::class)->execute($request);
    }

    public function deleteUser(DeleteUserRequest $request) //se pide formulario no para validar sino para confirmar que desea eliminar su cuenta
    {
        $user = $request->user();
        $data = $request->validated();
        return app(DeleteUserAction::class)->execute($user, $data);
    }

    public function updateUser(UpdateRequest $request)
    {
        $user = $request->user();
        return app(UpdateUserAction::class)->execute($user, $request->validated());
        
    }

    //Friends
    public function myFriends(Request $request){
        return app(GetUserFriendsListAction::class)->execute($request->user());


    }

    public function showFriends(Request $request){
        return app(GetUserFriendsListAction::class)->execute($request->validated());

    }
    
    //Lists

    //Threads
}
