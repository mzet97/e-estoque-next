import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import type { NextPage } from 'next';
import Link from 'next/link';
import './globals.css';

const Home: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-fit mt-10">
            <div className="flex flex-col justify-center justify-items-center content-center items-center">
                <h1 className="font-mono text-2xl antialiased">
                    Internal management system
                </h1>
                <h2 className="mt-5 font-mono text-lg antialiased">
                    Do you have a account?
                </h2>
                <Link href="/login">
                    <Button
                        className="bg-[#34d399] mt-4 font-mono text-lg antialiased text-[#000]"
                        variant="contained"
                    >
                        Login
                    </Button>
                </Link>
                <h2 className="mt-5">Or create a new account!</h2>
                <Link href="/signUp">
                    <Button
                        className="bg-[#a5b4fc] mt-4 font-mono text-lg antialiased text-[#000]"
                        variant="contained"
                    >
                        SingUp
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
