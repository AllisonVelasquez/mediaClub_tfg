<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\Review\GetReviewsByUserAction;
use App\Http\Requests\CreateReviewRequest;
use App\Actions\Review\GetReviewAction;
use App\Actions\Review\CreateReviewAction;
use App\Models\Frame;
use App\Models\Resena;
use App\Actions\Review\DeleteReviewAction;
use App\Actions\Review\GetMyReviewsByFrameAction;
use App\Actions\Review\GetReviewsByFrameAction;

class ReviewController extends Controller
{
    public function getMyReviews(Request $request)
    {
        $me = $request->user();
        return app(GetReviewsByUserAction::class)->execute($me);
    }

    public function getReview(Resena $resena)
    {
        return app(GetReviewAction::class)->execute($resena);
    }
    public function addReview(CreateReviewRequest $request, Frame $frame)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(CreateReviewAction::class)->execute($me, $data, $frame);
    }

    public function deleteReview(Request $request, Resena $resena)
    {
        $me = $request->user();
        return app(DeleteReviewAction::class)->execute($me, $resena);
    }

    public function getMyReviewsByFrame(Request $request, Frame $frame) {
        $me = $request->user();
        return app(GetMyReviewsByFrameAction::class)->execute($me, $frame);
    }
}
