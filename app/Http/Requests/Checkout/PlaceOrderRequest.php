<?php

namespace App\Http\Requests\Checkout;

use App\Enums\PaymentType;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlaceOrderRequest extends FormRequest
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
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'phone' => [
                'required',
                'string',
                'max:32',
                function (string $attribute, mixed $value, Closure $fail): void {
                    $phone = preg_replace('/[\s\-.()]/', '', (string) $value);

                    if (! preg_match('/^\+995[3-9]\d{8}$/', (string) $phone)) {
                        $fail(__('validation.phone_georgia'));
                    }
                },
            ],
            'delivery_method' => ['required', 'string', Rule::exists('delivery_types', 'value')],
            'payment_method' => ['required', 'string', Rule::enum(PaymentType::class)],
            'promo_code' => ['nullable', 'string', 'max:32'],
            'terms' => ['accepted'],
            'card_number' => ['prohibited'],
            'cvv' => ['prohibited'],
            'cvc' => ['prohibited'],
            'expiry_date' => ['prohibited'],
            'name_on_card' => ['prohibited'],
        ];
    }
}
