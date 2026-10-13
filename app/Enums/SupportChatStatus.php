<?php

namespace App\Enums;

enum SupportChatStatus: string
{
    case Pending = 'pending';
    case Open = 'open';
    case Closed = 'close';
}
