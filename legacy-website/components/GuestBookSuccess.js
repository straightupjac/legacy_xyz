import React from "react";

import { Stack, Typography, Button } from "@mui/material";

const GuestBookSuccess = () => {
  const projectId = "projectId";
  const projectURL = "www.projectURL.com";

  return (
    <Stack alignItems="center" pl={20} pr={20} pt={10} spacing={4}>
      <Typography align="center" variant="h3" sx={{ pt: 2 }}>
        You’re all done 🎉
      </Typography>
      <Typography variant="body">
        You successfully registered your project available at {projectURL},
        under the unique project ID {projectId}
      </Typography>
      <Typography>Now download the package</Typography>
      <Button
        sx={{
          borderRadius: "16px",
          width: "150px",
          height: "60px",
        }}
      >
        Add another site
      </Button>
    </Stack>
  );
};
export default GuestBookSuccess;
