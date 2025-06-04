<?php

namespace App\Actions\List;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\CreateListUseCase;

class CreateListAction
{
    use ApiResponse;
    protected $registerUserUseCase;
    protected $createListUseCase;
    public function __construct(CreateListUseCase $createListUseCase)
    {
        $this->createListUseCase = $createListUseCase;
    }

    public function execute(Usuario $me, array $data)
    {
        $lista = $this->createListUseCase->execute($me,$data);
        return $this->success('Lista Creada exitosamente', 200, $lista);
    }
}
