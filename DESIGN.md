# Design Decisions

## Naming

* Partial and page names should use dashes as word separators.
* id attributes inside a partial should be prefixed with the partial name
  followed by an underscore. This prevents ambiguity with the dashes in
  partial names, while still working well with JQuery.

## Divisions

* A partial should not need to be in a specific context without documenting it.
  * This means the form element should be inside the partial that uses it.
