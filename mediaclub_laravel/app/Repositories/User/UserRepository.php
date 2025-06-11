<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function searchByAlias(string $alias): ?LengthAwarePaginator
    {
        $alias = trim($alias);
        return Usuario::select('id', 'alias', 'foto_perfil')
            ->where('alias', 'like', "%{$alias}%")
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
       
        $user->fill($data);
        if ($user->isDirty()) {
            $user->save();
        }
        return true;
    }

    public function deleteUser(int $id): bool
    {
        $user = Usuario::findOrFail($id);
        return $user->delete() > 0;
    }


    public function listFriends(int $id): Collection
    {
        $user = Usuario::findOrFail($id);
        return $user->amigos();
    }

    public function getInfoUser(int $userId): array
    {
        $user = Usuario::withCount([
            'resenas',
            'puntuaciones',
            'lista as listas_publicas_count' => function ($query) {
                $query->where('publica', true);
            },
            'lista as listas_privadas_count' => function ($query) {
                $query->where('publica', false);
            }
        ])->findOrFail($userId);

        return [
            'puntuaciones' => $user->puntuaciones_count,
            'resenas' => $user->resenas_count,
            'listas_publicas' => $user->listas_publicas_count,
            'listas_privadas' => $user->listas_privadas_count,
        ];
    }
}
