<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'chatId' => ['required', 'string'],
            'message' => ['required', 'string'],
            'imageUrls' => ['nullable', 'array'],
            'imageUrls.*' => ['string'],
        ];
    }
}
