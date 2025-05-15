<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class DeleteUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
            'contrasena' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
        ];
    }

    public function messages()
    {
        return [
            'login_id.required' => 'El ID es obligatorio.',
            'contrasena.required' => 'La contraseña es obligatoria.',
            'contrasena.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'contrasena.mixedCase' => 'La contraseña debe contener al menos una letra mayúscula y una minúscula.',
            'contrasena.numbers' => 'La contraseña debe contener al menos un número.',
            'contrasena.symbols' => 'La contraseña debe contener al menos un símbolo.',
            'login_id.regex' => 'El ID solo puede contener letras y números.',
            'login_id.string' => 'El ID debe ser una cadena de texto.',
        ];
    }

}
