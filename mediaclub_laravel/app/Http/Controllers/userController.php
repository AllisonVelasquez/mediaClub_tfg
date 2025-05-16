<?php

namespace App\Http\Controllers;

use App\Actions\User\DeleteUserAction;
use App\Traits\ApiResponse;
use App\Repositories\User\UserRepositoryInterface;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\LoginUserRequest;
use App\Services\User\AuthService;
use App\Actions\User\RegisterUserAction;
use App\Actions\User\LoginUserAction;
use App\Actions\User\LogoutUserAction;
use App\Actions\User\UpdateUserProfileAction;
use Illuminate\Http\Request;
use App\Http\Requests\DeleteUserRequest;

class UserController extends Controller
{
    use ApiResponse;

    protected $userRepository;
    protected $authService;

    public function __construct(UserRepositoryInterface $userRepository, AuthService $authService)
    {
        $this->authService = $authService;
        $this->userRepository = $userRepository;
    }

    public function registerUser(RegisterUserRequest $request)
    {
        $user = app(RegisterUserAction::class)->execute($request->validated());
        return $this->success($user, 'Usuario creado exitosamente', 201);
    }

    public function loginUser(LoginUserRequest $request)
    {
        $token = app(LoginUserAction::class)->execute($request->validated());
        return $this->success($token, 'Usuario logueado exitosamente', 200);
    }

    public function getProfile(Request $request)
    {
        $user = $request->user()->makeHidden(['contrasena', 'usuario_id', 'login_id','confirmado','bloqueado']);
        return $this->success($user, 'Usuario encontrado');
    }

    public function logoutUser(Request $request)
    {
        $bool = app(LogoutUserAction::class)->execute($request);
        if ($bool === true) {
            return $this->success('Usuario deslogueado exitosamente', 200);
        }
        return $this->error('No puedes desloguearte', 403);
        ;
    }

    public function delete(DeleteUserRequest $request) //se pide formulario no para validar sino para confirmar que desea eliminar su cuenta
    {
        $bool = app(DeleteUserAction::class)->execute($request->user(), $request->validated());

        if ($bool === true) {
            return $this->success('Usuario eliminado.', 200);
        }
        return $this->error('No puedes eliminar este usuario.', 403);
    }

    public function update(UpdateRequest $request)
    {
        $user = $request->user();
        $user = app(UpdateUserProfileAction::class)->execute($user, $request->validated());
        return $this->success($user, 'Usuario actualizado', 200);
    }

    public function getIdByAlias($alias)
    {
        $user = $this->userRepository->findByAlias($alias);
        if ($user) {
            return $this->success($user->usuario_id, 'Usuario encontrado');
        }
        return $this->error('Usuario no encontrado', 404);
    }
}
