<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchFrameByTitleRequest extends FormRequest
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
            'titulo' => 'required|string|max:100'
        ];
    }
    public function messages(): array
    {
        return [
            'titulo.required' => 'El campo título es obligatorio.',
            'titulo.max' => 'El título no puede tener más de 100 caracteres.',
        ];
    }
}
