'use client';
import canAccess from '@/components/CanAccess/CanAccess';
import CardStatus from '@/components/CardStatus/CardStatus';
import { Box, Stack } from '@mui/material';
import styles from './styles.module.css';

function BasicStatistics() {
    return (
        <>
            <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: '1rem' }}
            >
                <Box className={styles.boxCenter}>
                    <Box className={styles.boxItem}>
                        <h1>Basic Statistics</h1>
                    </Box>
                </Box>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: '1rem' }}
                >
                    <CardStatus title="Prodcuts" subtitle="1000" />
                    <CardStatus title="Companies" subtitle="1000" />
                    <CardStatus title="Customers" subtitle="1000" />
                    <CardStatus title="Inventories" subtitle="1000" />
                    <CardStatus title="Sales" subtitle="1000" />
                </Stack>
            </Stack>
        </>
    );
}

export default canAccess(BasicStatistics);
