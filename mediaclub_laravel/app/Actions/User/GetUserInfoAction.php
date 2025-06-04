<?php

namespace App\Actions\User;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\User\GetUserInfoUseCase;


class GetUserInfoAction
{
    use ApiResponse;
    protected $getUserInfoUseCase;
    public function __construct(GetUserInfoUseCase $getUserInfoUseCase)
    {
        $this->getUserInfoUseCase = $getUserInfoUseCase;
    }
    public function execute(Usuario $user)
    {
        $info = $this->getUserInfoUseCase->execute($user->id);
        return $this->success('Informacion cargada con exito', 200, $info);
    }
}
