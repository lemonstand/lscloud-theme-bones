# Design Decisions

## Naming

* id attributes inside a partial should be prefixed with the partial name
  followed by an underscore.

## Divisions

* A partial should not need to be in a specific context without documenting it.
  * This means the form element should be inside the partial that uses it.
