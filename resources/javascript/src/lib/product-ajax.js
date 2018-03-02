import $ from 'jquery';

$(document).on('change', '.product-form [name^="options"], .product-form [name^="extras"]',
    (event) => {
  'use strict';

  const $triggerElement = $(event.currentTarget);
  const $productContainer = $triggerElement.closest('.product');
  const $form = $triggerElement.closest('form');

  $.ajax({
    data: $form.serialize(),
    type: 'POST',
    url: window.location.href,
    headers: {
      'X-Event-Handler': 'shop:product',
      'X-Partials': 'product',
      'X-Requested-With': 'XMLHttpRequest'
    },
    success: (data) => {
      $productContainer.html(data.product);
      $productContainer.foundation();
    }
  });
});