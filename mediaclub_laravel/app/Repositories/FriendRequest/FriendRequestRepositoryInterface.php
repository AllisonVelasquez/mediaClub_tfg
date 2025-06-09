<?php

namespace App\Repositories\FriendRequest;

use App\Models\Solicitud;
use Illuminate\Support\Collection;
interface FriendRequestRepositoryInterface
{
    public function createRequest(int $fromUserId, int $toUserId): Solicitud;

    public function cancelRequest(int $fromUserId, int $toUserId): bool;

    public function acceptRequest(int $fromUserId, int $toUserId): bool;

    public function rejectRequest(int $fromUserId, int $toUserId): bool;

    // public function requestExists(int $fromUserId, int $toUserId): bool;

    public function getReceivedRequests(int $userId): Collection;

    public function getSentRequests(int $userId): Collection;

    // public function areFriends(int $userIdA, int $userIdB): bool;
}
