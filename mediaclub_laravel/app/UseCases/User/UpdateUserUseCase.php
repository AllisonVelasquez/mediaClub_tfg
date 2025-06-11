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

    public function execute(Usuario $user, array $data, $fotoPerfilFile = null)
    {
        if ($fotoPerfilFile) {
            $path = $fotoPerfilFile->store('public/profiles');
            $relativePath = str_replace('public/', 'storage/', $path);
            $data['foto_perfil'] = $relativePath;
        }
         if (isset($data['contrasena'])) {
            $data['contrasena'] = Hash::make($data['contrasena']);
        }
        return $this->userRepository->update($user->id, $data);
    }
}
