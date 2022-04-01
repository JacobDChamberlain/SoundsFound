import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to GET if there is no method:
  options.method = options.method || 'GET';

  // set options.headers to an empty object if there is no headers:
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-Token');
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}
