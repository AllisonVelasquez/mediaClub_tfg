<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchUserByAliasRequest extends FormRequest
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
            'alias' => ['sometimes', 'string', 'max:100'], 
        ];
    }
    public function messages(): array
    {
        return [
            'alias.required' => 'El campo alias es obligatorio.',
            'alias.max' => 'El alias no puede tener más de 100 caracteres.',
        ];
    }
}
