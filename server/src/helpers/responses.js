import httpStatusCodes from '../common/httpStatusCodes';
import ApiResponse from '../models/ApiResponse';

const statusCodesOrDefault = (statusCodes, defaultStatusCode) => {
  let errors = [];

  if (statusCodes && statusCodes.length > 0) {
    errors = [...statusCodes];
  } else {
    errors = [defaultStatusCode];
  }

  return errors;
};

export const ok = res => payload =>
  res.status(200).json(ApiResponse.createSuccessful(payload, 200));

export const created = res => locationHeader =>
  res
    .status(201)
    .set({ Location: locationHeader })
    .send();

export const noContent = res => () => res.status(204).send();

export const unauthorized = res => (...statusCodes) => {
  const errors = statusCodesOrDefault(statusCodes, httpStatusCodes.unauthorized());

  return res
    .status(401)
    .set({ 'WWW-Authenticate': 'Bearer realm="Auth0"' })
    .json(ApiResponse.createUnsuccessful(401, ...errors));
};

export const forbidden = res => (...statusCodes) => {
  const errors = statusCodesOrDefault(statusCodes, httpStatusCodes.forbidden());

  return res.status(403).json(ApiResponse.createUnsuccessful(403, ...errors));
};

export const badRequest = res => (...statusCodes) => {
  const errors = statusCodesOrDefault(
    statusCodes,
    httpStatusCodes.badRequest('The request was incomplete or invalid')
  );

  return res.status(400).json(ApiResponse.createUnsuccessful(400, ...errors));
};

export const internalServerError = res => (...statusCodes) => {
  const errors = statusCodesOrDefault(statusCodes, httpStatusCodes.internalServerError());

  return res.status(500).json(ApiResponse.createUnsuccessful(500, ...errors));
};

export default {
  ok,
  created,
  noContent,
  unauthorized,
  forbidden,
  badRequest,
  internalServerError
};
