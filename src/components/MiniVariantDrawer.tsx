import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DnsIcon from '@mui/icons-material/Dns';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useRouter } from 'next/navigation';

interface MenuDrawerItems {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const items: MenuDrawerItems[] = [
  {
    icon: <CategoryIcon />,
    label: 'Category',
    href: '/dashboard/category',
  },
  {
    icon: <ApartmentIcon />,
    label: 'Company',
    href: '/dashboard/company',
  },
  {
    icon: <StoreIcon />,
    label: 'Customer',
    href: '/dashboard/customer',
  },
  {
    icon: <InventoryIcon />,
    label: 'Inventory',
    href: '/dashboard/inventory',
  },
  {
    icon: <DnsIcon />,
    label: 'Product',
    href: '/dashboard/product',
  },
  {
    icon: <AccountBalanceIcon />,
    label: 'Tax',
    href: '/dashboard/tax',
  },
  {
    icon: <ReceiptIcon />,
    label: 'Sales',
    href: '/dashboard/sale',
  },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface MiniVariantDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MiniVariantDrawer: React.FC<MiniVariantDrawerProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => {
                router.push(item.href);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MiniVariantDrawer;
