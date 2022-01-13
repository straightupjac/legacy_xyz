import React, { useEffect, useState } from "react";
import { Chip, Stack, Divider, Box, Typography } from "@mui/material";
import { getSigners } from "utils/utils";
import { useWeb3React } from '@web3-react/core';

const SignersList = ({projectId}) => {
    const { library } = useWeb3React();
    const [signers, setSigners] = useState([]);
    const [processedSigners, setProcessedSigners] = useState([]);

    useEffect(() => {
        async function fetchSigners() {
            const res = await getSigners(projectId);
            console.log('getSigners', res)
            setSigners(res)
        }
        fetchSigners();
    }, [projectId])

    useEffect(() => {
        setProcessedSigners(dedupe(signers));
    }, [signers])

    function abridgeAddress(hex, length = 4) {
        if (!hex) { return ''; }
        return `${hex.substring(0, length + 2)}…${hex.substring(
          hex.length - length
        )}`;
      }

    const getENSName = (address) => {
        if (library && typeof address === "string") {
        let stale = false;

        library
            .lookupAddress(address)
            .then((name) => {
            if (!stale && typeof name === "string") {
                return name;
            }
            })
            .catch(() => {return abridgeAddress(address)});
        } else {
            return abridgeAddress(address);
        }
    }

  return (
    <>
    <Box sx={{
        mx: 2,
        border: '2px solid #333',
        textAlign: 'center',
        p: 2,
        px: 4,
        borderRadius: 10,
        width: '100%'
    }}>
        <div>
            <h3>Guestbook</h3>
        </div>
        <Box sx={{
            maxHeight: '600px',
            overflowY: 'scroll'
        }}>
            {processedSigners.map((signer, idx) => {
                return (
                    <ListItem
                        key={idx}
                        name={signer.name}
                        date={parseInt(signer.date, 10)}
                        address={getENSName(signer.address)}
                        twitter={signer.twitter}
                    />
                )
            })}
        </Box>
    </Box>
    </>
  );
};

export default SignersList;


const ListItem = ({name, date, address, twitter}) => {
    return (
        <>
            <Stack
                direction={{xs: 'column', sm: 'column', md: 'row'}}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{py: 2}}
            >
                <Box textAlign="start">
                    <Typography variant='body1'>{name}</Typography>
                    <Typography variant='caption'>{new Date(date*1000).toLocaleDateString("en-US")}</Typography>
                </Box>
                <Box textAlign="start">
                    <Typography variant='body1'>{address}</Typography>
                </Box>
                <Box textAlign="end">
                    {twitter && <div style={{alignContent: 'flex-end'}}>
                        <Chip label={`@${twitter}`} />
                    </div>}
                </Box>
            </Stack>
            <Divider />
        </>

    )
}
