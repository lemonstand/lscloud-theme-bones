import $ from 'jquery';

$(document).ajaxSuccess((event, xhr, opts, data) => {
  'use strict';

  const isRevisit = opts.data === 'nextStep=shipping_method';

  if (!data || !data['checkout-steps'] || isRevisit) {
    return;
  }

  const $shippingMethodForm = $('.checkout-shipping-option-form');
  const $shippingMethodAutoSubmitRadioButtons =
      $shippingMethodForm.find('[data-shipping-method-auto-submit]');

  if ($shippingMethodAutoSubmitRadioButtons.length === 1) {
    $shippingMethodAutoSubmitRadioButtons.click();
    $shippingMethodForm.submit();
  }
});