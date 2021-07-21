"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.error404Handler = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var error404Handler = function error404Handler(req, res, next) {
  next((0, _httpErrors["default"])(404, 'Not Found'));
};

exports.error404Handler = error404Handler;

var errorHandler = function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
};

exports.errorHandler = errorHandler;