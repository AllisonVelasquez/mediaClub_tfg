<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\UseCases\User\SearchUserByAliasUseCase;

class SearchUserByAliasAction
{
    use ApiResponse;
    protected $searchUserByAliasUseCase;
    public function __construct(SearchUserByAliasUseCase $searchUserByAliasUseCase)
    {
        $this->searchUserByAliasUseCase = $searchUserByAliasUseCase;
    }

    public function execute(array $data)
    {
        $users = $this->searchUserByAliasUseCase->execute($data['alias']);
        if($users->total() === 0) return $this->success('No se encontraron coincidencias', 200);
        return $this->success('Lista de usuarios recomendados',200,$users);
    }
}
