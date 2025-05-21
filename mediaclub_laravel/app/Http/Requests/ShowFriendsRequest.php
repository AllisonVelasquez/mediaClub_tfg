<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowFriendsRequest extends FormRequest
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
            'alias' => 'required|string|max:255|exists:usuarios,alias',
        ];
    }
    public function messages()
    {
        return [
            'alias.required' => 'El alias es obligatorio.',
            'alias.string' => 'El alias debe ser una cadena de texto.',
            'alias.max' => 'El alias no puede tener más de 255 caracteres.',
        ];
    }
}
