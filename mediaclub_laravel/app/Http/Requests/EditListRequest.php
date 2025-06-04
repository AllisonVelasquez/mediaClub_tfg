<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditListRequest extends FormRequest
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
            'publica' => 'simetimes|boolean',
            'nombre_lista' => 'simetimes|string|max:255'
        ];
    }
    public function messages(): array
    {
        return [
            'publica.boolean' => 'El campo "publica" debe ser verdadero o falso.',
            'nombre_lista.string' => 'El nombre de la lista debe ser una cadena de texto.',
            'nombre_lista.max' => 'El nombre de la lista no puede tener más de 255 caracteres.',
        ];
    }
}
