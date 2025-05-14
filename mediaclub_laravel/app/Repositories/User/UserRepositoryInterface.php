<?php

namespace App\Repositories\User;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    public function all(): Collection;
    public function find(int $id): ?Usuario;
    public function findByLoginId(string $login_id): ?Usuario;
    public function store(array $data): Usuario;
    public function update(int $id, array $data): ?Usuario;
    public function delete(int $id): bool;
    // public function findByField(string $field, string $value): Collection;
    // public function firstWhere(string $field, string $value): ?Usuario;
    public function count(): int;
    // public function activeUsers(): Collection;
    public function exists(int $id): bool;
}
