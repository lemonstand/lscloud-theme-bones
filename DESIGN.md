# Design Decisions

## Naming

* Partial and page names should use dashes as word separators.
* id attributes inside a partial should be prefixed with the partial name
  followed by an underscore. This prevents ambiguity with the dashes in
  partial names, while still working well with JQuery.
* Classes for the elements immediately containing Twig variables are named
  after the Twig variables, with camelCase or underscore\_separations replaced
  with dashed-separations.
* Classes for the main sections of partials or pages are named after those
  partials or pages.
* Other sections are named with hopefully understandable names, always with
  dashed-separations.

## Divisions

* A partial should not need to be in a specific context without documenting it.
  * This means the form element should be inside the partial that uses it.

## Layout

* Buttons are laid out according to 
  [https://material.io/guidelines/components/buttons.html#buttons-usage](Material Design guidelines).
  * In summary:
    * Forms: buttons on the left, affirmative on the left, dismissive on the
      right.
    * Cards: buttons on the left, or as suited
    * Dialogs: buttons on the right, affirmative on the right, dismissive on the
      left.
