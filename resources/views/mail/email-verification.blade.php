<x-mail::message>
# Verify your email address

Hi {{ $name }},

Thanks for joining ARTIFACTS. Please confirm your email address to activate your account and unlock exclusive drops, saved items, and faster checkout.

<x-mail::button :url="$verificationUrl">
Verify Email Address
</x-mail::button>

If you did not create this account, no further action is required.

Regards,<br>
The ARTIFACTS Team
</x-mail::message>
