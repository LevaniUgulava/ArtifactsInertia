<?php

use App\Http\Controllers\ChatController;

Route::prefix('{lang}')->middleware('auth:sanctum')->name('chat.')->group(function () {
    Route::post('/chat', [ChatController::class, 'openChat'])->name('open');
    Route::post('/chat/message', [ChatController::class, 'message'])->name('message');
    Route::post('/chat/{chat}/close', [ChatController::class, 'close'])->name('close');

});
