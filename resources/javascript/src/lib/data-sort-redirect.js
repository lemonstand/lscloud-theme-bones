import $ from 'jquery';
import * as _ from 'lodash';

$(document).on('change', '[data-sort-redirect]', (event) => {
  'use strict';

  const $sortElement = $(event.currentTarget);
  const sortParams = $sortElement.val().split('&');
  const baseUrl = window.location.protocol + '//' + window.location.host;
  const path = window.location.pathname;
  const searchParams = _.reduce(sortParams, (searchParams, sortParam, index) => {
    searchParams = _addUrlParam(searchParams, sortParam);

    return searchParams;
  }, window.location.search);

  window.location = baseUrl + path + searchParams;

  /**
   * Courtesy of https://stackoverflow.com/a/2629996. Modified to fit needs.
   *
   * Add a URL parameter (or changing it if it already exists)
   * @param {searchParams}      string  this is typically document.location.search
   * @param {newParam}    string  the new param to add, in the format of key=value
   */
  function _addUrlParam(searchParams, newParam){
    const key = newParam.split('=')[0];
    const regExp = new RegExp('([?&])' + key + '=[^&]*');
    let newSearchParams = '';

    // If the "searchParams" string exists, then build searchParams from it
    if (searchParams) {

      // Determine if we need to replace existing param or just add a new one
      if (searchParams.match(regExp)) {
        newSearchParams = searchParams.replace(regExp, '$1' + newParam);
      } else {
        newSearchParams += searchParams + '&' + newParam;
      }
    } else {
      newSearchParams = '?' + newParam;
    }

    return newSearchParams;
  }
});