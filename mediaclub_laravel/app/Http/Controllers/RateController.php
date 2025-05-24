<?php

namespace App\Http\Controllers;

use App\Models\Puntuacion;
use Illuminate\Http\Request;
use App\Models\Frame;

class RateController extends Controller
{
     public function getMyRates(Request $request)
    {
        $me = $request->user();
        return app(GetMyRatesAction::class)->execute($me);
    }

    public function addRate(CreateRateRequest $request, Frame $frame)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(CreateRateAction::class)->execute($me, $data, $frame);
    }
    public function editRate(Request $request, Puntuacion $rate)
    {
        $me = $request->user();
        return app(EditRateAction::class)->execute($me, $rate);
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
