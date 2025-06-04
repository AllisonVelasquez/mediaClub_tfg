<?php

namespace App\Repositories\Friendship;

use App\Models\Amistad;

class FriendshipRepository implements FriendshipRepositoryInterface
{
    public function create(int $userid, int $friendid): Amistad
    {
        return Amistad::create($userid, $friendid);
    }
    public function delete(int $userid, int $friendid): bool
    {
        return Amistad::entre($userid, $friendid)->delete();
    }
}
