import url from 'url';

class RequestUtil {
  static constructFullUrl(req) {
    return url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    });
  }
}

export default RequestUtil;
