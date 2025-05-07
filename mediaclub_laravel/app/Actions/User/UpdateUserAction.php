<?php
namespace App\Actions\User;

use App\Models\Usuario;
use App\Services\User\UserValidatorService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UpdateUserAction
{

    public function execute($id, array $data): Usuario
    {
        UserValidatorService::validate($data);

        $user = Usuario::find($id);

        if (!$user) {
            throw new ModelNotFoundException("Usuario no encontrado");
        }

        $user->id = $data['id'];
        $user->alias = $data['alias'];
        $user->email = $data['email'];
        $user->passw = Hash::make($data['passw']);

        $user->save();

        return $user;
    }
}
