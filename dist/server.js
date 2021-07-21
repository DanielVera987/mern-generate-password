"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 8000;

_app["default"].listen(PORT, function () {
  console.log("Server listen in ".concat(PORT));
});

var _default = _app["default"];
exports["default"] = _default;