<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
                'sometimes',
                'string',
                'unique:usuario,login_id',
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
            'correo' => 'sometimes|email|unique:usuario,correo|max:255',
            'alias' => 'sometimes|string|unique:usuario,alias|max:255',
            'bio' => 'sometimes|string|max:255',
            'redes' => 'sometimes|string|max:255',
            'foto_perfil' => 'sometimes|string|max:255',
            'contrasena' => ['sometimes', 'string', Password::min(8)->mixedCase()->numbers()->symbols()]
        ];
    }

    public function messages()
    {
        return [
            'login_id.unique' => 'El ID ya está en uso.',
            'correo.unique' => 'El correo ya está en uso.',
            'alias.unique' => 'El alias ya está en uso.',
            'contrasena.required' => 'La contraseña es obligatoria',
            'contrasena.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'contrasena.mixedCase' => 'La contraseña debe contener al menos una letra mayúscula y una minúscula.',
            'contrasena.numbers' => 'La contraseña debe contener al menos un número.',
            'contrasena.symbols' => 'La contraseña debe contener al menos un símbolo.',
            'bio.max' => 'La biografía no puede exceder los 255 caracteres.',
        ];
    }

}
