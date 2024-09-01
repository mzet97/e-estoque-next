"use client";

import Link from 'next/link';
import '../globals.css';
import { Box, Stack, Button } from '@mui/material';

export default function Home() {

    return (

        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Box>
                <h1 className="font-mono text-2xl antialiased">
                    Internal management system
                </h1>
            </Box>

            <h2 className="mt-5 font-mono text-lg antialiased">
                Do you have a account?
            </h2>

            <Link href="/login">
                <Button
                    variant="contained"
                    color="success"
                >
                    Login
                </Button>
            </Link>
            <h2 className="mt-5">Or create a new account!</h2>
            <Link href="/signUp">
                <Button
                    variant="contained"
                    color="info"
                >
                    SingUp
                </Button>
            </Link>

        </Stack>
    );
};