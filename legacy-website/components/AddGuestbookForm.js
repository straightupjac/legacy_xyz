import React from "react";
import styles from "./AddGuestbookForm.module.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddGuestListForm = () => {
    return (
      <div className={styles.formContainer}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
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
        </div>
      );
    }
export default AddGuestListForm;
