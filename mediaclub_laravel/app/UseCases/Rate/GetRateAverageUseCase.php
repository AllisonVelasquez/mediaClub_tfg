<?php
namespace App\UseCases\Rate;

use App\Repositories\Rate\RateRepositoryInterface;
use App\Models\Frame;
class GetRateAverageUseCase
{
    protected RateRepositoryInterface $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function execute(Frame $frame): float
    {
        return $this->rateRepository->getRateAverage($frame->frame_id);
    }
}
