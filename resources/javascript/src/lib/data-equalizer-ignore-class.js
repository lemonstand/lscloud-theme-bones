import $ from 'jquery';

/**
 * data-equalizer-ignore-class takes a string of classes that should be applied to an element that
 * uses data-equalizer-watch, but which should be ignored while the height calculations are being
 * performed.
 */
$('[data-equalizer-ignore-class]').each((index, element) => {
  'use strict';

  const $targetElement = $(element);
  const equalizerId = $targetElement.data('equalizer-watch');
  const $equalizerContainer = $targetElement.closest('[data-equalizer="' + equalizerId + '"]');
  const equalizerIgnoreClasses = $targetElement.data('equalizer-ignore-class');
  let calculationInProgress = false;

  $equalizerContainer.on('preequalizedrow.zf.equalizer', (event) => {
    calculationInProgress = true;

    $targetElement.removeClass(equalizerIgnoreClasses);
  });

  $equalizerContainer.on('postequalizedrow.zf.equalizer', (event) => {
    calculationInProgress = false;

    // Timeout appears to be needed, otherwise height calculation still includes the classes
    // that are supposed to be ignored.
    setTimeout(() => {
      if (!calculationInProgress) {
        $targetElement.addClass(equalizerIgnoreClasses);
      }
    });
  });

  $targetElement.addClass(equalizerIgnoreClasses);
});