<?php

namespace App\Repositories\Activity;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Model;
use App\Models\Actividad;

interface ActivityRepositoryInterface
{
    public function registrarActividad(
        Usuario $usuario,
        Model $activitable,
        string $tipo,
        ?string $descripcion = null,
        array $metadata = []
    ): Actividad;
        public function getActivity(int $userId) : LengthAwarePaginator;

}
