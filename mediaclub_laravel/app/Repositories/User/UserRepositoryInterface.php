<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    // public function find(int $id): ?Usuario;
    public function findByLoginId(string $login_id): ?Usuario;
    public function store(array $data): Usuario;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function findByAlias(string $alias): ?Usuario;
    public function listFriends(string $alias): Collection;
    public function listMyFriends(int $id): Collection;

}
