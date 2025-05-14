<?php
// app/Actions/User/UpdatePartialUserAction.php
namespace App\Actions\User;

use App\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UpdateUserAction
{
   protected $userRepository;

   public function __construct($userRepository)
   {
      $this->userRepository = $userRepository;
   }

   public function execute(array $data, $id): Usuario
   {
      try {
         return $this->userRepository->update($id, $data);
      } catch (ModelNotFoundException $e) {
         throw new ModelNotFoundException("Usuario no encontrado");
      }
   }
}
