<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    // Obtener todos los usuarios
    public function all(): Collection
    {
        return Usuario::all();
    }

    // Buscar usuarios por un campo
    public function findByLoginId(string $login_id): ?Usuario
    {
        return Usuario::where('login_id', $login_id)->firstOrFail();
    }

    // Obtener un usuario por su ID
    public function find(int $id): ?Usuario
    {
        return Usuario::findOrFail($id);
    }

    // Crear un nuevo usuario
    public function store(array $data): Usuario
    {
        $data['contrasena'] = Hash::make($data['contrasena']);
        return Usuario::create($data);
    }

    // Actualizar un usuario
    public function update(int $id, array $data): ?Usuario
    {
        $user = Usuario::findOrFail($id);
        if (!empty($data['contrasena'])) {
            $data['contrasena'] = Hash::make($data['contrasena']);
        }
        $user->fill($data);
        if ($user->isDirty()) { //Verifica si hay cambios
            $user->save();
        }
        return $user;
    }

    // Eliminar un usuario
    public function delete(int $id): bool
    {
        $user = Usuario::findOrFail($id);
        $user->delete();
        return true;
    }

    // Contar el número de usuarios
    public function count(): int
    {
        return Usuario::count();
    }

    // Verificar si un usuario con un ID existe
    public function exists(int $id): bool
    {
        return Usuario::where('id', $id)->exists();
    }
}
