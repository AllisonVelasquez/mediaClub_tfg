<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateListRequest extends FormRequest
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
            'nombre_lista' => 'required|string|max:255',
            'publica' => 'required|boolean'
        ];
    }
    public function messages(): array
    {
        return [
            'publica.required' => 'El campo "publica" es obligatorio.',
            'publica.boolean'  => 'El campo "publica" debe ser verdadero o falso.',
            'nombre_lista.required' => 'El nombre de la lista es obligatorio.',
            'nombre_lista.string'   => 'El nombre de la lista debe ser una cadena de texto.',
            'nombre_lista.max'      => 'El nombre de la lista no puede tener más de 255 caracteres.',
        ];
    }
}
