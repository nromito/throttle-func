exports.name = 'Throttle';
exports.version = '0.1';
exports.disabled = false;
exports.group = 'Advanced';

const limiter = require('limiter');

let rateLimiter;
exports.init = (opts) => {
  const conf = opts.conf;
  rateLimiter = new limiter.RateLimiter({tokensPerInterval: conf.eps, interval: 'second'});
}

exports.process = async (event) => {
  await rateLimiter.removeTokens(1);
  return event;
}