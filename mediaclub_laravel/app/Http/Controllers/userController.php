<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\Repositories\User\UserRepositoryInterface;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\LoginUserRequest;
use App\Services\User\AuthService;

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

    //Esto se borra despues, ahora es para ver los datos
    // public function index()
    // {
    //     $users = $this->userRepository->all();
    //     if ($users->isEmpty()) {
    //         return $this->success('Lista de usuarios vacia');
    //     }
    //     return $this->success($users, 'Lista cargada');
    // }

    // public function totalUsers()
    // {
    //     $total = $this->userRepository->count();
    //     return $this->success($total, 'Total de usuarios');
    // }

    public function registerUser(RegisterUserRequest $request) 
    {
        $validateData = $request->validated();
        $user = $this->authService->register($validateData);
        return $this->success($user, 'Usuario creado exitosamente', 201);
    }

    public function loginUser(LoginUserRequest $request)
    {
        $validateData = $request->validated();
        $user = $this->authService->login($validateData);
        return $this->success($user, 'Usuario logueado exitosamente', 200);
    }

    public function show($id)
    {
        $user = $this->userRepository->find($id);
        return $this->success($user, 'Usuario encontrado');
    }

    public function delete($id) //Hay que confirmar que el user confirme que quiere eliminar su cuenta
    {
        $user = $this->userRepository->delete($id);
        return $this->success('Usuario eliminado', 200);
    }

    public function update(UpdateRequest $request, $id)
    {
        $validateData = $request->validated();
        $user = $this->userRepository->update($id, $validateData);
        return $this->success($user, 'Usuario actualizado', 200);
    }
}
