import LangUtil from '../utils/LangUtil';

class StatusCode {
  constructor(prefix, code, description) {
    this.prefix = prefix;
    this.code = code;
    this.description = description;
    this.extra = null;
  }

  static isStatusCode(obj) {
    return (
      !LangUtil.isNullOrUndefined(obj) &&
      !LangUtil.isNullOrUndefined(obj.prefix) &&
      !LangUtil.isNullOrUndefined(obj.code) &&
      !LangUtil.isNullOrUndefined(obj.description)
    );
  }

  toString() {
    return `${this.prefix}_${this.code}: ${this.description}`;
  }

  isSameAs(otherStatusCode) {
    return (
      StatusCode.isStatusCode(otherStatusCode) &&
      this.prefix === otherStatusCode.prefix &&
      this.code === otherStatusCode.code &&
      this.description === otherStatusCode.description
    );
  }

  withError(error) {
    this.extra = error.toString();
    return this;
  }

  withExtra(extra) {
    this.extra = extra;
    return this;
  }
}

export default StatusCode;
