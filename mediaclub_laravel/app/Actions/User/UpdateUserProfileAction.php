<?php
//nos falta, hay que revisar que se envie el id del user


namespace App\Actions\User;

use App\Models\Usuario;
use App\Services\User\AuthService;

class UpdateUserProfileAction
{

    public function execute(Usuario $user, array $data) 
    {
        return app(AuthService::class)->update($user->usuario_id, $data);
    }

}
