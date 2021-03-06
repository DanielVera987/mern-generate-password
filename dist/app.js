"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _errors = require("./middleware/errors");

var _celebrate = require("celebrate");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/generate', _index["default"]);
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, "../client/build")));
app.get("*", function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, "../client/build", "index.html"));
});
app.use(_errors.error404Handler);
app.use((0, _celebrate.errors)());
app.use(_errors.errorHandler);
var _default = app;
exports["default"] = _default;