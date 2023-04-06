import * as React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
} from '@mui/material';

import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

const settings = ['Thông tin cá nhân', 'Đặt hàng', 'Đăng xuất'];

export const NavbarItem = () => {
  const { data: session, status } = useSession();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const a = true;
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    axios.delete(`${process.env.HOST_URL}/api/auth/logout`, {
      data: {
        refreshToken: session?.user?.refreshToken,
      },
    });
    signOut();
  };

  return (
    <>
      {session?.user ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* Profile */}
            <MenuItem key="profile" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Thông tin cá nhân</Typography>
            </MenuItem>
            {/* Logout */}
            <MenuItem key="logout" onClick={logout}>
              <Typography textAlign="center">Đăng xuất</Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Link href={'/auth/login'}>
          <Button
            sx={{
              color: 'white',
            }}
          >
            Đăng nhập
          </Button>
        </Link>
      )}
    </>
  );
};
