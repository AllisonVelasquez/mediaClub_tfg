<?php

namespace App\Repositories\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Solicitud;

class FriendRequestRepository implements FriendRequestRepositoryInterface
{
    public function createRequest(int $fromUserId, int $toUserId): Solicitud
    {
        return Solicitud::create([
            'remitente_id' => $fromUserId,
            'destinatario_id' => $toUserId,
            'estado' => 'pendiente',
        ]);
    }

    public function cancelRequest(int $fromUserId, int $toUserId): bool
    {
        $canceled = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->delete();
        return $canceled > 0;
    }

    public function acceptRequest(int $fromUserId, int $toUserId): bool
    {
        $accepted = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->update(['estado' => 'aceptada']);
        return $accepted > 0;
    }

    public function rejectRequest(int $fromUserId, int $toUserId): bool
    {
        $rejected = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->update(['estado' => 'rechazada']);
        return $rejected > 0;
    }

    public function getReceivedRequests(int $userId): array
    {
        return Solicitud::with('remitente')
            ->where('destinatario_id', $userId)
            ->where('estado', 'pendiente')
            ->get()
            ->toArray();
    }

    public function getSentRequests(int $userId): array
    {
        return Solicitud::with('destinatario')
            ->where('remitente_id', $userId)
            ->where('estado', 'pendiente')
            ->get()
            ->toArray();
    }

    // public function requestExists(int $fromUserId, int $toUserId): bool
    // {
    //     return Solicitud::where('remitente_id', $fromUserId)
    //                      ->where('destinatario_id', $toUserId)
    //                      ->where('estado', 'pendiente')
    //                      ->exists();
    // }

    // public function areFriends(int $userIdA, int $userIdB): bool
    // {
    //     return Solicitud::where(function ($q) use ($userIdA, $userIdB) {
    //                 $q->where('remitente_id', $userIdA)->where('destinatario_id', $userIdB);
    //             })->orWhere(function ($q) use ($userIdA, $userIdB) {
    //                 $q->where('remitente_id', $userIdB)->where('destinatario_id', $userIdA);
    //             })->where('estado', 'accepted')->exists();
    // }
}
