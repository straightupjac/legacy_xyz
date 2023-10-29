"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@web3-react/core");

var _injectedConnector = require("@web3-react/injected-connector");

var _walletlinkConnector = require("@web3-react/walletlink-connector");

var _SignModal = _interopRequireDefault(require("./SignModal"));

var _utils = require("./utils/utils");

var _material = require("@mui/material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var signMessage = function signMessage(account, name, twitterHandle) {
  if (name && twitterHandle) {
    return "".concat(name, " was here. By signing, you are leaving your legacy on this corner of the internet. \n\n      account: ").concat(account, "\n\n      twitter: ").concat(twitterHandle, "\n    ");
  } else {
    return "".concat(name, " was here. By signing, you are leaving your legacy on this corner of the internet. \n\n    account: ").concat(account, "\n    ");
  }
};

var Sign = function Sign(_ref) {
  var projectId = _ref.projectId,
      buttonLabel = _ref.buttonLabel,
      buttonStyle = _ref.buttonStyle,
      modalStyle = _ref.modalStyle;

  var _useWeb3React = (0, _core.useWeb3React)(),
      activate = _useWeb3React.activate,
      active = _useWeb3React.active,
      account = _useWeb3React.account; // for the modal


  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalVisible = _useState2[0],
      setIsModalVisible = _useState2[1];

  var handleClose = function handleClose() {
    return setIsModalVisible(false);
  };

  var handleConnect = function handleConnect() {
    setIsModalVisible(true);
  };

  var injected = new _injectedConnector.InjectedConnector();
  var walletlink = new _walletlinkConnector.WalletLinkConnector({
    appName: 'legacy_xyz'
  });

  var handleLoginClick = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(type === 'coinbase')) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return activate(walletlink);

            case 3:
              _context.next = 8;
              break;

            case 5:
              if (!(type === 'metamask')) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return activate(injected);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleLoginClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var signFromWallet = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(account, name, twitterHandle) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _utils.generateSignature)(signMessage(account, name, twitterHandle));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function signFromWallet(_x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    size: "large",
    sx: buttonStyle ? buttonStyle : {
      color: 'white',
      maxWidth: '200px',
      background: '#000000',
      textTransform: 'none',
      fontSize: 20,
      borderRadius: 3,
      ':hover': {
        background: '#000000',
        opacity: 0.8
      }
    },
    onClick: handleConnect
  }, buttonLabel || "Sign here"), /*#__PURE__*/_react["default"].createElement(_SignModal["default"], {
    projectId: projectId,
    account: account,
    active: active,
    buttonStyle: buttonStyle,
    modalStyle: modalStyle,
    isModalVisible: isModalVisible,
    handleLoginClick: handleLoginClick,
    handleClose: handleClose,
    signFromWallet: signFromWallet
  }));
};

var _default = Sign;
exports["default"] = _default;