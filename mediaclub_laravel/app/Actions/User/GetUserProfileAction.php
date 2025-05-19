<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\Application\UseCases\User\GetUserProfileUseCase;

class GetUserProfileAction
{
    use ApiResponse;
    public function execute(array $data)
    {
        $userProfileData = app(GetUserProfileUseCase::class)->execute($data['alias']);
        return $this->success('Usuario encontrado', 200, $userProfileData);  
    }
}        

