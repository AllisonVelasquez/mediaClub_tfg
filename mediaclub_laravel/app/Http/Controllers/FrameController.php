<?php

namespace App\Http\Controllers;

use App\Actions\Frame\FilterFramesAction;
use App\Actions\Frame\GetFrameDetailsAction;
use App\Actions\Frame\GetNowPlayingAction;
use App\Actions\Frame\GetPopularAction;
use App\Actions\Frame\GetReviewsAction;
use App\Actions\Frame\GetSimilarAction;
use App\Actions\Frame\GetTop10Action;
use App\Actions\Frame\SearchFrameByTitleAction;
use App\Actions\Genre\GetAllGenresAction;
use App\Http\Requests\FilterFramesRequest;
use App\Http\Requests\SearchFrameByTitleRequest;
use App\Models\Frame;

class FrameController extends Controller
{
    public function searchByTitle(SearchFrameByTitleRequest $request)
    {
        return app(SearchFrameByTitleAction::class)->execute($request->validated());
    }
    public function filterBy(FilterFramesRequest $request)
    {
        return app(FilterFramesAction::class)->execute($request->validated());
    }
    public function getAllGenres()
    {
        return app(GetAllGenresAction::class)->execute();
    }
    public function popular()
    {
        return app(GetPopularAction::class)->execute();
    }
    public function top10()
    {
        return app(GetTop10Action::class)->execute();
    }
    public function nowPlaying()
    {
        return app(GetNowPlayingAction::class)->execute();
    }

    public function showFrameDetails(Frame $frame)
    {
        return app(GetFrameDetailsAction::class)->execute($frame);
    }
    public function getReviews(Frame $frame)
    {
        return app(GetReviewsAction::class)->execute($frame);
    }
    public function similar(Frame $frame)
    {
        return app(GetSimilarAction::class)->execute($frame);
    }
    
}
