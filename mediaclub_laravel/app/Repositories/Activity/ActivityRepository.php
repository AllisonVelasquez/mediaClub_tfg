<?php

namespace App\Repositories\Activity;

use App\Models\Usuario;
use App\Models\Actividad;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\Activity\ActivityRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ActivityRepository implements ActivityRepositoryInterface
{
    public function registrarActividad(
        Usuario $usuario,
        Model $activitable,
        string $tipo,
        ?string $descripcion = null,
        array $metadata = []
    ): Actividad 
    {
        return $activitable->actividad()->create([
            'usuario_id' => $usuario->id,
            'tipo' => $tipo,
            'descripcion' => $descripcion,
            'metadata' => $metadata,
        ]);
    }

    public function getActivity(int $userId) : LengthAwarePaginator
    {
        return Actividad::where('usuario_id', $userId)
        ->select('id', 'descripcion', 'created_at')
        ->latest()
        ->paginate(10);
    }
}
