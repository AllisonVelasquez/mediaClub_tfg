<?php

namespace App\Actions\List;

use App\Models\Lista;
use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\UpdateListUseCase;

class UpdateListAction
{
    use ApiResponse;
    protected $registerUserUseCase;
    protected $updateListUseCase;
    public function __construct(UpdateListUseCase $updateListUseCase)
    {
        $this->updateListUseCase = $updateListUseCase;
    }

    public function execute(Usuario $me, Lista $list, array $data)
    {
        $this->updateListUseCase->execute($me, $list, $data);
        return $this->success('Lista actualizada exitosamente', 200);
    }
}
