<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterFramesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'genero_id' => ['sometimes', 'integer', 'exists:generos,id'],
            'duracion' => ['sometimes', 'integer', 'min:1'],
            'fecha_estreno' => ['sometimes', 'integer', 'digits:4'],
            'promedio_votos_muvis' => ['sometimes', 'in:asc,desc'],
            'promedio_votos_tmdb' => ['sometimes', 'in:asc,desc'],
        ];
    }
    public function messages()
    {
        return [
            'genero_id.integer' => 'El género debe ser un número válido.',
            'genero_id.exists' => 'El género seleccionado no existe.',
            'duracion.integer' => 'La duración debe ser un número entero.',
            'duracion.min' => 'La duración debe ser al menos 1 minuto.',
            'fecha_estreno.integer' => 'El año de estreno debe ser un número.',
            'feacha_estreno.digits' => 'El año de estreno debe tener 4 dígitos.',
            'promedio_votos_muvis.in' => 'El promedio de votos debe ser asc o desc.',
            'promedio_votos_tmdb.in' => 'El promedio de votos debe ser asc o desc.',
        ];
    }
}
