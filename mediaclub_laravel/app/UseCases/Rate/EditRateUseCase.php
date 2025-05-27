<?php
namespace App\UseCases\Rate;

use App\Models\Puntuacion;
use App\Repositories\Rate\RateRepositoryInterface;
use App\Models\Usuario;

class EditRateUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(Usuario $user, array $data, Puntuacion $rate): bool
    {
        $me = $user->usuario_id;
        $rate = $rate->puntuacion_id;
        $newRate = $data['puntuacion'];
        return $this->rateRepository->editRate($rate,$me,$newRate);
    }
}
