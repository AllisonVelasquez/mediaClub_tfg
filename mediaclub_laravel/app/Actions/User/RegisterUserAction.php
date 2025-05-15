<?php

namespace App\Actions\User;

use App\Services\User\AuthService;

class RegisterUserAction
{

    public function execute(array $data)
    {
        //Hay que ver si se puede hacer el envio por correo de bienvenido a la pagina al correo
        $user = app(AuthService::class)->register($data);

        return $user;
    }
}
