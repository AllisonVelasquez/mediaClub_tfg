<?php

namespace App\Actions\User;

use App\Models\Usuario;
use App\Traits\ApiResponse;

class GetUserProfileAction
{
    use ApiResponse;

    public function execute(Usuario $user)
    {
        if ($user->foto_perfil) {
            $user->foto_perfil = asset($user->foto_perfil);
        }
        $userProfileData = $user->makeHidden(['contrasena', 'usuario_id', 'login_id', 'confirmado']);
        return $this->success('Usuario encontrado', 200, $userProfileData);
    }
}
