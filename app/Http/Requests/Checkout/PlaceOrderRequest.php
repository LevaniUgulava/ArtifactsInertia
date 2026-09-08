<?php

namespace App\Http\Requests\Checkout;

use Illuminate\Foundation\Http\FormRequest;

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
            'postal_code' => ['required', 'string', 'max:32'],
            'country' => ['required', 'string', 'max:2'],
            'phone' => ['required', 'string', 'max:32'],
            'delivery_method' => ['required', 'string', 'in:express,standard,next_day'],
            'payment_method' => ['required', 'string', 'in:card,apple_pay,google_pay,paypal'],
            'terms' => ['accepted'],
            'card_number' => ['prohibited'],
            'cvv' => ['prohibited'],
            'cvc' => ['prohibited'],
            'expiry_date' => ['prohibited'],
            'name_on_card' => ['prohibited'],
        ];
    }
}
