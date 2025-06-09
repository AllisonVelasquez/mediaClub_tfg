<?php

namespace App\Repositories\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Solicitud;
use Exception;
use Illuminate\Support\Collection;
use App\Models\Amistad;


class FriendRequestRepository implements FriendRequestRepositoryInterface
{
    public function createRequest(int $fromUserId, int $toUserId): Solicitud
    {
        if ($fromUserId === $toUserId) throw new Exception('No puedes enviarte solicitudes a ti mismo',400);

        if(Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->exists()) throw new Exception('Solicitud pendiente ya existe',409);

        if(Amistad::entre($fromUserId, $toUserId)->exists())throw new Exception('Ya existe una amistad',409);

        return Solicitud::create([
            'remitente_id' => $fromUserId,
            'destinatario_id' => $toUserId,
            'estado' => 'pendiente',
        ]);
    }

    public function cancelRequest(int $fromUserId, int $toUserId): bool
    {
        if ($fromUserId === $toUserId) throw new Exception('No puedes realizar esta accion',400);

        $canceled = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->delete();
        return $canceled > 0;
    }

    public function acceptRequest(int $toUserId, int $fromUserId): bool
    {
        if ($fromUserId === $toUserId) throw new Exception('No puedes aceptar una solicitud de ti mismo',400);

        $accepted = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->update(['estado' => 'aceptada']);
        return $accepted > 0;
    }

    public function rejectRequest(int $toUserId, int $fromUserId): bool
    {
        if ($fromUserId === $toUserId) throw new Exception('No puedes rechazar una solicitud de ti mismo',400);

        $rejected = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->update(['estado' => 'rechazada']);
        return $rejected > 0;
    }

    public function getReceivedRequests(int $userId): Collection
    {
        return Solicitud::with('remitente')
            ->where('destinatario_id', $userId)
            ->where('estado', 'pendiente')
            ->get()
            ->map(function ($solicitud) {
                return [
                    'remitente_id' => $solicitud->remitente_id,
                    'alias' => $solicitud->remitente->alias,
                    'foto_perfil' => $solicitud->remitente->foto_perfil,
                    'fecha' => $solicitud->created_at->toDateTimeString()
                ];
            });
    }

    public function getSentRequests(int $userId): Collection
    {
        return Solicitud::with('destinatario')
            ->where('remitente_id', $userId)
            ->where('estado', 'pendiente')
            ->get()
            ->map(function ($solicitud) {
                return [
                    'id' => $solicitud->id,
                    'alias' => $solicitud->destinatario->alias,
                    'foto_perfil' => $solicitud->destinatario->foto_perfil,
                    'fecha' => $solicitud->created_at->toDateTimeString()
                ];
            });
    }

}
