export class ValidatorError extends Error {
  constructor(message, statusCode = 403, internalStatusCode = 0) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [
      {
        msg: message,
        location: 'validation',
        internalStatusCode,
      },
    ];
  }
}

export class ServiceError extends Error {
  constructor(message, statusCode, internalStatusCode = 0) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [
      {
        msg: message,
        location: 'service',
        internalStatusCode,
      },
    ];
  }
}

export class RepositoryError extends Error {
  constructor(message, statusCode, internalStatusCode = 0) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [
      {
        msg: message,
        location: 'repository',
        internalStatusCode,
      },
    ];
  }
}

export class JoiError extends Error {
  constructor(errors, statusCode = 403) {
    super('Joi Error');
    this.statusCode = statusCode;
    this.errors = errors.map((e) => ({ msg: e.message, path: e.path[0] }));
  }
}
