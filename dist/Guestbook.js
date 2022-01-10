"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Guestbook = props => {
  const {
    title
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, title ? title : 'Welcome to guestbook'), /*#__PURE__*/_react.default.createElement(_material.Button, null, "Nice botton"));
};

var _default = Guestbook;
exports.default = _default;