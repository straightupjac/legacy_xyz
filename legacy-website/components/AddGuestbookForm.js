import React from "react";
import Image from "next/image";

import {
  Button,
  Container,
  Stack,
  Typography,
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  Chip,
} from "@mui/material";

const AddGuestListForm = () => {
  return (
    <Stack alignItems="left" pl={20} pr={20} pt={10} spacing={4}>
      <Typography align="center" variant="h2" sx={{ pt: 2 }}>
        Add a guestbook to your website
      </Typography>
      <Typography align="center" variant="body1">
        Fill the form below to allow users to discover and sign your website as
        part of their digital legacy
      </Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Project ID</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          Add a unique project ID(could be your address) or we can generate one
          for you!
        </FormHelperText>
        <Button>Generate ID</Button>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Project Name</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Project Twitter</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          Add your project twitter handle if you have one!
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Project Website</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <Stack>
          <InputLabel htmlFor="my-input">Project Tags</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />

          <FormHelperText id="my-helper-text">
            Add tags that relate to your project (ex. crypto, wriitng,
            personal-website)
          </FormHelperText>
        </Stack>
      </FormControl>
      <Stack alignItems="center">
        <Button
          variant="contained"
          size="large"
          sx={{
            border: "4px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            width: "150px",
            height: "60px",
            backgroundColor: "#3f8758",
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};
export default AddGuestListForm;
