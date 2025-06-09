<?php

namespace App\Repositories\Friendship;

use App\Models\Amistad;

class FriendshipRepository implements FriendshipRepositoryInterface
{
    public function create(int $userid, int $friendid): Amistad
    {
        return Amistad::create([
            'usuario_id' => $userid,
            'amigo_id' => $friendid,
        ]);
    }
    public function delete(int $userid, int $friendid): bool
    {
        return Amistad::entre($userid, $friendid)->delete() > 0;
    }
}
