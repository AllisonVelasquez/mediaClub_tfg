<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\Application\UseCases\User\GetUserProfileUseCase;

class GetUserProfileAction
{
    use ApiResponse;
    protected $getUserProfileUseCase;
    public function __construct(GetUserProfileUseCase $getUserProfileUseCase)
    {
        $this->getUserProfileUseCase = $$getUserProfileUseCase;
    }

    public function execute(array $data)
    {
        $userProfileData = $this->getUserProfileUseCase->execute($data['alias']);
        return $this->success('Usuario encontrado', 200, $userProfileData);
    }
}
