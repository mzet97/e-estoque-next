'use client';

import { Button, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Next.js com MUI!
      </Typography>
      <Button variant="contained" color="primary">
        Clique aqui
      </Button>
    </>
  );
}
