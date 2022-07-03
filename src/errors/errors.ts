const errors = {
  BAD_REQUEST_USER_EXIST: {
    code: 'BAD_REQUEST_ERROR',
    message: 'user already exist',
  },
  BAD_REQUEST_USER_NOT_FOUND: {
    code: 'BAD_REQUEST_ERROR',
    errors: 'user not found',
  },
  BAD_REQUEST_WRONG_PASSWORD: {
    code: 'BAD_REQUEST_ERROR',
    errors: 'wrong password',
  },
  DB_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    errors: 'db request failed',
  },
  BAD_REQUEST_ACCESS_DENIED: {
    code: 'BAD_REQUEST_ERROR',
    errors: 'access forbidden',
  },
  BAD_REQUEST_CLEANER_NOT_FOUND: {
    code: 'BAD_REQUEST_ERROR',
    errors: 'CLEANER_NOT_FOUND',
  }
}

export default errors