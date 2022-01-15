import React, { useEffect, useState } from "react";
import { Chip, Stack, Divider, Box, Typography } from "@mui/material";
import { getSigners, dedupe } from "./utils/utils";
import { useWeb3React } from '@web3-react/core';
import VerifiedIcon from '@mui/icons-material/Verified';

const SignersList = ({ projectId, cardStyle = undefined, maxHeight = undefined }) => {
    const { library } = useWeb3React();
    const [signers, setSigners] = useState([]);
    const [processedSigners, setProcessedSigners] = useState([]);

    useEffect(() => {
        async function fetchSigners() {
            const res = await getSigners(projectId);
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
                .catch(() => { return abridgeAddress(address) });
        } else {
            return abridgeAddress(address);
        }
    }

    return (
        <>
            <Box sx={cardStyle || {
                border: '2px solid #333',
                textAlign: 'center',
                p: 2,
                borderRadius: 10,
                width: '100%'
            }}>
                <div>
                    <h3>Guestbook</h3>
                </div>
                <Box sx={{
                    maxHeight: maxHeight || '600px',
                    overflowY: 'scroll'
                }}>
                    {processedSigners.map((signer, idx) => {
                        return (
                            <ListItem
                                key={idx}
                                id={signer.SIG_ID}
                                name={signer.SIG_NAME}
                                date={parseInt(signer.SIG_DATE, 10)}
                                address={getENSName(signer.SIG_ADDR)}
                                twitter={signer.SIG_TWITTER_HANDLE}
                                message={signer.SIG_MESSAGE}
                                verified={signer.SIG_ISVERIFIED}
                            />
                        )
                    })}
                </Box>
            </Box>
        </>
    );
};

export default SignersList;


const ListItem = ({ id, name, date, address, twitter, message, verified }) => {
    const [resolveVerified, setResolveVerified] = useState(false);
    useEffect(() => {
        Promise.resolve(verified).then((res) => {
            setResolveVerified(res);
        })
    }, [])
    return (
        <Stack>
            <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                justifyContent={"space-between"}
                sx={{ py: 2 }}
                spacing={1}
            >
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Stack textAlign="start" spacing={2}>
                        <Typography variant='body1' sx={{ fontFamily: `Tahoma, sans` }}>{name}</Typography>
                        <Typography variant='caption' sx={{ fontFamily: `Tahoma, sans` }}>{new Date(date).toLocaleDateString("en-US")}</Typography>
                    </Stack>
                    <a
                        href={`https://arweave.net/tx/${id}`}
                        target="_blank" rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography variant='body2' sx={{ fontFamily: `Courier`, color: 'gray' }}>txId: {id.substring(0, 5)}</Typography>
                    </a>
                </Stack>
                <Stack textAlign="end" spacing={1}>
                    {twitter &&
                        <a
                            href={`https://twitter.com/${twitter}`}
                            target="_blank" rel="noreferrer"
                            style={{ textDecoration: 'none', margin: 0 }}
                        >
                            <Chip icon={resolveVerified ? <VerifiedIcon /> : <></>}
                                label={
                                    <Typography variant='body2' sx={{ fontFamily: `Tahoma, sans`, color: '#4F4F4F' }}>
                                        @{twitter}
                                    </Typography>} />
                        </a>}
                    <Typography variant='body2' sx={{ fontFamily: `Courier`, color: 'gray' }}>{address}</Typography>
                </Stack>

            </Stack>
            {
                message && <Typography variant="body2" sx={{ textAlign: 'start', fontFamily: `"Bradley Hand", "Lucida Console", "Tahoma"` }}>
                    {message}
                </Typography>
            }
            <Divider />
        </Stack >
    )
}
