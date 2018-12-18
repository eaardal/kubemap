import StatusCode from './StatusCode';

class ApiResponse {
  constructor(payload, errors, hasError, status) {
    this.payload = payload;
    this.errors = errors;
    this.hasError = hasError;
    this.status = status;
  }

  static createSuccessful(payload, status = 200) {
    return new ApiResponse(payload, [], false, status);
  }

  static createUnsuccessful(status, ...statusCodes) {
    if (statusCodes.every(StatusCode.isStatusCode)) {
      return new ApiResponse(null, statusCodes, true, status);
    }

    const invalidStatusCodes = statusCodes.filter(code => !StatusCode.isStatusCode(code));

    throw new Error(
      `One or more statusCode objects is not a valid StatusCode instance: ${JSON.stringify(
        invalidStatusCodes,
        null,
        2
      )}`
    );
  }
}

export default ApiResponse;
