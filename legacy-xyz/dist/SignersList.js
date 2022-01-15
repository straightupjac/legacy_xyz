import React, { useEffect, useState } from "react";
import { Chip, Stack, Divider, Box, Typography } from "@mui/material";
import { getSigners, dedupe } from "./utils/utils";
import { useWeb3React } from '@web3-react/core';
import VerifiedIcon from '@mui/icons-material/Verified';

const SignersList = ({
  projectId,
  cardStyle,
  maxHeight
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
    sx: cardStyle || {
      border: '2px solid #333',
      textAlign: 'center',
      p: 2,
      borderRadius: 10,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Guestbook")), /*#__PURE__*/React.createElement(Box, {
    sx: {
      maxHeight: maxHeight || '600px',
      overflowY: 'scroll'
    }
  }, processedSigners.map((signer, idx) => {
    return /*#__PURE__*/React.createElement(ListItem, {
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

export default SignersList;

const ListItem = ({
  id,
  name,
  date,
  address,
  twitter,
  message,
  verified
}) => {
  const [resolveVerified, setResolveVerified] = useState(false);
  useEffect(() => {
    Promise.resolve(verified).then(res => {
      setResolveVerified(res);
    });
  }, []);
  return /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Stack, {
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
  }, /*#__PURE__*/React.createElement(Stack, {
    direction: "row",
    justifyContent: "space-between",
    spacing: 2
  }, /*#__PURE__*/React.createElement(Stack, {
    textAlign: "start",
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body1",
    sx: {
      fontFamily: `Tahoma, sans`
    }
  }, name), /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    sx: {
      fontFamily: `Tahoma, sans`
    }
  }, new Date(date).toLocaleDateString("en-US"))), /*#__PURE__*/React.createElement("a", {
    href: `https://arweave.net/tx/${id}`,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    sx: {
      fontFamily: `Courier`,
      color: 'gray'
    }
  }, "txId: ", id.substring(0, 5)))), /*#__PURE__*/React.createElement(Stack, {
    textAlign: "end",
    spacing: 1
  }, twitter && /*#__PURE__*/React.createElement("a", {
    href: `https://twitter.com/${twitter}`,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: 'none',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    icon: resolveVerified ? /*#__PURE__*/React.createElement(VerifiedIcon, null) : /*#__PURE__*/React.createElement(React.Fragment, null),
    label: /*#__PURE__*/React.createElement(Typography, {
      variant: "body2",
      sx: {
        fontFamily: `Tahoma, sans`,
        color: '#4F4F4F'
      }
    }, "@", twitter)
  })), /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    sx: {
      fontFamily: `Courier`,
      color: 'gray'
    }
  }, address))), message && /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: 'start',
      fontFamily: `"Bradley Hand", "Lucida Console", "Tahoma"`
    }
  }, message), /*#__PURE__*/React.createElement(Divider, null));
};