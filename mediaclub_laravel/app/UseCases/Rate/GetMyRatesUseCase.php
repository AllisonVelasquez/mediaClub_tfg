<?php
namespace App\UseCases\Rate;

use App\Repositories\Rate\RateRepositoryInterface;
use Illuminate\Support\Collection;

class GetMyRatesUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(int $userId): Collection
    {
        return $this->rateRepository->getMyRates($userId);
    }
}
