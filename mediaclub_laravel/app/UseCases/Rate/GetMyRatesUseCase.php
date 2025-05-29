<?php
namespace App\UseCases\Rate;

use App\Repositories\Rate\RateRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetMyRatesUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(int $userId): LengthAwarePaginator
    {
        return $this->rateRepository->getMyRates($userId);
    }
}
