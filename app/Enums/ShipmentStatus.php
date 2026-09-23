<?php

namespace App\Enums;

enum ShipmentStatus: string
{
    case Processing = 'processing';
    case InTransit = 'in_transit';
    case Delivered = 'delivered';
}
