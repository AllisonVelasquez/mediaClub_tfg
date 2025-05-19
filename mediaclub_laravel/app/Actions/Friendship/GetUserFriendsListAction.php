<?php
namespace App\Actions\Friendship;

use App\Application\UseCases\Friendship\GetUserFriendsListUseCase;
use App\Traits\ApiResponse;

class GetUserFriendsListAction{
use ApiResponse;
    protected $getUserFriendsListUseCase;

    // public function __construct(GetUserFriendsListUseCase $getUserFriendsListUseCase) {
    //     $this->getUserFriendsListUseCase = $getUserFriendsListUseCase;
    // }
   
}