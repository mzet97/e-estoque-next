import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import styles from './styles.module.css';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div className={styles['box-center']}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <h1>Internal management system</h1>
                <h2>Do you have a account?</h2>
                <Link href="/login">
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
                <h2>Or create a new account!</h2>
                <Link href="/signUp">
                    <Button variant="contained" color="secondary">
                        SingUp
                    </Button>
                </Link>
            </Stack>
        </div>
    );
};

export default Home;
