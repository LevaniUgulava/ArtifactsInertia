# Add Sex Field to Products & CategoryResource

**Status:** Committed: (pending)

## Goal

Add a `sex` field (man/woman/unisex) to the Product model and create a Filament CategoryResource for managing product categories. Keep the existing many-to-many relationship between products and categories.

## Changes

### 1. Migration: Add `sex` column to products table
- New migration: `database/migrations/xxxx_add_sex_to_products_table.php`
- Column: `sex` enum with values `man`, `woman`, `unisex`, default `unisex`

### 2. Update Product Model (`app/Models/Product.php`)
- Add `sex` to `$fillable`
- Add `sex` => `'string'` cast (enum stored as string)

### 3. Create CategoryResource (`app/Filament/Resources/Categories/`)
- **CategoryResource.php** - Filament resource with model, navigation icon, form, table, pages
- **Schemas/CategoryForm.php** - Form with `name` TextInput (required, unique)
- **Tables/CategoriesTable.php** - Table with `name` column, timestamps
- **Pages/ListCategories.php** - List page with create header action
- **Pages/CreateCategory.php** - Create page
- **Pages/EditCategory.php** - Edit page with delete header action

### 4. Update ProductResource Form (`app/Filament/Resources/Products/Schemas/ProductForm.php`)
- Add `Select::make('sex')` with options: Man, Woman, Unisex
- Add `Select::make('categories')->relationship()->multiple()->searchable()->preload()`

### 5. Update ProductResource Table (`app/Filament/Resources/Products/Tables/ProductsTable.php`)
- Add `TextColumn::make('sex')` column

### 6. Update CatalogSeeder (`database/seeders/CatalogSeeder.php`)
- Add `'sex'` key to each product definition (assign appropriate man/woman based on collections)

## Verification
- Run `php artisan migrate`
- Run `php artisan test --compact`
- Check Filament admin panel: Categories resource visible, Product form has sex + categories fields
