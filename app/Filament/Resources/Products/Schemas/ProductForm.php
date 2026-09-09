<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Models\Variant;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Product')
                    ->schema([
                        TextInput::make('spu')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('name')
                            ->required(),
                        TextInput::make('eyebrow')
                            ->required(),
                        TextInput::make('badge'),
                        Select::make('sex')
                            ->options([
                                'man' => 'Man',
                                'woman' => 'Woman',
                                'unisex' => 'Unisex',
                            ])
                            ->default('unisex')
                            ->required(),
                        Select::make('categories')
                            ->relationship('categories', 'name')
                            ->multiple()
                            ->searchable()
                            ->preload(),
                        Textarea::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ])
                    ->columns(1),
                Section::make('Benefits')
                    ->schema([
                        Repeater::make('benefits')
                            ->schema([
                                TextInput::make('label')
                                    ->required(),
                                TextInput::make('icon')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ]),
                Section::make('Details')
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        Repeater::make('details')
                            ->schema([
                                TextInput::make('title')
                                    ->required(),
                                TagsInput::make('paragraphs'),
                                TagsInput::make('bullets'),
                            ])
                            ->columns(1)
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
                Section::make('Variants')
                    ->description('Add each size and color combination. Every variant can have its own image gallery.')
                    ->schema([
                        Repeater::make('variants')
                            ->label('Product variants')
                            ->relationship()
                            ->collapsible()
                            ->collapsed()
                            ->schema([
                                TextInput::make('color')
                                    ->required(),
                                TextInput::make('color_label')
                                    ->required(),
                                TextInput::make('color_hex')
                                    ->required()
                                    ->regex('/^#[0-9A-Fa-f]{6}$/'),
                                TextInput::make('size')
                                    ->required(),
                                TextInput::make('price')
                                    ->numeric()
                                    ->minValue(0)
                                    ->required(),
                                TextInput::make('stock')
                                    ->numeric()
                                    ->integer()
                                    ->minValue(0)
                                    ->required(),
                                SpatieMediaLibraryFileUpload::make('images')
                                    ->label('Variant images')
                                    ->disk('public')
                                    ->directory('product-variants')
                                    ->image()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->maxSize(5120)
                                    ->multiple()
                                    ->reorderable()
                                    ->panelLayout('grid')
                                    ->maxFiles(10)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(1)
                            ->itemLabel(fn (array $state): ?string => $state['sku'] ?? null)
                            ->mutateRelationshipDataBeforeFillUsing(function (array $data): array {
                                $variant = Variant::query()
                                    ->with('media')
                                    ->find($data['id'] ?? null);

                                $data['images'] = $variant?->getMedia('images')
                                    ->map(fn (Media $media): string => $media->getPathRelativeToRoot())
                                    ->all() ?? [];

                                return $data;
                            })
                            ->mutateRelationshipDataBeforeCreateUsing(function (array $data): array {
                                unset($data['images']);

                                return $data;
                            })
                            ->mutateRelationshipDataBeforeSaveUsing(function (array $data): array {
                                unset($data['images']);

                                return $data;
                            })
                            ->afterCreate(function (array $data, Variant $record): void {
                                self::syncVariantImages($record, $data['images'] ?? []);
                            })
                            ->afterUpdate(function (array $data, Variant $record): void {
                                self::syncVariantImages($record, $data['images'] ?? []);
                            })
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    /**
     * @param  array<int, mixed>  $images
     */
    private static function syncVariantImages(Variant $variant, array $images): void
    {
        $imagePaths = collect(Arr::wrap($images))
            ->filter(fn (mixed $path): bool => is_string($path) && filled($path))
            ->values();

        $mediaByPath = $variant->getMedia('images')
            ->keyBy(fn (Media $media): string => $media->getPathRelativeToRoot());

        $imagePaths->each(function (string $path, int $order) use ($variant, $mediaByPath): void {
            if ($mediaByPath->has($path)) {
                $media = $mediaByPath->get($path);
                $media->order_column = $order + 1;
                $media->save();

                return;
            }

            if (! Storage::disk('public')->exists($path)) {
                return;
            }

            $variant->addMediaFromDisk($path, 'public')
                ->setOrder($order + 1)
                ->toMediaCollection('images');

            Storage::disk('public')->delete($path);
        });

        $imagePaths = $imagePaths->all();

        $mediaByPath
            ->reject(fn (Media $media, string $path): bool => in_array($path, $imagePaths, true))
            ->each(function (Media $media): void {
                $media->delete();
            });
    }
}
