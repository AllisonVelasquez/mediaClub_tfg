<?php
namespace App\Services\User;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserValidator
{
    public static function validate(array $data): void
    {
        $validator = Validator::make($data, [
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
            throw new ValidationException($validator); //controlar la exception
        }
    }

    public static function validateUpdatePartial(array $data): void
    {
        $validator = Validator::make($data, [
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
            'alias' => 'nullable|string|max:255', // Puede ser nulo
            'email' => 'nullable|email|unique:users,email|max:255', // Puede ser nulo
            'passw' => ['nullable', 'string', Password::min(8)->mixedCase()->numbers()->symbols()], // Puede ser nulo
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
