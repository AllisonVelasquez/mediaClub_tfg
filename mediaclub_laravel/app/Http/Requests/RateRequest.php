<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RateRequest extends FormRequest
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
            'puntuacion' => [
                'required',
                'numeric',
                'between:1,10',
                'regex:/^\d+(\.\d)?$/'
            ],
        ];
    }

    public function messages()
    {
        return [
            'puntuacion.required' => 'La puntuación es obligatoria.',
            'puntuacion.numeric' => 'La puntuación debe ser un número válido.',
            'puntuacion.between' => 'La puntuación debe estar entre 1 y 10.',
            'puntuacion.regex' => 'La puntuación debe tener máximo un decimal (ejemplo: 7 o 7.5).'
        ];
    }
}
