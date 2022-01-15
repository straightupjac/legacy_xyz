import React from "react";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Sign from "./Sign";
import { Stack, Typography } from "@mui/material";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const SignLegacy = ({
  projectId,
  buttonLabel,
  buttonStyle,
  message,
  cardStyle,
  showLegacy = true,
  modalStyle
}) => {
  const defaultMsg = "Thank you for visiting my corner on the internet. To leave your legacy here, please sign by clicking the button below. By signing, this signature will be part of your legacy on the blockchain.";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Web3ReactProvider, {
    getLibrary: getLibrary
  }, /*#__PURE__*/React.createElement(Stack, {
    spacing: 2,
    sx: cardStyle || {
      border: '2px solid #333',
      p: 4,
      maxWidth: '500px',
      borderRadius: 10
    },
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body1"
  }, message || defaultMsg), /*#__PURE__*/React.createElement(Sign, {
    projectId: projectId,
    buttonLabel: buttonLabel,
    buttonStyle: buttonStyle,
    modalStyle: modalStyle
  }), showLegacy && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 18,
      textAlign: 'center',
      mt: 3
    }
  }, "\uD83C\uDF31 Check out ", /*#__PURE__*/React.createElement("a", {
    href: "https://legacy-xyz.vercel.app/",
    target: "_blank",
    style: {
      textDecoration: 'none'
    },
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy")), " to learn more"))));
};

export default SignLegacy;