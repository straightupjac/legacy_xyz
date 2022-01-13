import React, { useEffect, useState } from "react";
import { Chip, Stack, Divider, Box, Typography } from "@mui/material";
import { getSigners, dedupe } from "./utils/utils";
import { useWeb3React } from '@web3-react/core';

const SignersList = ({
  projectId
}) => {
  const {
    library
  } = useWeb3React();
  const [signers, setSigners] = useState([]);
  const [processedSigners, setProcessedSigners] = useState([]);
  useEffect(() => {
    async function fetchSigners() {
      const res = await getSigners(projectId);
      setSigners(res);
    }

    fetchSigners();
  }, [projectId]);
  useEffect(() => {
    setProcessedSigners(dedupe(signers));
  }, [signers]);

  function abridgeAddress(hex, length = 4) {
    if (!hex) {
      return '';
    }

    return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
  }

  const getENSName = address => {
    if (library && typeof address === "string") {
      let stale = false;
      library.lookupAddress(address).then(name => {
        if (!stale && typeof name === "string") {
          return name;
        }
      }).catch(() => {
        return abridgeAddress(address);
      });
    } else {
      return abridgeAddress(address);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    sx: {
      border: '2px solid #333',
      textAlign: 'center',
      p: 2,
      borderRadius: 10,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Guestbook")), /*#__PURE__*/React.createElement(Box, {
    sx: {
      maxHeight: '600px',
      overflowY: 'scroll'
    }
  }, processedSigners.map((signer, idx) => {
    return /*#__PURE__*/React.createElement(ListItem, {
      key: idx,
      name: signer.name,
      date: parseInt(signer.date, 10),
      address: getENSName(signer.address),
      twitter: signer.twitter
    });
  }))));
};

export default SignersList;

const ListItem = ({
  name,
  date,
  address,
  twitter
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stack, {
    direction: {
      xs: 'column',
      sm: 'column',
      md: 'row'
    },
    justifyContent: "space-between",
    alignItems: "center",
    sx: {
      py: 2
    }
  }, /*#__PURE__*/React.createElement(Box, {
    textAlign: "start"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body1"
  }, name), /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, new Date(date * 1000).toLocaleDateString("en-US"))), /*#__PURE__*/React.createElement(Box, {
    textAlign: "start"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body1"
  }, address)), /*#__PURE__*/React.createElement(Box, {
    textAlign: "end"
  }, twitter && /*#__PURE__*/React.createElement("div", {
    style: {
      alignContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://twitter.com/${twitter}`,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    label: `@${twitter}`
  }))))), /*#__PURE__*/React.createElement(Divider, null));
};