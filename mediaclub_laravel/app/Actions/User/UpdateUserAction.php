<?php

namespace App\Actions\User;

use App\UseCases\User\UpdateUserUseCase;
use App\Models\Usuario;
use App\Traits\ApiResponse;

class UpdateUserAction
{

    use ApiResponse;
    protected $updateUserUseCase;
    public function __construct(UpdateUserUseCase $updateUserUseCase)
    {
        $this->updateUserUseCase = $updateUserUseCase;
    }


    public function execute(Usuario $user, array $data, $fotoPerfilFile = null)
    {

        if ($this->updateUserUseCase->execute($user, $data, $fotoPerfilFile)) {
            return $this->success('Datos actualizados correctamente.', 200);
        }
        return $this->error('No se han podido actualizar los datos.', 403);
    }
}
