<?php

namespace App\Actions\List;

use App\Models\Lista;
use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\GetListContentUseCase;

class GetMyListContentAction
{
    use ApiResponse;
    protected $getListContentUseCase;
    public function __construct(GetListContentUseCase $getListContentUseCase)
    {
        $this->getListContentUseCase = $getListContentUseCase;
    }

    public function execute(Usuario $user, Lista $list)
    {
        $content = $this->getListContentUseCase->execute($user,$list);
        return $this->success('Contenido de lista cargado', 200, $content);
    }
}
