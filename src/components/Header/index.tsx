'use client';
import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import {
    Divider,
    Menu,
    MenuItem,
    Stack,
    Container,
    IconButton,
    Button,
    Typography,
    Toolbar,
    AppBar,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';

import SwitchTheme from '../SwitchTheme';

import { Link as MuiLink } from '@mui/material';
interface NavItem {
    label: string;
    href: string;
}

const getNavItems = (user: any): Array<NavItem> => {
    if (!!user) {
        return [
            {
                label: 'Dashboard',
                href: 'dashboard',
            },
            {
                label: 'Category',
                href: 'category',
            },
            {
                label: 'Company',
                href: 'company',
            },
            {
                label: 'Customer',
                href: 'customer',
            },
            {
                label: 'Product',
                href: 'product',
            },
            {
                label: 'Tax',
                href: 'tax',
            },
            {
                label: 'Sales',
                href: 'sales',
            },
        ];
    } else {
        return [
            {
                label: 'Home',
                href: '/',
            },
            {
                label: 'About',
                href: 'about',
            },
        ];
    }
};

const Header: React.FC = () => {
    const { data: session } = useSession();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        E-Estoque
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {getNavItems(session?.user).map((item: NavItem) => (
                                <MenuItem key={item.label}>
                                    <MuiLink
                                        underline="none"
                                        color="inherit"
                                        component={NextLink}
                                        href={item.href}
                                    >
                                        {item.label}
                                    </MuiLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        E-Estoque
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {getNavItems(session?.user).map((item: NavItem) => (
                            <Button
                                key={item.label}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <MuiLink
                                    color="inherit"
                                    underline="none"
                                    component={NextLink}
                                    href={item.href}
                                >
                                    {item.label}
                                </MuiLink>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <SwitchTheme />
                            {!!session ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => signOut()}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <NextLink href="/login">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Login
                                        </Button>
                                    </NextLink>
                                    <NextLink href="/signUp">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                        >
                                            SingUp
                                        </Button>
                                    </NextLink>
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
