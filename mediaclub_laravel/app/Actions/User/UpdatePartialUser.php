<?php
// app/Actions/User/UpdatePartialUserAction.php
namespace App\Actions\User;

use App\Models\User;
use App\Services\User\UserValidator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UpdatePartialUserAction
{
    public function execute(array $data, $id): User
    {
        // Validamos los datos de la solicitud (campos opcionales)
        UserValidator::validateUpdatePartial($data);

        // Buscamos al usuario por su ID
        $user = User::find($id);

        if (!$user) {
            throw new ModelNotFoundException("Usuario no encontrado");
        }

        // Solo actualizamos los campos presentes en la solicitud
        $updatedData = [];

        // Solo agregamos los campos que están presentes en la solicitud
        if (isset($data['id'])) {
            $updatedData['id'] = $data['id'];
        }
        if (isset($data['alias'])) {
            $updatedData['alias'] = $data['alias'];
        }
        if (isset($data['email'])) {
            $updatedData['email'] = $data['email'];
        }
        if (isset($data['passw'])) {
            $updatedData['passw'] = Hash::make($data['passw']);
        }

        // Actualizamos el usuario
        $user->update($updatedData);

        return $user;
    }
}
