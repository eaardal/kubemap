import {
  ok,
  noContent,
  created,
  unauthorized,
  forbidden,
  badRequest,
  internalServerError,
} from './responses';

export default res => ({
  ok: ok(res),
  noContent: noContent(res),
  created: created(res),
  unauthorized: unauthorized(res),
  forbidden: forbidden(res),
  badRequest: badRequest(res),
  internalServerError: internalServerError(res),
});
