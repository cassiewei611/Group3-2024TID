import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'HuKo8mIdhoVZSdGmhrpUrVbbAbpD2Kxfj2ce436R';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'dQXQMc0yr5pt3G8tlLqldSGPnw9pOJ3XEYL51Yq9';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default Parse;
