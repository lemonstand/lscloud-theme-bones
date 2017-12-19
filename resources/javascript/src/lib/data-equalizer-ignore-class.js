import $ from 'jquery';
import * as _ from 'lodash';

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
  const _addIgnoredClassesDebounced = _.debounce(_addIgnoredClasses, 250);
  let calculationsInProgress = 0;

  $equalizerContainer.on('preequalizedrow.zf.equalizer', (event) => {
    calculationsInProgress++;

    $targetElement.removeClass(equalizerIgnoreClasses);
  });

  $equalizerContainer.on('postequalizedrow.zf.equalizer', (event) => {
    calculationsInProgress--;

    // Timeout appears to be needed, otherwise height calculation still includes the classes
    // that are supposed to be ignored.
    setTimeout(() => {
      if (calculationsInProgress < 1) {
        calculationsInProgress = 0;

        _addIgnoredClassesDebounced();
      }
    });
  });

  $targetElement.addClass(equalizerIgnoreClasses);

  function _addIgnoredClasses() {
    $targetElement.addClass(equalizerIgnoreClasses);
  }
});