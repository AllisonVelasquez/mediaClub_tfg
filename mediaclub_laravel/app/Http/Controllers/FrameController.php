<?php

namespace App\Http\Controllers;

use App\Actions\Genre\GetAllGenresAction;
use App\Models\Frame;
use App\Services\External\TmdbService;

class FrameController extends Controller
{
    public function getAllGenres()
    {
        return app(GetAllGenresAction::class)->execute();
    }
    public function popular()
    {
        return app(TmdbService::class)->getMovies(1);
    }
    public function topRated()
    {
        return app(TmdbService::class)->getTopRated(1);
    }
    public function upcoming()
    {
        return app(TmdbService::class)->getUpcoming(1);
    }
    public function trending()
    {
        return app(TmdbService::class)->getTrending(1);
    }

    public function showFrameDetails(Frame $frame)
    {
        return app(TmdbService::class)->getDetails('movie', $frame->frame_id);
    }
    public function similar(Frame $frame)
    {
        return app(TmdbService::class)->getSimilar('movie',$frame->frame_id,1);
    }
}
