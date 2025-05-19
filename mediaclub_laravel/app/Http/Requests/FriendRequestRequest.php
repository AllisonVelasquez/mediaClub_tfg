<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FriendRequestRequest extends FormRequest
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
            'alias' => ['required', 'exists:usuarios,id']
        ];
    }

    public function messages(): array
    {
        return [
        'alias.required'   => 'El destinatario es obligatorio.',
        'alias.exists'     => 'El destinatario no existe.'
    ];
    }
}
