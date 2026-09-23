<?php

namespace App\Enums;

enum DeliveryType: string
{
    case Express = 'express';
    case Standard = 'standard';
    case NextDay = 'next_day';
}
