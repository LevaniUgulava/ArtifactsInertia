---
paths:
  - app/Models/Product.php
  - 'app/Models/*.php'
---

# Models

## Product sex field convention
Products have a `sex` column (string: 'man', 'woman', 'unisex', default 'unisex'). Used for filtering products by target audience. Categories are product types (Dresses, Tops, etc.) managed via many-to-many relationship.

## Declare fillable/guarded/hidden via PHP attributes on models
Use #[Fillable([...])] and #[Hidden([...])] PHP attributes (from Illuminate\Database\Eloquent\Attributes) directly above the class, as User.php does. Never use $fillable/$hidden class properties.
