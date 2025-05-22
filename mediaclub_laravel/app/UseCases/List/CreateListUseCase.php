<?php
namespace App\UseCases\List;

use App\Models\Listum;
use App\Repositories\List\ListRepositoryInterface;

class CreateListUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute($me_id,array $data):Listum
    {
        $data['usuario_id'] = $me_id;
        return $this->listRepository->create($data);
    }
}
