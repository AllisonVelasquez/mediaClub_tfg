<?php

namespace App\Http\Controllers;

use App\Actions\Activity\GetUserActivityAction; 
use App\Models\Usuario;
use Illuminate\Http\Request;

class ActivityController extends Controller
{

    public function showUserActivity(Usuario $usuario)
    {
        return app(GetUserActivityAction::class)->execute($usuario);

    }
    public function showMyActivity(Request $request)
    {
        $me = $request->user();
        return app(GetUserActivityAction::class)->execute($me);
    }
}
