import $ from 'jquery';

/**
 * Foundation 6 Equalizer sets height to 'auto' when there is only one item in a row.
 * When combined with flexbox styles, this causes issues with image heights not scaling
 * to match their widths (and instead expanding to their full original height).
 *
 * To counteract this, add data-equalizer-singleton-row-height-fix to the last cell in a grid.
 * This script will then duplicate that cell, account for any classes on elements within it
 * that may need to be ignored during height equalization, and set it to an opacity of 0.
 * When height calculations are not being performed, the duplicated cell is also set to
 * display: none via the 'hide' class, to eliminate unnecessary whitespace on the page.
 */
$('[data-equalizer-singleton-row-height-fix]').each((index, element) => {
  'use strict';

  const $targetElement = $(element);
  const $targetParentElement = $targetElement.parent();
  let calculationsInProgress = 0;
  let $fixElement = null;

  $(document).on('preequalizedrow.zf.equalizer', (event) => {
    if (!$fixElement) {
      $fixElement = $targetElement.clone();

      const $dataEqualizerIgnoreClassElements = $('[data-equalizer-ignore-class]');

      $dataEqualizerIgnoreClassElements.each((index, element) => {
        const $ignoreClassElement = $(element);
        const equalizerIgnoreClasses = $ignoreClassElement.data('equalizer-ignore-class');

        $ignoreClassElement.removeClass(equalizerIgnoreClasses);
      });

      $fixElement.addClass('equalizer-row-fix');

      $fixElement.appendTo($targetParentElement);
    }

    if (calculationsInProgress === 0) {
      $fixElement.removeClass('hide');
    }

    calculationsInProgress++;
  });

  $(document).on('postequalizedrow.zf.equalizer', (event) => {
    // Timeout appears to be needed, otherwise height calculation will treat
    // the temporary element as hidden.
    setTimeout(() => {
      calculationsInProgress--;

      if (calculationsInProgress < 1) {
        calculationsInProgress = 0;

        $fixElement.addClass('hide');
      }
    });
  });
});