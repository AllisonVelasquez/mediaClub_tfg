<?php

namespace App\Http\Controllers;

use App\Actions\User\GetUserActivityAction;
use App\Models\Usuario;
use Illuminate\Http\Request;

class ActivityController extends Controller
{

    public function showUserActivity(Usuario $user)
    {
        return app(GetUserActivityAction::class)->execute($user);

    }
    public function showMyActivity(Request $request)
    {
        $me = $request->user();
        return app(GetUserActivityAction::class)->execute($me);
    }
}
