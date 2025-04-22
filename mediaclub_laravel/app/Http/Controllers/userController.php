<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use App\Traits\ApiResponse;

class userController extends Controller
{
    use ApiResponse;

    public function index()
    {
        try {
            $users = User::all();

            if ($users->isEmpty()) {
                return $this->success('Lista de usuarios vacia');
            }
            return $this->success($users, 'Lista cargada');
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => [
                    'required',
                    'string',
                    'max:50',
                    function ($attribute, $value, $fail) {
                        if (preg_match('/\s/', $value)) {
                            $fail('El ID no debe contener espacios.');
                        }
                        if ($value !== strtolower($value)) {
                            $fail('El ID debe estar en minúsculas.');
                        }
                    },

                ],
                'alias' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email|max:255',
                'passw' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
            ]);

            if ($validator->fails()) {
                return $this->error('Error en la validación de datos', 400, $validator->errors());
            }

            $user = User::create([
                'id' => $request->id,
                'alias' => $request->alias,
                'email' => $request->email,
                'passw' => Hash::make($request->passw),
            ]);

            if (!$user) {
                return $this->error('Error al crear el usuario', 500);
            }

            return $this->success($user, 'Usuario creado exitosamente', 201);
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function show($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->error('Usuario no encontrado', 404);
            }
            return $this->success($user, 'Usuario encontrado');
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function delete($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->error('Usuario no encontrado', 404);
            }
            $user->delete();

            return $this->success('Usuario eliminado', 200);
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->error('Usuario no encontrado', 404);
            }

            $validator = Validator::make($request->all(), [
                'id' => [
                    'required',
                    'string',
                    'max:50',
                    function ($attribute, $value, $fail) {
                        if (preg_match('/\s/', $value)) {
                            $fail('El ID no debe contener espacios.');
                        }
                        if ($value !== strtolower($value)) {
                            $fail('El ID debe estar en minúsculas.');
                        }
                    },

                ],
                'alias' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email|max:255',
                'passw' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
            ]);

            if ($validator->fails()) {
                return $this->error('Error en la validación de datos', 400, $validator->errors());
            }

            $user->id = $request->id;
            $user->alias = $request->alias;
            $user->email = $request->email;
            $user->passw = Hash::make($request->passw);

            $user->save();

            return $this->success($user, 'Usuario actualizado', 200);
        } catch (Exception $e) {
            return $this->error();
        }
    }

    public function updatePartial(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->error('Usuario no encontrado', 404);
            }

            $validator = Validator::make($request->all(), [
                'id' => [
                    'string',
                    'max:50',
                    function ($attribute, $value, $fail) {
                        if (preg_match('/\s/', $value)) {
                            $fail('El ID no debe contener espacios.');
                        }
                        if ($value !== strtolower($value)) {
                            $fail('El ID debe estar en minúsculas.');
                        }
                    },

                ],
                'alias' => 'string|max:255',
                'email' => 'email|unique:users,email|max:255',
                'passw' => ['string', Password::min(8)->mixedCase()->numbers()->symbols()],
            ]);

            if ($validator->fails()) {
                return $this->error('Error en la validación de datos', 400, $validator->errors());
            }

            $data = $request->only(['id', 'alias', 'email']);

            if ($request->has('passw')) {
                $data['passw'] = Hash::make($request->passw);
            }

            $user->update($data);

            $user->save();

            return $this->success($user, 'Usuario actualizado');
        } catch (Exception $e) {
            return $this->error();
        }
    }
}
