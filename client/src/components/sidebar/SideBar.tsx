import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import CheckroomIcon from '@mui/icons-material/Checkroom';
import { NavbarItem } from '../navbar';
import Link from 'next/link';

interface SideBarProps {
  title?: string;
  window?: () => Window;
  drawerWidth: number;
}

export const SideBar: React.FC<SideBarProps> = ({
  title,
  window,
  drawerWidth,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // SideBar
  const drawer = (
    <div>
      <Toolbar>
        <CheckroomIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Link href="/">
          <Typography
            variant="h6"
            noWrap
            sx={{
              textAlign: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#000',
              textDecoration: 'none',
            }}
          >
            NOS-STORE
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {/* Profile */}
        <Link href={'/profile'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Thông tin cá nhân" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Order */}
        <Link href={'/order'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn đặt hàng" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Order managerment */}
        <Link href={'/admin/order'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý đơn đặt hàng" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Product managerment */}
        <Link href={'/admin/product'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý sản phẩm" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Category managerment */}
        <Link href={'/admin/category'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary=" Quản lý danh mục sản phẩm" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Brand managerment */}
        <Link href={'/admin/brand'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý thương hiệu" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Tài khoản */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý tài khoản" />
          </ListItemButton>
        </ListItem>

        {/* Coupon */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý mã giảm giá" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <NavbarItem />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* main */}
    </Box>
  );
};
