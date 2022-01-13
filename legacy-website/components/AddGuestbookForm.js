import React from "react";
import Image from "next/image";
import headerBackground from "../public/background.svg";
import ChipInput from "material-ui-chip-input";
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
  const chipRenderer = (
    { chip, className, handleClick, handleDelete },
    key
  ) => (
    <Chip
      className={className}
      key={key}
      label={chip}
      onClick={handleClick}
      onDelete={handleDelete}
      size="small"
    />
  );

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h2" sx={{ pt: 2 }}>
        Add a guestbook to your website
      </Typography>
      <Typography variant="body1">
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
          Add your project's twitter handle if you have one!
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Project Website</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <Stack>
          <ChipInput label="Tags" />
          <FormHelperText id="my-helper-text">
            Add tags that relate to your project (ex. crypto, wriitng,
            personal-website)
          </FormHelperText>
        </Stack>
      </FormControl>
      <Stack direction="row" spacing={3}>
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
