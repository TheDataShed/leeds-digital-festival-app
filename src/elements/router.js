/* eslint no-unused-expressions: "off" */

/**
 * `router`
 *  Handle form methods e.g converting it to json
 *
 */

/**
 * Parses out the query string to an object
 * @param {Object} context the page js context object
 * @return {Object} the parsed query params
 */
export const parseQueryParams = (context) => {
  if (context.querystring.length === 0) {
    return {};
  }
  const queryParams = {};
  const params = new URLSearchParams(context.querystring);
  Array.from(params.keys()).forEach((key) => {
    queryParams[key] = params.get(key);
  });
  return queryParams;
};

/**
 * Validates that the page thats trying to be routed to is valid otherwise lost
 * @param {String} page the name of the page
 * @return {String} validate page
 */
export const validatePage = (page) => {
  if (!page) {
    return 'home';
  } if (['home', 'terms', 'privacy', 'favourites', 'sponsors', 'talk'].indexOf(page) !== -1) {
    return page;
  }
  return 'lost';
};

/**
 * Dynamically import the page
 * @param {String} page the current page
 */
export const importPage = (page) => {
  // Note: `build` doesn't like string concatenation in the import
  // statement, so break it up.
  switch (page) {
    case 'home':
      import('../pages/home-page');
      break;
    case 'favourites':
      import('../pages/favourite-talks-page');
      break;
    case 'sponsors':
      import('../pages/sponsors-page');
      break;
    case 'talk':
      import('../pages/talk-page');
      break;
    case 'privacy':
      import('../pages/privacy-page');
      break;
    case 'terms':
      import('../pages/terms-page');
      break;
    case 'lost':
      import('../pages/lost-page');
      break;
    default:
      import('../pages/lost-page');
  }
};
