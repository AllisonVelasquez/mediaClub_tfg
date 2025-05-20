<?php

namespace App\Repositories\Friendship;

use App\Models\Amistad;

class FriendshipRepository implements FriendshipRepositoryInterface
{
    public function create(int $userid,int $friendid): Amistad {
        return Amistad::create($userid,$friendid);
    }
    public function delete(int $userid,int $friendid): bool {
        $deleteFriend = Amistad::where('usuario_id',$userid)
        ->where('amigo_id',$friendid)
        ->delete();
        return $deleteFriend > 0;
    }
    public function listFriends(string $alias): array {
        
    }
    public function countFriends(string $alias): int {

    }
}
