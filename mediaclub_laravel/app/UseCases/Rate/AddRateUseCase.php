<?php
namespace App\UseCases\Rate;

use App\Repositories\Rate\RateRepositoryInterface;
use App\Models\Usuario;
use App\Models\Frame;
use App\Models\Puntuacion;

class AddRateUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(Usuario $user, array $data, Frame $frame): Puntuacion
    {
        $data['usuario_id'] = $user->id;
        $data['frame_id'] = $frame->id;
        return $this->rateRepository->addRate($data);
    }
}
