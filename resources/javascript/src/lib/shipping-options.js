import $ from 'jquery';

$(document).on('change', 'input[name="shippingMethod"]', (event) => {
  'use strict';

  const $shippingInput = $(event.currentTarget);
  const $shippingOptionForm = $shippingInput.closest('.checkout-shipping-option-form');
  const $formSubmitButton = $shippingOptionForm.find('[type="submit"]');

  $formSubmitButton.prop('disabled', false);
});