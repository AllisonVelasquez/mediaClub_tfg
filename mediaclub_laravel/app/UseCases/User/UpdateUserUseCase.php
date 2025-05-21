<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use  App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UpdateUserUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(Usuario $user, array $data)
    {
        $claveCorrecta = Hash::check($data['contrasena'], $user->contrasena);
        if (!$claveCorrecta) {
            return false;
        }
        return $this->userRepository->update($user->usuario_id,$data);
    }
}
