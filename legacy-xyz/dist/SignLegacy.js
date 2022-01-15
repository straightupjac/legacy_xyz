"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@web3-react/core");

var _providers = require("@ethersproject/providers");

var _Sign = _interopRequireDefault(require("./Sign"));

var _material = require("@mui/material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getLibrary(provider) {
  var library = new _providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

var SignLegacy = function SignLegacy(_ref) {
  var projectId = _ref.projectId,
      _ref$buttonLabel = _ref.buttonLabel,
      buttonLabel = _ref$buttonLabel === void 0 ? undefined : _ref$buttonLabel,
      _ref$buttonStyle = _ref.buttonStyle,
      buttonStyle = _ref$buttonStyle === void 0 ? undefined : _ref$buttonStyle,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? undefined : _ref$message,
      _ref$cardStyle = _ref.cardStyle,
      cardStyle = _ref$cardStyle === void 0 ? undefined : _ref$cardStyle,
      _ref$showLegacy = _ref.showLegacy,
      showLegacy = _ref$showLegacy === void 0 ? true : _ref$showLegacy,
      _ref$modalStyle = _ref.modalStyle,
      modalStyle = _ref$modalStyle === void 0 ? undefined : _ref$modalStyle;
  var defaultMsg = "Thank you for visiting my corner on the internet. To leave your legacy here, please sign by clicking the button below. By signing, this signature will be part of your legacy on the blockchain.";
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Web3ReactProvider, {
    getLibrary: getLibrary
  }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    spacing: 2,
    sx: cardStyle || {
      border: '2px solid #333',
      p: 4,
      maxWidth: '500px',
      borderRadius: 10
    },
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body1"
  }, message || defaultMsg), /*#__PURE__*/_react["default"].createElement(_Sign["default"], {
    projectId: projectId,
    buttonLabel: buttonLabel,
    buttonStyle: buttonStyle,
    modalStyle: modalStyle
  }), showLegacy && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: 18,
      textAlign: 'center',
      mt: 3
    }
  }, "\uD83C\uDF31 Check out ", /*#__PURE__*/_react["default"].createElement("a", {
    href: "http://web3legacy.xyz/",
    target: "_blank",
    style: {
      textDecoration: 'none'
    },
    rel: "noreferrer"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy")), " to learn more"))));
};

var _default = SignLegacy;
exports["default"] = _default;