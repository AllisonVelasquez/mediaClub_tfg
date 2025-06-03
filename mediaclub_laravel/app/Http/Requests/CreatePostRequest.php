<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
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
            'contenido' => 'required|string|max:1500',
            'publico' => 'required|boolean'
        ];
    }
    public function messages()
    {
        return [
            'contenido.required' => 'El campo contenido es obligatorio.',
            'contenido.string' => 'El contenido debe ser un texto válido.',
            'contenido.max' => 'El contenido no puede exceder los 1500 caracteres.',
            'publico.required' => 'Debes especificar si este post es publico o no.',
            'publico.boolean' => 'El campo publico debe ser verdadero o falso.',
        ];
    }
}
