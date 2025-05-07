<?php
namespace App\Actions\User;

use App\Models\Usuario;
use Illuminate\Support\Collection;

class GetAllUsersAction
{
    public function execute(): Collection
    {
        return Usuario::all();
    }
}
