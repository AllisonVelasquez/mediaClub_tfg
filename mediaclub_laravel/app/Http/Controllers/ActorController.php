<?php

namespace App\Http\Controllers;

use App\Actions\Actor\GetActorByIdAction;
use App\Actions\Actor\GetAllActorsAction;
use App\Actions\Actor\GetFilmographyAction;
use App\Actions\Actor\SearchByNameAction;
use App\Http\Requests\SearchActorByNameRequest;
use App\Models\Actor;

class ActorController extends Controller
{
    public function searchByName(SearchActorByNameRequest $request) 
    {
        return app(SearchByNameAction::class)->execute($request->validated());
    }
    public function showActor(Actor $actor) 
    {
        return app(GetActorByIdAction::class)->execute($actor);
    }
    public function getFilmography(Actor $actor) 
    {
        return app(GetFilmographyAction::class)->execute($actor);
    }
    public function getAll() 
    {
        return app(GetAllActorsAction::class)->execute();
    }
}
