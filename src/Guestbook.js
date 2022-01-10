import React from 'react';
import { Button, Typography } from '@mui/material'

const Guestbook = (props) => {
  const { title } = props;
   return (
    <div>
      <Typography variant="h1">{title ? title : 'Welcome to guestbook'}</Typography>
        <Button>
          Nice botton
        </Button>
    </div>
  )
}
export default Guestbook;
