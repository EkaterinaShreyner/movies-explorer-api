const SUCCESS__REQUEST = 200;
const SUCCESS_CREATE__REQUEST = 201;

const regex = /https?:\/\/(www\.)?[a-z0-9-]+\.[a-z0-9-.,;_:/?!%@$&#[\]()+-=]+/i;

module.exports = {
  SUCCESS__REQUEST,
  SUCCESS_CREATE__REQUEST,
  regex,
};
