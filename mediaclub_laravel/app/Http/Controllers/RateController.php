<?php

namespace App\Http\Controllers;

use App\Models\Puntuacion;
use Illuminate\Http\Request;
use App\Models\Frame;
use App\Actions\Rate\GetMyRatesAction;
use App\Actions\Rate\AddRateAction;
use App\Actions\Rate\DeleteRateAction;
use App\Actions\Rate\EditRateAction;
use App\Actions\Rate\GetRateAverageAction;
use App\Http\Requests\RateRequest;

class RateController extends Controller
{
     public function getMyRates(Request $request)
    {
        $me = $request->user();
        return app(GetMyRatesAction::class)->execute($me);
    }

    public function addRate(RateRequest $request, Frame $frame)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(AddRateAction::class)->execute($me, $data, $frame);
    }
    public function editRate(RateRequest $request, Puntuacion $rate)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(EditRateAction::class)->execute($me, $data, $rate);
    }

    public function deleteRate(Request $request, Puntuacion $rate)
    {
        $me = $request->user();
        return app(DeleteRateAction::class)->execute($me, $rate);
    }

    public function getRateAverage(Frame $frame) {
        return app(GetRateAverageAction::class)->execute($frame);
    }
}
