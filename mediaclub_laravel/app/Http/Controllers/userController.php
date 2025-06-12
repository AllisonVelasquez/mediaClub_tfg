<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Actions\User\DeleteUserAction;
use App\Actions\User\GetUserInfoAction;
use App\Actions\User\GetUserProfileAction;
use App\Actions\User\RegisterUserAction;
use App\Actions\User\LoginUserAction;
use App\Actions\User\LogoutUserAction;
use App\Actions\User\SearchUserByAliasAction;
use App\Actions\User\UpdateUserAction;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Requests\SearchUserByAliasRequest;
use App\Models\Usuario;




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

    public function searchByAlias(SearchUserByAliasRequest $request)
    {
        return app(SearchUserByAliasAction::class)->execute($request->validated());
    }

    public function myProfile(Request $request)
    {
        return app(GetUserProfileAction::class)->execute($request->user());
    }

    public function showProfile(Usuario $usuario)
    {
        return app(GetUserProfileAction::class)->execute($usuario);
    }

    public function showUserInfo(Usuario $usuario)
    {
        return app(GetUserInfoAction::class)->execute($usuario);
    }

    public function logoutUser(Request $request)
    {
        $user = $request->user();
        return app(LogoutUserAction::class)->execute($user);
    }

    public function deleteUser(DeleteUserRequest $request)
    {
        $user = $request->user();
        $data = $request->validated();
        return app(DeleteUserAction::class)->execute($user, $data);
    }

    public function updateUser(UpdateUserRequest $request)
    {
        $user = $request->user();
        $fotoPerfilFile = $request->file('foto_perfil');
        dd($request->file('foto_perfil'));
        return app(UpdateUserAction::class)->execute($user, $request->validated(), $fotoPerfilFile);
    }



    //Threads
}
