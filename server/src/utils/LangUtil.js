import has from 'lodash/has';
import isNull from 'lodash/isNull';
import _isUndefined from 'lodash/isUndefined';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';

class LangUtil {
  static isNullOrUndefined(val) {
    return isNull(val) || _isUndefined(val);
  }

  static isUndefined(val) {
    return _isUndefined(val);
  }

  static isString(val) {
    return isString(val);
  }

  static isNonEmptyString(val) {
    return isString(val) && val !== '';
  }

  static isEmptyString(val) {
    return isString(val) && val === '';
  }

  static isNullOrUndefinedOrEmptyString(val) {
    return LangUtil.isNullOrUndefined(val) || val === '';
  }

  static isBoolean(val) {
    return isBoolean(val);
  }

  static hasProp(obj, prop) {
    return has(obj, prop);
  }

  static isArray(obj) {
    return isArray(obj);
  }

  static isObject(obj) {
    return isObject(obj);
  }

  static isNumber(val) {
    return isNumber(val);
  }

  static isDefined(val) {
    return !LangUtil.isNullOrUndefined(val);
  }

  static normalizeNumber(number) {
    if (isString(number) && number.indexOf(',') > -1) {
      const numberWithDot = number.replace(',', '.');
      return Number(numberWithDot);
    }
    if (isString(number)) {
      return Number(number);
    }
    if (isNumber(number)) {
      return number;
    }
    return number;
  }
}

export default LangUtil;
