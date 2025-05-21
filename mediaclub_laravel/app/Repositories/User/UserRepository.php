<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function findByAlias(string $alias): ?Usuario
    {
        return Usuario::where('alias', $alias)->firstOrFail();
    }

    // Buscar usuarios por un campo
    public function findByLoginId(string $login_id): ?Usuario
    {
        return Usuario::where('login_id', $login_id)->firstOrFail();
    }

    // Crear un nuevo usuario
    public function store(array $data): Usuario
    {
        $data['contrasena'] = Hash::make($data['contrasena']);
        return Usuario::create($data);
    }

    // Actualizar un usuario
    public function update(int $id, array $data): bool
    {
        $user = Usuario::findOrFail($id);
        if (!empty($data['contrasena'])) {
            $data['contrasena'] = Hash::make($data['contrasena']);
        }
        $user->fill($data);
        if ($user->isDirty()) { //Verifica si hay cambios
            $user->save();
        }
        return true;
    }

    // Eliminar un usuario
    public function delete(int $id): bool
    {
        $user = Usuario::findOrFail($id);
        $user->delete();
        return true;
    }

    // Contar el número de usuarios
    public function listMyFriends($id): Collection
    {
        $user = Usuario::findOrFail($id);
        return $user->amigos();
    }

    public function listFriends($alias): Collection
    {
        $user = Usuario::where('alias', $alias)->firstOrFail();
        return $user->amigos();
    }
}
