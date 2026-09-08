---
paths:
  - app/Http/Middleware/SetLocale.php
---

# Middleware

## Keep forgetParameter('lang') in SetLocale
SetLocale forgets the {lang} route param after validating it (URL::defaults handles URL generation). Do not remove forgetParameter: it breaks positional controller injection on routes WITHOUT a lang param (product pages 404). Controllers on the signed verification route must NOT type-hint $lang — verifyEmail() already reflects this (it only takes User $user, string $hash).
