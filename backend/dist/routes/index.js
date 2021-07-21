"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _celebrate2 = require("celebrate");

var _generate = _interopRequireDefault(require("../components/generate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.post('', (0, _celebrate2.celebrate)(_defineProperty({}, _celebrate2.Segments.BODY, _celebrate2.Joi.object().keys({
  character: _celebrate2.Joi.number().integer().min(5).required(),
  simbols: _celebrate2.Joi["boolean"]().required(),
  numbers: _celebrate2.Joi["boolean"]().required(),
  uppercase: _celebrate2.Joi["boolean"]().required()
}))), _generate["default"]);
var _default = router;
exports["default"] = _default;