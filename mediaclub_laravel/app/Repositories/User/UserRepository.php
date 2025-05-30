<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function searchByAlias(string $alias): ?LengthAwarePaginator
    {
        $alias = trim($alias);
        return Usuario::where('title', 'like', "%{$alias}%")
        ->paginate(20);
    }

    public function findByLoginId(string $login_id): ?Usuario
    {
        return Usuario::where('login_id', $login_id)->firstOrFail();
    }

    public function store(array $data): Usuario
    {
        $data['contrasena'] = Hash::make($data['contrasena']);
        return Usuario::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $user = Usuario::findOrFail($id);
        if (!empty($data['contrasena'])) {
            $data['contrasena'] = Hash::make($data['contrasena']);
        }
        $user->fill($data);
        if ($user->isDirty()) { 
            $user->save();
        }
        return true;
    }

    public function delete(int $id): bool
    {
        $user = Usuario::findOrFail($id);
        return $user->delete();
    }


    public function listFriends(int $id): Collection
    {
        $user = Usuario::findOrFail($id);
        return $user->amigos();
    }

    public function showProfile() {}
}
