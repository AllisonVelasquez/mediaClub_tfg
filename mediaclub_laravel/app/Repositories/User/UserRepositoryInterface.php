<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    public function searchByAlias(string $alias): ?LengthAwarePaginator;
    public function findByLoginId(string $login_id): ?Usuario;
    public function store(array $data): Usuario;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function listFriends(int $id): Collection;

}
