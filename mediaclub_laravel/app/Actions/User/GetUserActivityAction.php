<?php

namespace App\Actions\User;

use App\Services\User\AuthService;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class DeleteUserAction
{
   
    public function execute(Usuario $user, array $data): bool
{
    $loginCoincide = $user->login_id === $data['login_id'];
    $claveCorrecta = Hash::check($data['contrasena'], $user->contrasena);

    if (!($loginCoincide && $claveCorrecta)) {
        return false;
    }

    $user->tokens()->delete();

    return app(AuthService::class)->delete($user->usuario_id);
}


}
