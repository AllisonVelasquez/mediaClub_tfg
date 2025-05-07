<?php
namespace App\Actions\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeleteUserAction
{
    public function execute(string $id): bool
    {
        $user = Usuario::find($id);

        if (!$user) {
            throw new ModelNotFoundException("Usuario no encontrado");
        }

        return $user->delete();
    }
}
