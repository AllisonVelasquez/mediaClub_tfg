<?php

namespace App\Http\Controllers;

use App\Actions\User\DeleteUserAction;
use App\Actions\User\FindUserByIdAction;
use App\Actions\User\GetAllUsersAction;
use App\Actions\User\UpdateUserAction;
use App\Actions\User\AddUserAction;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use App\Traits\ApiResponse;
use App\Validators\UserValidator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class userController extends Controller
{
    use ApiResponse;

    public function index(GetAllUsersAction $action)
    {
        try {
            $users = $action->execute();

            if ($users->isEmpty()) {
                return $this->success('Lista de usuarios vacia');
            }
            return $this->success($users, 'Lista cargada');
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function store(Request $request, AddUserAction $action)
    {
        try {
            $user = $action->execute($request->all());

            return $this->success($user, 'Usuario creado exitosamente', 201);
        } catch (ValidationException $e) {
            return $this->error('Error en la validación de datos', 400, $e->errors());
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function show($id, FindUserByIdAction $action)
    {
        try {
            $user = $action->execute($id);
            return $this->success($user, 'Usuario encontrado');
        } catch (ModelNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        } catch (\Exception $e) {
            return $this->error('Error inesperado', 500);
        }
    }

    public function delete($id, DeleteUserAction $action)
    {
        try {
            $action->execute($id);
            return $this->success('Usuario eliminado', 200);
        } catch (ModelNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        } catch (\Exception $e) {
            return $this->error('Error inesperado', 500);
        }
    }

    public function update(Request $request, $id, UpdateUserAction $action)
    {
        try {
            $user = $action->execute($id, $request->all());

            return $this->success($user, 'Usuario actualizado', 200);
        } catch (ModelNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        } catch (ValidationException $e) {
            return $this->error('Error en la validación de datos', 400, $e->errors());
        } catch (\Exception $e) {
            return $this->error('Error inesperado', 500);
        }
    }

    public function updatePartial(Request $request, $id, UpdateUserAction $action)
    {
        try {
            $user = $$action->execute($request->all(), $id);

            return $this->success($user, 'Usuario actualizado correctamente', 200);
        } catch (ModelNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        } catch (ValidationException $e) {
            return $this->error('Error en la validación de datos', 400, $e->errors());
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 500);
        }
    }
}
