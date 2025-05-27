<?php

namespace App\Http\Controllers;

use App\Actions\Genre\GetAllGenresAction;
use Illuminate\Http\Request;

class FrameController extends Controller
{
    public function getAllGenres(){
        return app(GetAllGenresAction::class)->execute();
    }
}
