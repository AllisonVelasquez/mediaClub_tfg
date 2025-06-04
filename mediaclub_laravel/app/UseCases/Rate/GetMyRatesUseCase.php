<?php
namespace App\UseCases\Rate;

use App\Repositories\Rate\RateRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Usuario;

class GetMyRatesUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(Usuario $user): LengthAwarePaginator
    {
        return $this->rateRepository->getMyRates($user->id);
    }
}
