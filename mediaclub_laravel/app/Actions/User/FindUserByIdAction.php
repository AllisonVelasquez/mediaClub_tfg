<?php
namespace App\Actions\User;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FindUserByIdAction
{
    public function execute(string $id): User
    {
        $user = User::find($id);

        if (!$user) {
            throw new ModelNotFoundException("Usuario no encontrado");
        }

        return $user;
    }
}
