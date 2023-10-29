import React from "react";

import { Stack, Typography, Button } from "@mui/material";

const GuestBookSuccess = ({ projectId, setState }) => {
  return (
    <Stack alignItems="center" pl={20} pr={20} pt={10} spacing={4}>
      <Typography align="center" variant="h3" sx={{ pt: 2 }}>
        You’re all done 🎉
      </Typography>
      <Typography variant="body">
        You successfully registered your project under the unique project ID {projectId}.
      </Typography>
      <Typography>Now install the npm package.</Typography>
      <Button
        variant="contained"
        sx={{
          border: "4px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          height: "60px",
          backgroundColor: "#3f8758",
          textTransform: 'none',
          fontSize: 20,
          ':hover': { background: '#3f8758', opacity: 0.8 }
        }}
        onClick={() => setState(0)}
      >
        Add another site
      </Button>
    </Stack>
  );
};
export default GuestBookSuccess;
