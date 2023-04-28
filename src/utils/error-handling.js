export class ValidatorError extends Error {
  constructor(massage, statusCode = 403, internalStatusCode = 0) {
    super(massage);
    this.statusCode = statusCode;
    this.errors = [
      {
        msg: massage,
        location: 'validation',
        internalStatusCode,
      },
    ];
  }
}

export class ServiceError extends Error {
  constructor(massage, statusCode, internalStatusCode = 0) {
    super(massage);
    this.statusCode = statusCode;
    this.errors = [
      {
        msg: massage,
        location: 'service',
        internalStatusCode,
      },
    ];
  }
}

export class RepositoryError extends Error {
  constructor(massage, statusCode, internalStatusCode = 0) {
    super(massage);
    this.statusCode = statusCode;
    this.errors = [
      {
        msg: massage,
        location: 'repository',
        internalStatusCode,
      },
    ];
  }
}
