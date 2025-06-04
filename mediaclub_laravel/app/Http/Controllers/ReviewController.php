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

    // public function getReviewsByUser(Usuario $user) { //esto en caso de ver los amigos
    //     return app(GetReviewsByUserAction::class)->execute($user);
    // }

    public function getReview(Resena $review)
    {
        return app(GetReviewAction::class)->execute($review);
    }
    public function addReview(CreateReviewRequest $request, Frame $frame)
    {
        $me = $request->user();
        $data = $request->validated();
        return app(CreateReviewAction::class)->execute($me, $data, $frame);
    }

    public function deleteReview(Request $request, Resena $review)
    {
        $me = $request->user();
        return app(DeleteReviewAction::class)->execute($me, $review);
    }

    public function getMyReviewsByFrame(Request $request, Frame $frame) {
        $me = $request->user();
        return app(GetMyReviewsByFrameAction::class)->execute($me, $frame);
    }

    public function getReviewsByFrame(Frame $frame) {
        return app(GetReviewsByFrameAction::class)->execute($frame);
    }
}
