<?php
namespace App\UseCases\Rate;

use App\Models\Puntuacion;
use App\Repositories\Rate\RateRepositoryInterface;
use App\Models\Usuario;

class DeleteRateUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(Usuario $user, Puntuacion $rate): bool
    {
        $userId = $user->id;
        $rateId = $rate->id;
        return $this->rateRepository->deleteRate($userId, $rateId);
    }
}
