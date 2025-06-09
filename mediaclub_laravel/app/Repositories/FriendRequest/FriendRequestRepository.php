<?php

namespace App\Repositories\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Solicitud;
use Exception;
use Illuminate\Database\Eloquent\Collection;
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
        if ($fromUserId === $toUserId) throw new Exception('No puedes realizar esta accion',400);

        $accepted = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->update(['estado' => 'aceptada']);
        return $accepted > 0;
    }

    public function rejectRequest(int $toUserId, int $fromUserId): bool
    {
        if ($fromUserId === $toUserId) throw new Exception('No puedes realizar esta accion',400);

        $rejected = Solicitud::where('remitente_id', $fromUserId)
            ->where('destinatario_id', $toUserId)
            ->where('estado', 'pendiente')
            ->update(['estado' => 'rechazada']);
        return $rejected > 0;
    }

    public function getReceivedRequests(int $userId): Collection
    {
        $recibidas = Solicitud::with('remitente')
            ->where('destinatario_id', $userId)
            ->where('estado', 'pendiente')
            ->get()
            ->map(function ($solicitud) {
                return [
                    'alias' => $solicitud->remitente->alias,
                    'foto_perfil' => $solicitud->remitente->foto_perfil,
                    'fecha' => $solicitud->fecha_solicitud->toDateTimeString()
                ];
            });
        return $recibidas;
    }

    public function getSentRequests(int $userId): Collection
    {
        $enviadas = Solicitud::with('destinatario')
            ->where('remitente_id', $userId)
            ->where('estado', 'pendiente')
            ->get()
            ->map(function ($solicitud) {
                return [
                    'alias' => $solicitud->destinatario->alias,
                    'foto_perfil' => $solicitud->destinatario->foto_perfil,
                    'fecha' => $solicitud->created_at->toDateTimeString()
                ];
            });
        return $enviadas;
    }

}
