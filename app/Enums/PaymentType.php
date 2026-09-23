<?php

namespace App\Enums;

enum PaymentType: string
{
    case Card = 'card';
    case Cash = 'cash';
}
