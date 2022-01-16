"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _utils = require("./utils/utils");

var _core = require("@web3-react/core");

var _Verified = _interopRequireDefault(require("@mui/icons-material/Verified"));

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

var SignersList = function SignersList(_ref) {
  var projectId = _ref.projectId,
      _ref$cardStyle = _ref.cardStyle,
      cardStyle = _ref$cardStyle === void 0 ? undefined : _ref$cardStyle,
      _ref$maxHeight = _ref.maxHeight,
      maxHeight = _ref$maxHeight === void 0 ? undefined : _ref$maxHeight;

  var _useWeb3React = (0, _core.useWeb3React)(),
      library = _useWeb3React.library;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      signers = _useState2[0],
      setSigners = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      processedSigners = _useState4[0],
      setProcessedSigners = _useState4[1];

  (0, _react.useEffect)(function () {
    function fetchSigners() {
      return _fetchSigners.apply(this, arguments);
    }

    function _fetchSigners() {
      _fetchSigners = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _utils.getSigners)(projectId);

              case 2:
                res = _context.sent;
                setSigners(res);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchSigners.apply(this, arguments);
    }

    fetchSigners();
  }, [projectId]);
  (0, _react.useEffect)(function () {
    setProcessedSigners((0, _utils.dedupe)(signers));
  }, [signers]);

  function abridgeAddress(hex) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    if (!hex) {
      return '';
    }

    return "".concat(hex.substring(0, length + 2), "\u2026").concat(hex.substring(hex.length - length));
  }

  var getENSName = function getENSName(address) {
    if (library && typeof address === "string") {
      var stale = false;
      library.lookupAddress(address).then(function (name) {
        if (!stale && typeof name === "string") {
          return name;
        }
      })["catch"](function () {
        return abridgeAddress(address);
      });
    } else {
      return abridgeAddress(address);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: cardStyle || {
      border: '2px solid #333',
      textAlign: 'center',
      p: 2,
      borderRadius: 10,
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Guestbook")), /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      maxHeight: maxHeight || '600px',
      overflowY: 'scroll'
    }
  }, processedSigners.map(function (signer, idx) {
    return /*#__PURE__*/_react["default"].createElement(ListItem, {
      key: idx,
      id: signer.SIG_ID,
      name: signer.SIG_NAME,
      date: parseInt(signer.SIG_DATE, 10),
      address: getENSName(signer.SIG_ADDR),
      twitter: signer.SIG_TWITTER_HANDLE,
      message: signer.SIG_MESSAGE,
      verified: signer.SIG_ISVERIFIED
    });
  }))));
};

var _default = SignersList;
exports["default"] = _default;

var ListItem = function ListItem(_ref2) {
  var id = _ref2.id,
      name = _ref2.name,
      date = _ref2.date,
      address = _ref2.address,
      twitter = _ref2.twitter,
      message = _ref2.message,
      verified = _ref2.verified;

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      resolveVerified = _useState6[0],
      setResolveVerified = _useState6[1];

  (0, _react.useEffect)(function () {
    Promise.resolve(verified).then(function (res) {
      setResolveVerified(res);
    });
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_material.Stack, null, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    direction: {
      xs: 'column',
      sm: 'column',
      md: 'row'
    },
    justifyContent: "space-between",
    sx: {
      py: 2
    },
    spacing: 1
  }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    textAlign: "start",
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontFamily: "Tahoma, sans"
    }
  }, name), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "caption",
    sx: {
      fontFamily: "Tahoma, sans"
    }
  }, new Date(date).toLocaleString())), /*#__PURE__*/_react["default"].createElement("a", {
    href: "https://arweave.net/tx/".concat(id),
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body2",
    sx: {
      fontFamily: "Courier",
      color: 'gray'
    }
  }, "txId: ", id.substring(0, 5)))), /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    textAlign: "end",
    spacing: 1
  }, twitter && /*#__PURE__*/_react["default"].createElement("a", {
    href: "https://twitter.com/".concat(twitter),
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: 'none',
      margin: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Chip, {
    icon: resolveVerified ? /*#__PURE__*/_react["default"].createElement(_Verified["default"], null) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null),
    label: /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      variant: "body2",
      sx: {
        fontFamily: "Tahoma, sans",
        color: '#4F4F4F'
      }
    }, "@", twitter)
  })), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body2",
    sx: {
      fontFamily: "Courier",
      color: 'gray'
    }
  }, address))), message && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body2",
    sx: {
      textAlign: 'start',
      fontFamily: "\"Bradley Hand\", \"Lucida Console\", \"Tahoma\""
    }
  }, message), /*#__PURE__*/_react["default"].createElement(_material.Divider, null));
};