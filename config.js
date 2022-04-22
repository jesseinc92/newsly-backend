// Key used for API calls in the server-side
const API_KEY = '191c9628-268e-4980-8233-afb6555c1574'

// Base API URL for all calls
const BASE_URL = 'https://content.guardianapis.com';

// Port that server listens to requests on
const PORT = process.env.PORT || 3001;

// Secret key for bcrypt
const SECRET_KEY = 'Archer1234!'

// Work factor for brcypt
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  API_KEY,
  BASE_URL,
  PORT, 
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
}