<?php

namespace App\Actions\User;

use App\Services\User\AuthService;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class DeleteUserAction
{
   
    public function execute(Usuario $user, array $data)
    {
        if ($user->login_id !== $data['login_id']) {
            return false;
        }
        if (!Hash::check($data['contrasena'], $user->contrasena)) {
            return false;
        }
        $user->tokens()->delete();
        return app(AuthService::class)->delete($user->usuario_id);
    }

}
