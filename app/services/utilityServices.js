import config from 'config'
import tinycolor from 'tinycolor2'

let token_string_id = 'session_token';

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
};

let saveToken = (input) => {
  createCookie(token_string_id, input, 7);
  return
};

let getToken = () => {
  return readCookie(token_string_id)
};

let deleteToken = () => {
  eraseCookie(token_string_id)
};

let createCookie = (name,value,days) => {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString()
  } else {
    expires = ""
  }
  document.cookie = name + "=" + value + expires + "; path=/"
};

let readCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for( var i=0; i < ca.length; i++ ) {
    var c = ca[i]
    while ( c.charAt(0)==' ' ) c = c.substring( 1, c.length );
    if ( c.indexOf(nameEQ) == 0 ) return c.substring( nameEQ.length, c.length )
  }
  return null
}

let eraseCookie = (name) => {
  createCookie(name,"",-1)
}

let checkForToken = () => {
  let cookieData = readCookie(token_string_id)
  if (cookieData) {
    return true
  } else {
    return false
  }
}

let shortenText = (text, maxLength, showEllipsis) => {
  if (!text || text === '') {
    return ''
  }
  var result = text
  if (result.length > maxLength) {
    result = result.substr( 0, maxLength - 3 )
    if (showEllipsis && result.length > 5) {
      result = result + '...'
    }
  }
  return result
}

let confirmOnPageExit = (e) => {
  // If we haven't been passed the event get the window.event
  e = e || window.event
  var message = 'Any text will block the navigation and display a prompt'
  // For IE6-8 and Firefox prior to version 4
  if (e)
  {
    e.returnValue = message
  }
  // For Chrome, Safari, IE8+ and Opera 12+
  return message
}

let handleFetchErrors = (response) => {
  if (!response.ok) {
    throw Error(response)
  }
  return response
}

let parseUploadDecimal = (decimal) => {
  return (decimal * 100).toFixed(2) + '%'
}

let toArray = (obj) => {
  var array = []
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i]
  }
  return array
}

let kFormatter = (num) => {
  return num > 999 ? (num/1000).toFixed(1) + 'k' : num
}

let modifyDocumentTitle = (title) => {
  if (title && title !== '') {
    document.title = title
  } else {
    document.title = config.defaultPageTitle
  }
  return
}

let localStorageAvailable = (type) => {
  try {
    var storage = window[type],
      x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  }
  catch(e) {
    return false
  }
}

/////////////////// universal api tools

const fetchFromAPI = (path, method, body) => {
  const token = getToken()
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }
  return (
    fetch([config.apiServer, path].join('/'), {
      body: JSON.stringify(body),
      headers: headers,
      method
    })
    .then((res) => res.json())
    .catch((err) => err)
  )
}

const querify = (obj = {}, needsEncoding = false) => {
  const encode = (value) => needsEncoding ? encodeURIComponent(value) : value
  const keys = Object.keys(obj)
  return keys.length
    ? '?' + keys
      .filter((key) => obj[key] !== undefined)
      .map((key) => encode(key) + '=' + encode(obj[key])).join('&')
    : ''
}

const api = {
  get: (path, ...querifyArgs) => fetchFromAPI(path + querify(...querifyArgs), 'GET'),
  post: (path, body) => fetchFromAPI(path, 'POST', body),
  put: (path, body) => fetchFromAPI(path, 'PUT', body),
  delete: (path, body) => fetchFromAPI(path, 'DELETE', body)
}

const selectBlackOrWhiteTextOverColor = (inputColor) => {
  let white = '#ffffff'
  let black = '#4A4A4A'

  let inputTinyColor = tinycolor(inputColor)
  let colorSwitchPoint = .7
  if (inputTinyColor.getBrightness(inputColor) < (255 * colorSwitchPoint) ) {
    return white
  } else {
    return black
  }
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

module.exports = {
  saveToken: saveToken,
  getToken: getToken,
  deleteToken: deleteToken,
  createCookie: createCookie,
  readCookie: readCookie,
  eraseCookie: eraseCookie,
  checkForToken: checkForToken,
  shortenText: shortenText,
  confirmOnPageExit: confirmOnPageExit,
  handleFetchErrors: handleFetchErrors,
  parseUploadDecimal: parseUploadDecimal,
  toArray: toArray,
  kFormatter: kFormatter,
  modifyDocumentTitle: modifyDocumentTitle,
  localStorageAvailable: localStorageAvailable,
  api: api,
  selectBlackOrWhiteTextOverColor: selectBlackOrWhiteTextOverColor,
  shuffleArray
}
