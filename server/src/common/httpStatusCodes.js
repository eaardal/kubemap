import StatusCode from '../models/StatusCode';

export default {
  badRequest: error =>
    new StatusCode(
      'HTTP',
      400,
      'Bad, BAD request! The received request body or parameters was invalid and caused the process to abort'
    ).withError(error),

  unauthorized: () =>
    new StatusCode(
      'HTTP',
      401,
      'Unauthorized. You do not have authorization to view this resource or perform this operation'
    ),

  unauthorizedExpiredToken: () =>
    new StatusCode('HTTP', 401, 'Unauthorized. Token expired'),

  unauthorizedMissingToken: () =>
    new StatusCode('HTTP', 401, 'Unauthorized. Token missing'),

  forbidden: () =>
    new StatusCode(
      'HTTP',
      403,
      'Forbidden. The current user does not have access to this resource'
    ),

  internalServerError: () =>
    new StatusCode(
      'HTTP',
      500,
      'Internal Server Error. Something went really, REALLY wrong. SAD!'
    ),
};
