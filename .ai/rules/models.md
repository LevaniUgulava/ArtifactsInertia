---
paths:
  - app/Models/Product.php
---

# Models

## Product sex field convention
Products have a `sex` column (string: 'man', 'woman', 'unisex', default 'unisex'). Used for filtering products by target audience. Categories are product types (Dresses, Tops, etc.) managed via many-to-many relationship.
