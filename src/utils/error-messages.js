export const GENERAL_ERRORS = {
  isString: 'Field must be string',
  isNumber: 'Field must be number',
  isEmail: 'Email is not valid',
  isJWT: 'JWT is not valid',
  firstLetterUppercase: 'First letter must be Uppercase',
  isAlpha: 'field No contain symbols',
  unauthorized: 'unauthorized',
  isArray: 'Field must be an Array',
  isRequired: (field) => `${field} is require`,
  notFound: (field) => `${field} not found`,
  isExists: (field) => `${field} already exists`,
  oneOf: (arr) => `Field must be one of < ${arr.toString()} >`,
  fieldFromToString: (field, from, to) => `${field} must be from ${from} to ${to} string`,
  isFromToNumber: (field, from, to) => `${field} must be from ${from} to ${to} number`,
};
export const USER_ERRORS = {
  emailNotConfirmed: 'Email not confirmed ',
  superAdminFrozen: 'Super Admin is frozen you cant update or delete item ',
};
