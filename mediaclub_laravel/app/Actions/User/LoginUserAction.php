<?php

namespace App\Actions\User;

use App\Services\User\AuthService;

class LoginUserAction
{

    public function execute(array $data)
    {
        //Que se pueda con correo o login_id
        $user = app(AuthService::class)->login($data);

        $token = $user->createToken('Auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario_id' => $user->usuario_id
        ]);
    }
}
