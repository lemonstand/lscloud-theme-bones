import $ from 'jquery';

/**
 * How to use data-mirror:
 *
 * data-mirror:
 *     Place on the element which will contain all of the data-mirror-watchers.
 *     Use any string to uniquely identify the mirror (in case there are multiple)
 * data-mirror-state:
 *     Either on or off. Set this to your initial desired value.
 * data-mirror-toggler:
 *     Place on the element which will toggle the mirror on/off.
 *     (doesn't have to be a child of the data-mirror element)
 *     Use the same string used in data-mirror to pair it with the correct mirror.
 * data-mirror-watcher:
 *     Place on any inputs which should be part of the mirror.
 *     (must be children of the data-mirror element)
 *     Use the same string used in data-mirror to pair it with the correct mirror.
 * data-mirror-source:
 *     Place alongside the data-mirror-watcher attribute.
 *     Use the id of the input that this input's value should be sourced from.
 *
 * Example Usage:
 * <div data-mirror="some-identifier" data-mirror-state="on">
 *   <input type="checkbox" data-mirror-toggler="some-identifier" checked/>
 *   <input id="some-id"/>
 *   <input data-mirror-watcher="some-identifier" data-mirror-source="some-id"/>
 * </div>
 */

$('[data-mirror]').each((index, element) => {
  'use strict';

  const $dataMirrorContainer = $(element);
  const dataMirrorId = $dataMirrorContainer.data('mirror');
  const $dataMirrorWatchers =
      $dataMirrorContainer.find('[data-mirror-watcher="' + dataMirrorId + '"]');
  const mirrorStartedOn = $dataMirrorContainer.data('mirror-state') === 'on';
  const $mirrorToggler = $('[data-mirror-toggler="' + dataMirrorId + '"]');

  $mirrorToggler.change((event) => {
    const newMirrorState = $mirrorToggler.is(':checked') ? 'on': 'off';

    $dataMirrorContainer.data('mirror-state', newMirrorState);
  });

  $dataMirrorWatchers.each((index, element) => {
    const $watcher = $(element);
    const mirrorSourceSelector = '#' + $watcher.data('mirror-source');
    const $mirrorSource = $(mirrorSourceSelector);

    $mirrorToggler.change((event) => {
      if ($mirrorToggler.is(':checked')) {
        _mirrorElement();
      }
    });

    $mirrorSource.on('change', (event) => {
      const mirrorOn = $dataMirrorContainer.data('mirror-state') === 'on';

      if (mirrorOn) {
        _mirrorElement();
      }
    });

    if (mirrorStartedOn) {
      _mirrorElement();
    }

    function _mirrorElement() {
      if ($watcher.is('select') && $mirrorSource.is('select')) {
        $watcher.html($mirrorSource.html());
      }

      $watcher.val($mirrorSource.val());
    }
  });
});