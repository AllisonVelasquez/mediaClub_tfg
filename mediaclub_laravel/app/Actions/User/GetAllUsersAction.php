<?php
namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Collection;

class GetAllUsersAction
{
    public function execute(): Collection
    {
        return User::all();
    }
}
