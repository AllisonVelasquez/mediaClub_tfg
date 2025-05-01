<?php
namespace App\Actions\User;

use App\Models\User;
use App\Services\User\UserValidator;
use Illuminate\Support\Facades\Hash;

class AddUserAction
{

    public function execute(array $data): User
    {

        UserValidator::validate($data);

        $user = User::create([
            'id' => $data['id'],
            'alias' => $data['alias'],
            'email' => $data['email'],
            'passw' => Hash::make($data['passw']),
        ]);

        if (!$user) {
            throw new \Exception("No se pudo crear el usuario");
        }

        return $user;
    }
}
