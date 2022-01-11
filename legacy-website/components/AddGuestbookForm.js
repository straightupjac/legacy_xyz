import React from "react";
import styles from "./AddGuestbookForm.module.css"
import { Chip, Divider } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddGuestListForm = () => {
    return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className={styles.formContainer}>
              <div>
              <TextField
              required
              id="outlined-required"
              label="Project ID"
              defaultValue="Hello World"
            />
              </div>
          <div>
              <button>Generate ID</button>
          </div>
          </div>
        </Box>
      );
    }
export default AddGuestListForm;
