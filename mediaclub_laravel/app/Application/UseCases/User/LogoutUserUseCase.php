<?php
namespace App\Application\UseCases\User;

class LogoutUserUseCase
{
    public function execute($user)
    {
        if (!$user) {
            return false;
        }
        $user->currentAccessToken()->delete();
        return true;
    }
}
