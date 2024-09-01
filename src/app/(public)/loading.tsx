'use client';

import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
