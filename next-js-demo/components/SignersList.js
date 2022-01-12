import React, { useEffect, useState } from "react";
import styles from "./guestbook.module.css"
import { Chip, Stack, Divider, Box } from "@mui/material";
import { getSigners } from "utils/utils";
import { useWeb3React } from '@web3-react/core';

const SignersList = ({projectId}) => {
    const { library } = useWeb3React();

    const [signers, setSigners] = useState([]);
    const mockSigners = [
        {
            name: 'Jaclyn Chan',
            date: 1641960623,
            address: 'straightupjac.eth',
            twitter: 'straightupjac'
        },
        {
            name: 'Mathu R',
            date: 1641931575,
            address: 'someone.eth',
            twitter: 'mathurahravi'
        },
        {
            name: 'Hacklodge',
            date: 1641931575,
            address: 'another.eth',
            twitter: 'hacklodge'
        },
        {
            name: 'John Doe',
            date: 1621931575,
            address: 'E93...398',
            twitter: 'johndoe'
        },
        {
            name: 'Jane Doe',
            date: 1611931575,
            address: 'janedoe.eth',
            twitter: 'janedoe'
        },
        {
            name: 'Anon',
            date: 1626931575,
            address: '0x6F0...07fC',
        },
        {
            name: 'Jaclyn Chan',
            date: 1631931575,
            address: 'straightupjac.eth',
            twitter: 'straightupjac'
        },
    ];


    useEffect(() => {
        async function fetchSigners() {
            const res = await getSigners(projectId);
            console.log('getSigners', res)
            setSigners(res)
        }
        fetchSigners();
    }, [projectId])

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
    }}>
        <div>
            <h3>Guestbook</h3>
        </div>
        <Box sx={{
            maxHeight: '600px',
            overflowY: 'scroll'
        }}>
            {signers.map((signer, idx) => {
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
                    <p>{name}</p>
                    <p className={styles.date}>{new Date(date*1000).toLocaleDateString("en-US")}</p>
                </Box>
                <Box textAlign="start">
                    <p>{address}</p>
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

