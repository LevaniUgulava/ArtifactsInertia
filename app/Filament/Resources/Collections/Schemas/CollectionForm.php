<?php

namespace App\Filament\Resources\Collections\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CollectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                SpatieMediaLibraryFileUpload::make('image')
                    ->required()
                    ->collection('collection')
                    ->image()
                    ->imageEditor(),
                Select::make('products')
                    ->relationship('products', 'name')->multiple()
                    ->searchable()
                    ->preload(),
            ])->columns(1);
    }
}
