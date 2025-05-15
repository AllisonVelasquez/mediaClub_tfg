<?php

namespace App\Actions\User;

use Illuminate\Http\Request;
class LogoutUserAction
{

    public function execute(Request $request)
    {
        if (!$request->user()) {
            return false;
        }    
        $request->user()->currentAccessToken()->delete();
        return true;
    }
}
