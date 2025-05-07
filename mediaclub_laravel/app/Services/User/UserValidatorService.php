<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserValidatorService
{
    public static function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'login_id' => [
                'required',
                'string',
                'max:100',
                function ($attribute, $value, $fail) {
                    if (preg_match('/\s/', $value)) {
                        $fail('El ID no debe contener espacios.');
                    }
                    if ($value !== strtolower($value)) {
                        $fail('El ID debe estar en minúsculas.');
                    }
                },
            ],
            'correo' => 'required|email|unique:usuario,correo|max:255',
            'contrasena_hash' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
            'alias' => 'required|string|max:255',
            'bio' => 'nullable|string|max:255',
            'redes' => 'nullable|string|max:255',
            'foto_perfil' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator); //controlar la exception
        }
    }

    public static function validateUpdatePartial(array $data): void
    {
        $validator = Validator::make($data, [
            'login_id' => [
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
            'correo' => 'nullable|email|unique:usuario,email|max:255',
            'contrasena_hash' => ['nullable', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
            'alias' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:255',
            'redes' => 'nullable|string|max:255',
            'foto_perfil' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
