<?php
namespace App\Actions\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FindUserByIdAction
{
    public function execute(string $id): Usuario
    {
        $user = Usuario::find($id);

        if (!$user) {
            throw new ModelNotFoundException("Usuario no encontrado");
        }

        return $user;
    }
}
