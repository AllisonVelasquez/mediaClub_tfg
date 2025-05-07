<?php

namespace App\Actions\User;

use App\Models\Usuario;
use App\Services\User\UserValidatorService;
use Illuminate\Support\Facades\Hash;

class AddUserAction
{

    public function execute(array $data): Usuario
    {

        UserValidatorService::validate($data);

        $user = Usuario::create([
            'login_id' => $data['login_id'],
            'correo' => $data['correo'],
            'contrasena_hash' => Hash::make($data['contrasena_hash']),
            'alias' => $data['alias'],
            'bio' => $data['bio'] ?? null,
            'redes' => $data['redes'] ?? null,
            'foto_perfil' => $data['foto_perfil'] ?? null,
            'fecha_creacion' => now(),
            'fecha_ultima_actualizacion' => now(),
            'confirmado' => false,
            'bloqueado' => false,
        ]);

        if (!$user) {
            throw new \Exception("No se pudo crear el usuario");
        }
        return $user;
    }
}
