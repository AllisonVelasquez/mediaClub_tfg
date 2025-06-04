<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterUserRequest extends FormRequest
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
                'unique:usuario,login_id',
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
            'contrasena' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
            'contrasena_confirmation' => 'required|same:contrasena',
            'alias' => 'required|string|unique:usuario,alias|max:255',
        ];
    }

     public function messages()
    {
        return [
            'login_id.required' => 'El login_id es obligatorio.',
            'login_id.unique' => 'El login_id ya está en uso.',
            'login_id.max' => 'El login_id no puede tener más de 100 caracteres.',
            'login_id.regex' => 'El login_id solo puede contener letras y números.',
            'correo.required' => 'El correo electrónico es obligatorio.',
            'correo.email' => 'El correo electrónico no es válido.',
            'correo.unique' => 'El correo electrónico ya está en uso.',
            'contrasena.required' => 'La contraseña es obligatoria.',
            'contrasena.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'contrasena.mixedCase' => 'La contraseña debe contener al menos una letra mayúscula y una minúscula.',
            'contrasena.numbers' => 'La contraseña debe contener al menos un número.',
            'contrasena.symbols' => 'La contraseña debe contener al menos un símbolo.',
            'contrasena_confirmation.required' => 'La confirmación de la contraseña es obligatoria.',
            'contrasena_confirmation.same' => 'Las contraseñas no coinciden.',
            'alias.required' => 'El alias es obligatorio.',
        ];
    }

}
